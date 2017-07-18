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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var account_endpoint_service_1 = require("./account-endpoint.service");
var auth_service_1 = require("./auth.service");
var AccountService = AccountService_1 = (function () {
    function AccountService(router, http, authService, accountEndpoint) {
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.accountEndpoint = accountEndpoint;
        this._rolesChanged = new Subject_1.Subject();
    }
    AccountService.prototype.getUser = function (userId) {
        return this.accountEndpoint.getUserEndpoint(userId)
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.getUserAndRoles = function (userId) {
        return Observable_1.Observable.forkJoin(this.accountEndpoint.getUserEndpoint(userId).map(function (response) { return response.json(); }), this.accountEndpoint.getRolesEndpoint().map(function (response) { return response.json(); }));
    };
    AccountService.prototype.getUsers = function (page, pageSize) {
        return this.accountEndpoint.getUsersEndpoint(page, pageSize)
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.getUsersAndRoles = function (page, pageSize) {
        return Observable_1.Observable.forkJoin(this.accountEndpoint.getUsersEndpoint(page, pageSize).map(function (response) { return response.json(); }), this.accountEndpoint.getRolesEndpoint().map(function (response) { return response.json(); }));
    };
    AccountService.prototype.updateUser = function (user) {
        var _this = this;
        if (user.id) {
            return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
        }
        else {
            return this.accountEndpoint.getUserByUserNameEndpoint(user.userName)
                .map(function (response) { return response.json(); })
                .mergeMap(function (foundUser) {
                user.id = foundUser.id;
                return _this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
            });
        }
    };
    AccountService.prototype.newUser = function (user) {
        return this.accountEndpoint.getNewUserEndpoint(user)
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.getUserPreferences = function () {
        return this.accountEndpoint.getUserPreferencesEndpoint()
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.updateUserPreferences = function (configuration) {
        return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
    };
    AccountService.prototype.deleteUser = function (userOrUserId) {
        var _this = this;
        if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
            return this.accountEndpoint.getDeleteUserEndpoint(userOrUserId)
                .map(function (response) { return response.json(); })
                .do(function (data) { return _this.onRolesUserCountChanged(data.roles); });
        }
        else {
            if (userOrUserId.id) {
                return this.deleteUser(userOrUserId.id);
            }
            else {
                return this.accountEndpoint.getUserByUserNameEndpoint(userOrUserId.userName)
                    .map(function (response) { return response.json(); })
                    .mergeMap(function (user) { return _this.deleteUser(user.id); });
            }
        }
    };
    AccountService.prototype.unblockUser = function (userId) {
        return this.accountEndpoint.getUnblockUserEndpoint(userId);
    };
    AccountService.prototype.userHasPermission = function (permissionValue) {
        return this.permissions.some(function (p) { return p == permissionValue; });
    };
    AccountService.prototype.refreshLoggedInUser = function () {
        return this.authService.refreshLogin();
    };
    AccountService.prototype.getRoles = function (page, pageSize) {
        return this.accountEndpoint.getRolesEndpoint(page, pageSize)
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.getRolesAndPermissions = function (page, pageSize) {
        return Observable_1.Observable.forkJoin(this.accountEndpoint.getRolesEndpoint(page, pageSize).map(function (response) { return response.json(); }), this.accountEndpoint.getPermissionsEndpoint().map(function (response) { return response.json(); }));
    };
    AccountService.prototype.updateRole = function (role) {
        var _this = this;
        if (role.id) {
            return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id)
                .do(function (data) { return _this.onRolesChanged([role], AccountService_1.roleModifiedOperation); });
        }
        else {
            return this.accountEndpoint.getRoleByRoleNameEndpoint(role.name)
                .map(function (response) { return response.json(); })
                .mergeMap(function (foundRole) {
                role.id = foundRole.id;
                return _this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
            })
                .do(function (data) { return _this.onRolesChanged([role], AccountService_1.roleModifiedOperation); });
        }
    };
    AccountService.prototype.newRole = function (role) {
        var _this = this;
        return this.accountEndpoint.getNewRoleEndpoint(role)
            .map(function (response) { return response.json(); })
            .do(function (data) { return _this.onRolesChanged([role], AccountService_1.roleAddedOperation); });
    };
    AccountService.prototype.deleteRole = function (roleOrRoleId) {
        var _this = this;
        if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
            return this.accountEndpoint.getDeleteRoleEndpoint(roleOrRoleId)
                .map(function (response) { return response.json(); })
                .do(function (data) { return _this.onRolesChanged([data], AccountService_1.roleDeletedOperation); });
        }
        else {
            if (roleOrRoleId.id) {
                return this.deleteRole(roleOrRoleId.id);
            }
            else {
                return this.accountEndpoint.getRoleByRoleNameEndpoint(roleOrRoleId.name)
                    .map(function (response) { return response.json(); })
                    .mergeMap(function (role) { return _this.deleteRole(role.id); });
            }
        }
    };
    AccountService.prototype.getPermissions = function () {
        return this.accountEndpoint.getPermissionsEndpoint()
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.onRolesChanged = function (roles, op) {
        this._rolesChanged.next({ roles: roles, operation: op });
    };
    AccountService.prototype.onRolesUserCountChanged = function (roles) {
        return this.onRolesChanged(roles, AccountService_1.roleModifiedOperation);
    };
    AccountService.prototype.getRolesChangedEvent = function () {
        return this._rolesChanged.asObservable();
    };
    Object.defineProperty(AccountService.prototype, "permissions", {
        get: function () {
            return this.authService.userPermissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountService.prototype, "currentUser", {
        get: function () {
            return this.authService.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    return AccountService;
}());
AccountService.roleAddedOperation = "add";
AccountService.roleDeletedOperation = "delete";
AccountService.roleModifiedOperation = "modify";
AccountService = AccountService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, auth_service_1.AuthService,
        account_endpoint_service_1.AccountEndpoint])
], AccountService);
exports.AccountService = AccountService;
var AccountService_1;
//# sourceMappingURL=account.service.js.map