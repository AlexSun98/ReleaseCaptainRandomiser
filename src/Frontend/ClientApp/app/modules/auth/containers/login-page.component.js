var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
let LoginPageComponent = class LoginPageComponent {
    constructor(store) {
        this.store = store;
        this.pending$ = this.store.select(fromAuth.getLoginPagePending);
        this.error$ = this.store.select(fromAuth.getLoginPageError);
    }
    ngOnInit() { }
    onSubmit($event) {
        this.store.dispatch(new Auth.Login($event));
    }
};
LoginPageComponent = __decorate([
    Component({
        selector: 'bc-login-page',
        template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </bc-login-form>
  `,
        styles: [],
    }),
    __metadata("design:paramtypes", [Store])
], LoginPageComponent);
export { LoginPageComponent };
//# sourceMappingURL=login-page.component.js.map