var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { ConfigurationService } from './configuration.service';
let EndpointFactory = EndpointFactory_1 = class EndpointFactory {
    constructor(http, configurations, injector) {
        this.http = http;
        this.configurations = configurations;
        this.injector = injector;
        this._loginUrl = "/connect/token";
    }
    get loginUrl() { return this.configurations.baseUrl + this._loginUrl; }
    get authService() {
        if (!this._authService)
            this._authService = this.injector.get(AuthService);
        return this._authService;
    }
    getLoginEndpoint(userName, password) {
        let header = new Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");
        let searchParams = new URLSearchParams();
        searchParams.append('username', userName);
        searchParams.append('password', password);
        searchParams.append('grant_type', 'password');
        searchParams.append('scope', 'openid email profile offline_access roles');
        searchParams.append('resource', window.location.origin);
        let requestBody = searchParams.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header });
    }
    getRefreshLoginEndpoint() {
        let header = new Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");
        let searchParams = new URLSearchParams();
        searchParams.append('refresh_token', this.authService.refreshToken);
        searchParams.append('grant_type', 'refresh_token');
        searchParams.append('scope', 'openid email profile offline_access roles');
        let requestBody = searchParams.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header })
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getRefreshLoginEndpoint());
        });
    }
    getAuthHeader(includeJsonContentType) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.accessToken });
        if (includeJsonContentType)
            headers.append("Content-Type", "application/json");
        headers.append("Accept", `application/vnd.iman.v${EndpointFactory_1.apiVersion}+json, application/json, text/plain, */*`);
        headers.append("App-Version", ConfigurationService.appVersion);
        return new RequestOptions({ headers: headers });
    }
    handleError(error, continuation) {
        if (error.status == 401) {
            if (this.isRefreshingLogin) {
                return this.pauseTask(continuation);
            }
            this.isRefreshingLogin = true;
            return this.authService.refreshLogin()
                .mergeMap(data => {
                this.isRefreshingLogin = false;
                this.resumeTasks(true);
                return continuation();
            })
                .catch(refreshLoginError => {
                this.isRefreshingLogin = false;
                this.resumeTasks(false);
                if (refreshLoginError.status == 401 || (refreshLoginError.url && refreshLoginError.url.toLowerCase().includes(this.loginUrl.toLowerCase()))) {
                    this.authService.reLogin();
                    return Observable.throw('session expired');
                }
                else {
                    return Observable.throw(refreshLoginError || 'server error');
                }
            });
        }
        if (error.url && error.url.toLowerCase().includes(this.loginUrl.toLowerCase())) {
            this.authService.reLogin();
            return Observable.throw('session expired');
        }
        else {
            return Observable.throw(error || 'server error');
        }
    }
    pauseTask(continuation) {
        if (!this.taskPauser)
            this.taskPauser = new Subject();
        return this.taskPauser.switchMap(continueOp => {
            return continueOp ? continuation() : Observable.throw('session expired');
        });
    }
    resumeTasks(continueOp) {
        setTimeout(() => {
            if (this.taskPauser) {
                this.taskPauser.next(continueOp);
                this.taskPauser.complete();
                this.taskPauser = null;
            }
        });
    }
};
EndpointFactory.apiVersion = "1";
EndpointFactory = EndpointFactory_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ConfigurationService, Injector])
], EndpointFactory);
export { EndpointFactory };
var EndpointFactory_1;
//# sourceMappingURL=endpoint-factory.service.js.map