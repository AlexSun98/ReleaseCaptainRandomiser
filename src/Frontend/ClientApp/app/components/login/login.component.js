var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from "../../services/auth.service";
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserLogin } from '../../models/user-login.model';
let LoginComponent = class LoginComponent {
    constructor(alertService, authService, configurations) {
        this.alertService = alertService;
        this.authService = authService;
        this.configurations = configurations;
        this.userLogin = new UserLogin();
        this.isLoading = false;
        this.formResetToggle = true;
        this.isModal = false;
    }
    ngOnInit() {
        this.userLogin.rememberMe = this.authService.rememberMe;
        if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
        }
        else {
            this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
                if (this.getShouldRedirect()) {
                    this.authService.redirectLoginUser();
                }
            });
        }
    }
    ngOnDestroy() {
        if (this.loginStatusSubscription)
            this.loginStatusSubscription.unsubscribe();
    }
    getShouldRedirect() {
        return !this.isModal && this.authService.isLoggedIn && !this.authService.isSessionExpired;
    }
    showErrorAlert(caption, message) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }
    closeModal() {
        if (this.modalClosedCallback) {
            this.modalClosedCallback();
        }
    }
    login() {
        this.isLoading = true;
        this.alertService.startLoadingMessage("", "Attempting login...");
        this.authService.login(this.userLogin.email, this.userLogin.password, this.userLogin.rememberMe)
            .subscribe(user => {
            setTimeout(() => {
                this.alertService.stopLoadingMessage();
                this.isLoading = false;
                this.reset();
                if (!this.isModal) {
                    this.alertService.showMessage("Login", `Welcome ${user.userName}!`, MessageSeverity.success);
                }
                else {
                    this.alertService.showMessage("Login", `Session for ${user.userName} restored!`, MessageSeverity.success);
                    setTimeout(() => {
                        this.alertService.showStickyMessage("Session Restored", "Please try your last operation again", MessageSeverity.default);
                    }, 500);
                    this.closeModal();
                }
            }, 500);
        }, error => {
            this.alertService.stopLoadingMessage();
            if (Utilities.checkNoNetwork(error)) {
                this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
                this.offerAlternateHost();
            }
            else {
                let errorMessage = Utilities.findHttpResponseMessage("error_description", error);
                if (errorMessage)
                    this.alertService.showStickyMessage("Unable to login", errorMessage, MessageSeverity.error, error);
                else
                    this.alertService.showStickyMessage("Unable to login", "An error occured whilst logging in, please try again later.\nError: " + error.statusText || error.status, MessageSeverity.error, error);
            }
            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        });
    }
    offerAlternateHost() {
        if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
            this.alertService.showDialog("Dear Developer!\nIt appears your backend Web API service is not running...\n" +
                "Would you want to temporarily switch to the online Demo API below?(Or specify another)", DialogType.prompt, (value) => {
                this.configurations.baseUrl = value;
                this.alertService.showStickyMessage("API Changed!", "The target Web API has been changed to: " + value, MessageSeverity.warn);
            }, null, null, null, this.configurations.fallbackBaseUrl);
        }
    }
    reset() {
        this.formResetToggle = false;
        setTimeout(() => {
            this.formResetToggle = true;
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "isModal", void 0);
LoginComponent = __decorate([
    Component({
        selector: "app-login",
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [AlertService, AuthService, ConfigurationService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map