var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
let LoginFormComponent = class LoginFormComponent {
    constructor() {
        this.submitted = new EventEmitter();
        this.form = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
        });
    }
    set pending(isPending) {
        if (isPending) {
            this.form.disable();
        }
        this.form.enable();
    }
    ngOnInit() { }
    submit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], LoginFormComponent.prototype, "pending", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], LoginFormComponent.prototype, "errorMessage", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LoginFormComponent.prototype, "submitted", void 0);
LoginFormComponent = __decorate([
    Component({
        selector: 'bc-login-form',
        template: `
    <md-card>
      <md-card-title>Login</md-card-title>
      <md-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <p>
            <md-input-container>
              <input type="text" mdInput placeholder="Username" formControlName="username">
            </md-input-container>
          </p>

          <p>
            <md-input-container>
              <input type="password" mdInput placeholder="Password" formControlName="password">
            </md-input-container>
          </p>

          <p *ngIf="errorMessage" class="loginError">
            {{ errorMessage }}
          </p>          
        
          <p class="loginButtons">
            <button type="submit" md-button>Login</button>
          </p>

        </form>
      </md-card-content>
    </md-card>
  `,
        styles: [
            `
    :host {
      display: flex;
      justify-content: center;
      margin: 72px 0;
    }

    md-card-title,
    md-card-content {
      display: flex;
      justify-content: center;
    }

    input {
      width: 300px;
    }

    .loginError {
      padding: 16px;
      width: 300px;
      font-color: white;
      background-color: red;
    }

    .loginButtons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `,
        ],
    }),
    __metadata("design:paramtypes", [])
], LoginFormComponent);
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map