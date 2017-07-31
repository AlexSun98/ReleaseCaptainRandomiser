var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';
export const COMPONENTS = [LoginPageComponent, LoginFormComponent];
let AuthModule = class AuthModule {
    static forRoot() {
        return {
            ngModule: RootAuthModule,
            providers: [AuthService, AuthGuard],
        };
    }
};
AuthModule = __decorate([
    NgModule({
        imports: [CommonModule, ReactiveFormsModule, MaterialModule],
        declarations: COMPONENTS,
        exports: COMPONENTS,
    })
], AuthModule);
export { AuthModule };
let RootAuthModule = class RootAuthModule {
};
RootAuthModule = __decorate([
    NgModule({
        imports: [
            AuthModule,
            RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
            StoreModule.forFeature('auth', reducers),
            EffectsModule.forFeature([AuthEffects]),
        ],
    })
], RootAuthModule);
export { RootAuthModule };
//# sourceMappingURL=auth.module.js.map