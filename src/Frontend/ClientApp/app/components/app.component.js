"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var alert_service_1 = require("../services/alert.service");
var notification_service_1 = require("../services/notification.service");
var app_translation_service_1 = require("../services/app-translation.service");
var account_service_1 = require("../services/account.service");
var local_store_manager_service_1 = require("../services/local-store-manager.service");
var app_title_service_1 = require("../services/app-title.service");
var auth_service_1 = require("../services/auth.service");
var configuration_service_1 = require("../services/configuration.service");
var permission_model_1 = require("../models/permission.model");
var login_component_1 = require("../components/login/login.component");
var alertify = require('../assets/scripts/alertify.js');
var AppComponent = (function () {
    function AppComponent(storageManager, router, toastyService, toastyConfig, accountService, alertService, notificationService, appTitleService, authService, configurations, translationService) {
        this.router = router;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.accountService = accountService;
        this.alertService = alertService;
        this.notificationService = notificationService;
        this.appTitleService = appTitleService;
        this.authService = authService;
        this.configurations = configurations;
        this.translationService = translationService;
        this.newNotificationCount = 0;
        this.appTitle = "DevPlus Application";
        this.appLogo = require("../assets/images/logo.png");
        this.stickyToasties = [];
        this.dataLoadingConsecutiveFailurs = 0;
        storageManager.initialiseStorageSyncListener();
        translationService.addLanguages(["en", "fr", "ar", "ko"]);
        translationService.setDefaultLanguage('en');
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-right';
        this.toastyConfig.limit = 100;
        this.toastyConfig.showClose = true;
        this.appTitleService.appName = this.appTitle;
    }
    Object.defineProperty(AppComponent.prototype, "notificationsTitle", {
        get: function () {
            var _this = this;
            var gT = function (key) { return _this.translationService.getTranslation(key); };
            if (this.newNotificationCount)
                return gT("app.Notifications") + " (" + this.newNotificationCount + " " + gT("app.New") + ")";
            else
                return gT("app.Notifications");
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.modalLoginControls.changes.subscribe(function (controls) {
            controls.forEach(function (control) {
                if (control) {
                    if (control instanceof login_component_1.LoginComponent) {
                        _this.loginControl = control;
                        _this.loginControl.modalClosedCallback = function () { return _this.loginModal.hide(); };
                    }
                    else {
                        _this.loginModal = control;
                        _this.loginModal.show();
                    }
                }
            });
        });
    };
    AppComponent.prototype.onLoginModalShown = function () {
        this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", alert_service_1.MessageSeverity.info);
    };
    AppComponent.prototype.onLoginModalHidden = function () {
        this.alertService.resetStickyMessage();
        this.loginControl.reset();
        this.shouldShowLoginModal = false;
        if (this.authService.isSessionExpired)
            this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again to renew your session", alert_service_1.MessageSeverity.warn);
    };
    AppComponent.prototype.onLoginModalHide = function () {
        this.alertService.resetStickyMessage();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isUserLoggedIn = this.authService.isLoggedIn;
        // 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
        setTimeout(function () { return _this.isAppLoaded = true; }, 1000);
        setTimeout(function () { return _this.removePrebootScreen = true; }, 1500);
        setTimeout(function () {
            if (_this.isUserLoggedIn) {
                _this.alertService.resetStickyMessage();
                //if (!this.authService.isSessionExpired)
                _this.alertService.showMessage("Login", "Welcome back " + _this.userName + "!", alert_service_1.MessageSeverity.default);
                //else
                //    this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", MessageSeverity.warn);
            }
        }, 2000);
        this.alertService.getDialogEvent().subscribe(function (alert) { return _this.showDialog(alert); });
        this.alertService.getMessageEvent().subscribe(function (message) { return _this.showToast(message, false); });
        this.alertService.getStickyMessageEvent().subscribe(function (message) { return _this.showToast(message, true); });
        this.authService.reLoginDelegate = function () { return _this.shouldShowLoginModal = true; };
        this.authService.getLoginStatusEvent().subscribe(function (isLoggedIn) {
            _this.isUserLoggedIn = isLoggedIn;
            if (_this.isUserLoggedIn) {
                _this.initNotificationsLoading();
            }
            else {
                _this.unsubscribeNotifications();
            }
            setTimeout(function () {
                if (!_this.isUserLoggedIn) {
                    _this.alertService.showMessage("Session Ended!", "", alert_service_1.MessageSeverity.default);
                }
            }, 500);
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                var url = event.url;
                if (url !== url.toLowerCase()) {
                    _this.router.navigateByUrl(event.url.toLowerCase());
                }
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeNotifications();
    };
    AppComponent.prototype.unsubscribeNotifications = function () {
        if (this.notificationsLoadingSubscription)
            this.notificationsLoadingSubscription.unsubscribe();
    };
    AppComponent.prototype.initNotificationsLoading = function () {
        var _this = this;
        this.notificationsLoadingSubscription = this.notificationService.getNewNotificationsPeriodically()
            .subscribe(function (notifications) {
            _this.dataLoadingConsecutiveFailurs = 0;
            _this.newNotificationCount = notifications.filter(function (n) { return !n.isRead; }).length;
        }, function (error) {
            _this.alertService.logError(error);
            if (_this.dataLoadingConsecutiveFailurs++ < 20)
                setTimeout(function () { return _this.initNotificationsLoading(); }, 5000);
            else
                _this.alertService.showStickyMessage("Load Error", "Loading new notifications from the server failed!", alert_service_1.MessageSeverity.error);
        });
    };
    AppComponent.prototype.markNotificationsAsRead = function () {
        var _this = this;
        var recentNotifications = this.notificationService.recentNotifications;
        if (recentNotifications.length) {
            this.notificationService.readUnreadNotification(recentNotifications.map(function (n) { return n.id; }), true)
                .subscribe(function (response) {
                for (var _i = 0, recentNotifications_1 = recentNotifications; _i < recentNotifications_1.length; _i++) {
                    var n = recentNotifications_1[_i];
                    n.isRead = true;
                }
                _this.newNotificationCount = recentNotifications.filter(function (n) { return !n.isRead; }).length;
            }, function (error) {
                _this.alertService.logError(error);
                _this.alertService.showMessage("Notification Error", "Marking read notifications failed", alert_service_1.MessageSeverity.error);
            });
        }
    };
    AppComponent.prototype.showDialog = function (dialog) {
        alertify.set({
            labels: {
                ok: dialog.okLabel || "OK",
                cancel: dialog.cancelLabel || "Cancel"
            }
        });
        switch (dialog.type) {
            case alert_service_1.DialogType.alert:
                alertify.alert(dialog.message);
                break;
            case alert_service_1.DialogType.confirm:
                alertify
                    .confirm(dialog.message, function (e) {
                    if (e) {
                        dialog.okCallback();
                    }
                    else {
                        if (dialog.cancelCallback)
                            dialog.cancelCallback();
                    }
                });
                break;
            case alert_service_1.DialogType.prompt:
                alertify
                    .prompt(dialog.message, function (e, val) {
                    if (e) {
                        dialog.okCallback(val);
                    }
                    else {
                        if (dialog.cancelCallback)
                            dialog.cancelCallback();
                    }
                }, dialog.defaultValue);
                break;
        }
    };
    AppComponent.prototype.showToast = function (message, isSticky) {
        var _this = this;
        if (message == null) {
            for (var _i = 0, _a = this.stickyToasties.slice(0); _i < _a.length; _i++) {
                var id = _a[_i];
                this.toastyService.clear(id);
            }
            return;
        }
        var toastOptions = {
            title: message.summary,
            msg: message.detail,
            timeout: isSticky ? 0 : 4000
        };
        if (isSticky) {
            toastOptions.onAdd = function (toast) { return _this.stickyToasties.push(toast.id); };
            toastOptions.onRemove = function (toast) {
                var index = _this.stickyToasties.indexOf(toast.id, 0);
                if (index > -1) {
                    _this.stickyToasties.splice(index, 1);
                }
                toast.onAdd = null;
                toast.onRemove = null;
            };
        }
        switch (message.severity) {
            case alert_service_1.MessageSeverity.default:
                this.toastyService.default(toastOptions);
                break;
            case alert_service_1.MessageSeverity.info:
                this.toastyService.info(toastOptions);
                break;
            case alert_service_1.MessageSeverity.success:
                this.toastyService.success(toastOptions);
                break;
            case alert_service_1.MessageSeverity.error:
                this.toastyService.error(toastOptions);
                break;
            case alert_service_1.MessageSeverity.warn:
                this.toastyService.warning(toastOptions);
                break;
            case alert_service_1.MessageSeverity.wait:
                this.toastyService.wait(toastOptions);
                break;
        }
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.authService.redirectLogoutUser();
    };
    AppComponent.prototype.getYear = function () {
        return new Date().getUTCFullYear();
    };
    Object.defineProperty(AppComponent.prototype, "userName", {
        get: function () {
            return this.authService.currentUser ? this.authService.currentUser.userName : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "fullName", {
        get: function () {
            return this.authService.currentUser ? this.authService.currentUser.fullName : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "canViewCustomers", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewUsersPermission); //eg. viewCustomersPermission
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "canViewProducts", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewUsersPermission); //eg. viewProductsPermission
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "canViewOrders", {
        get: function () {
            return true; //eg. viewOrdersPermission
        },
        enumerable: true,
        configurable: true
    });
    return AppComponent;
}());
__decorate([
    core_1.ViewChildren('loginModal,loginControl'),
    __metadata("design:type", core_1.QueryList)
], AppComponent.prototype, "modalLoginControls", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css', '../styles.css', '../themes.css'],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [local_store_manager_service_1.LocalStoreManager, router_1.Router, ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig,
        account_service_1.AccountService, alert_service_1.AlertService, notification_service_1.NotificationService, app_title_service_1.AppTitleService,
        auth_service_1.AuthService, configuration_service_1.ConfigurationService, app_translation_service_1.AppTranslationService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map