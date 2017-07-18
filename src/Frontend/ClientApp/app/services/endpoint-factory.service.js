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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/catch");
var auth_service_1 = require("./auth.service");
var configuration_service_1 = require("./configuration.service");
var EndpointFactory = EndpointFactory_1 = (function () {
    function EndpointFactory(http, configurations, injector) {
        this.http = http;
        this.configurations = configurations;
        this.injector = injector;
        this._loginUrl = "/connect/token";
    }
    Object.defineProperty(EndpointFactory.prototype, "loginUrl", {
        get: function () { return this.configurations.baseUrl + this._loginUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointFactory.prototype, "authService", {
        get: function () {
            if (!this._authService)
                this._authService = this.injector.get(auth_service_1.AuthService);
            return this._authService;
        },
        enumerable: true,
        configurable: true
    });
    EndpointFactory.prototype.getLoginEndpoint = function (userName, password) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var searchParams = new http_1.URLSearchParams();
        searchParams.append('username', userName);
        searchParams.append('password', password);
        searchParams.append('grant_type', 'password');
        searchParams.append('scope', 'openid email profile offline_access roles');
        searchParams.append('resource', window.location.origin);
        var requestBody = searchParams.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header });
    };
    EndpointFactory.prototype.getRefreshLoginEndpoint = function () {
        var _this = this;
        var header = new http_1.Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var searchParams = new http_1.URLSearchParams();
        searchParams.append('refresh_token', this.authService.refreshToken);
        searchParams.append('grant_type', 'refresh_token');
        searchParams.append('scope', 'openid email profile offline_access roles');
        var requestBody = searchParams.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header })
            .map(function (response) {
            return response;
        })
            .catch(function (error) {
            return _this.handleError(error, function () { return _this.getRefreshLoginEndpoint(); });
        });
    };
    EndpointFactory.prototype.getAuthHeader = function (includeJsonContentType) {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authService.accessToken });
        if (includeJsonContentType)
            headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/vnd.iman.v" + EndpointFactory_1.apiVersion + "+json, application/json, text/plain, */*");
        headers.append("App-Version", configuration_service_1.ConfigurationService.appVersion);
        return new http_1.RequestOptions({ headers: headers });
    };
    EndpointFactory.prototype.handleError = function (error, continuation) {
        var _this = this;
        if (error.status == 401) {
            if (this.isRefreshingLogin) {
                return this.pauseTask(continuation);
            }
            this.isRefreshingLogin = true;
            return this.authService.refreshLogin()
                .mergeMap(function (data) {
                _this.isRefreshingLogin = false;
                _this.resumeTasks(true);
                return continuation();
            })
                .catch(function (refreshLoginError) {
                _this.isRefreshingLogin = false;
                _this.resumeTasks(false);
                if (refreshLoginError.status == 401 || (refreshLoginError.url && refreshLoginError.url.toLowerCase().includes(_this.loginUrl.toLowerCase()))) {
                    _this.authService.reLogin();
                    return Observable_1.Observable.throw('session expired');
                }
                else {
                    return Observable_1.Observable.throw(refreshLoginError || 'server error');
                }
            });
        }
        if (error.url && error.url.toLowerCase().includes(this.loginUrl.toLowerCase())) {
            this.authService.reLogin();
            return Observable_1.Observable.throw('session expired');
        }
        else {
            return Observable_1.Observable.throw(error || 'server error');
        }
    };
    EndpointFactory.prototype.pauseTask = function (continuation) {
        if (!this.taskPauser)
            this.taskPauser = new Subject_1.Subject();
        return this.taskPauser.switchMap(function (continueOp) {
            return continueOp ? continuation() : Observable_1.Observable.throw('session expired');
        });
    };
    EndpointFactory.prototype.resumeTasks = function (continueOp) {
        var _this = this;
        setTimeout(function () {
            if (_this.taskPauser) {
                _this.taskPauser.next(continueOp);
                _this.taskPauser.complete();
                _this.taskPauser = null;
            }
        });
    };
    return EndpointFactory;
}());
EndpointFactory.apiVersion = "1";
EndpointFactory = EndpointFactory_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, configuration_service_1.ConfigurationService, core_1.Injector])
], EndpointFactory);
exports.EndpointFactory = EndpointFactory;
var EndpointFactory_1;
//# sourceMappingURL=endpoint-factory.service.js.map