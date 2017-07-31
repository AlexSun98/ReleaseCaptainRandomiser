var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { LocalStoreManager } from './local-store-manager.service';
import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
import { DBkeys } from './db-Keys';
import { JwtHelper } from './jwt-helper';
import { Utilities } from './utilities';
import { User } from '../models/user.model';
let AuthService = class AuthService {
    constructor(router, configurations, endpointFactory, localStorage) {
        this.router = router;
        this.configurations = configurations;
        this.endpointFactory = endpointFactory;
        this.localStorage = localStorage;
        this.previousIsLoggedInCheck = false;
        this._loginStatus = new Subject();
        this.initializeLoginStatus();
    }
    get loginUrl() { return this.configurations.loginUrl; }
    get homeUrl() { return this.configurations.homeUrl; }
    initializeLoginStatus() {
        this.localStorage.getInitEvent().subscribe(() => {
            this.reevaluateLoginStatus();
        });
    }
    gotoPage(page, preserveParams = true) {
        let navigationExtras = {
            preserveQueryParams: preserveParams, preserveFragment: preserveParams
        };
        this.router.navigate([page], navigationExtras);
    }
    redirectLoginUser() {
        let redirect = this.loginRedirectUrl && this.loginRedirectUrl != ConfigurationService.defaultHomeUrl ? this.loginRedirectUrl : this.homeUrl;
        this.loginRedirectUrl = null;
        let urlAndFragment = Utilities.splitInTwo(redirect, '#');
        let navigationExtras = {
            fragment: urlAndFragment.secondPart,
            preserveQueryParams: true
        };
        this.router.navigate([urlAndFragment.firstPart], navigationExtras);
    }
    redirectLogoutUser() {
        let redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginUrl;
        this.logoutRedirectUrl = null;
        this.router.navigate([redirect]);
    }
    redirectForLogin() {
        this.loginRedirectUrl = this.router.url;
        this.router.navigate([this.loginUrl]);
    }
    reLogin() {
        this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
        if (this.reLoginDelegate) {
            this.reLoginDelegate();
        }
        else {
            this.redirectForLogin();
        }
    }
    refreshLogin() {
        return this.endpointFactory.getRefreshLoginEndpoint()
            .map((response) => this.processLoginResponse(response, this.rememberMe));
    }
    login(userName, password, rememberMe) {
        if (this.isLoggedIn)
            this.logout();
        return this.endpointFactory.getLoginEndpoint(userName, password)
            .map((response) => this.processLoginResponse(response, rememberMe));
    }
    processLoginResponse(response, rememberMe) {
        let response_token = response.json();
        let accessToken = response_token.access_token;
        if (accessToken == null)
            throw new Error("Received accessToken was empty");
        let idToken = response_token.id_token;
        let refreshToken = response_token.refresh_token;
        let expiresIn = response_token.expires_in;
        let tokenExpiryDate = new Date();
        tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);
        let accessTokenExpiry = tokenExpiryDate;
        let jwtHelper = new JwtHelper();
        let decodedIdToken = jwtHelper.decodeToken(response_token.id_token);
        let permissions = Array.isArray(decodedIdToken.permission) ? decodedIdToken.permission : [decodedIdToken.permission];
        if (!this.isLoggedIn)
            this.configurations.import(decodedIdToken.configuration);
        let user = new User(decodedIdToken.sub, decodedIdToken.name, decodedIdToken.fullname, decodedIdToken.email, decodedIdToken.jobTitle, decodedIdToken.phone, Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role]);
        user.isEnabled = true;
        this.saveUserDetails(user, permissions, accessToken, idToken, refreshToken, accessTokenExpiry, rememberMe);
        this.reevaluateLoginStatus(user);
        return user;
    }
    saveUserDetails(user, permissions, accessToken, idToken, refreshToken, expiresIn, rememberMe) {
        if (rememberMe) {
            this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
            this.localStorage.savePermanentData(idToken, DBkeys.ID_TOKEN);
            this.localStorage.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
            this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.savePermanentData(permissions, DBkeys.USER_PERMISSIONS);
            this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
        }
        else {
            this.localStorage.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
            this.localStorage.saveSyncedSessionData(idToken, DBkeys.ID_TOKEN);
            this.localStorage.saveSyncedSessionData(refreshToken, DBkeys.REFRESH_TOKEN);
            this.localStorage.saveSyncedSessionData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.saveSyncedSessionData(permissions, DBkeys.USER_PERMISSIONS);
            this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
        }
        this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
    }
    logout() {
        this.localStorage.deleteData(DBkeys.ACCESS_TOKEN);
        this.localStorage.deleteData(DBkeys.ID_TOKEN);
        this.localStorage.deleteData(DBkeys.REFRESH_TOKEN);
        this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
        this.localStorage.deleteData(DBkeys.USER_PERMISSIONS);
        this.localStorage.deleteData(DBkeys.CURRENT_USER);
        this.configurations.clearLocalChanges();
        this.reevaluateLoginStatus();
    }
    reevaluateLoginStatus(currentUser) {
        let user = currentUser || this.localStorage.getDataObject(DBkeys.CURRENT_USER);
        let isLoggedIn = user != null;
        if (this.previousIsLoggedInCheck != isLoggedIn) {
            setTimeout(() => {
                this._loginStatus.next(isLoggedIn);
            });
        }
        this.previousIsLoggedInCheck = isLoggedIn;
    }
    getLoginStatusEvent() {
        return this._loginStatus.asObservable();
    }
    get currentUser() {
        let user = this.localStorage.getDataObject(DBkeys.CURRENT_USER);
        this.reevaluateLoginStatus(user);
        return user;
    }
    get userPermissions() {
        return this.localStorage.getDataObject(DBkeys.USER_PERMISSIONS) || [];
    }
    get accessToken() {
        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
    }
    get accessTokenExpiryDate() {
        this.reevaluateLoginStatus();
        return this.localStorage.getDataObject(DBkeys.TOKEN_EXPIRES_IN, true);
    }
    get isSessionExpired() {
        if (this.accessTokenExpiryDate == null) {
            return true;
        }
        return !(this.accessTokenExpiryDate.valueOf() > new Date().valueOf());
    }
    get idToken() {
        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.ID_TOKEN);
    }
    get refreshToken() {
        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
    }
    get isLoggedIn() {
        return this.currentUser != null;
    }
    get rememberMe() {
        return this.localStorage.getDataObject(DBkeys.REMEMBER_ME) == true;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, ConfigurationService, EndpointFactory, LocalStoreManager])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map