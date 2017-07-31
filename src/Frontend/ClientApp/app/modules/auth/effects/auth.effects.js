var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';
let AuthEffects = class AuthEffects {
    constructor(actions$, authService, router) {
        this.actions$ = actions$;
        this.authService = authService;
        this.router = router;
        this.login$ = this.actions$
            .ofType(Auth.LOGIN)
            .map((action) => action.payload)
            .exhaustMap(auth => this.authService
            .login(auth)
            .map(user => new Auth.LoginSuccess({ user }))
            .catch(error => of(new Auth.LoginFailure(error))));
        this.loginSuccess$ = this.actions$
            .ofType(Auth.LOGIN_SUCCESS)
            .do(() => this.router.navigate(['/']));
        this.loginRedirect$ = this.actions$
            .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
            .do(authed => {
            this.router.navigate(['/login']);
        });
    }
};
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "login$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], AuthEffects.prototype, "loginSuccess$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], AuthEffects.prototype, "loginRedirect$", void 0);
AuthEffects = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Actions,
        AuthService,
        Router])
], AuthEffects);
export { AuthEffects };
//# sourceMappingURL=auth.effects.js.map