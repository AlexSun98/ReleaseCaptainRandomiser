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
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
let AccountService = AccountService_1 = class AccountService {
    constructor(router, http, authService, accountEndpoint) {
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.accountEndpoint = accountEndpoint;
        this._rolesChanged = new Subject();
    }
    getUser(userId) {
        return this.accountEndpoint.getUserEndpoint(userId)
            .map((response) => response.json());
    }
    getUserAndRoles(userId) {
        return Observable.forkJoin(this.accountEndpoint.getUserEndpoint(userId).map((response) => response.json()), this.accountEndpoint.getRolesEndpoint().map((response) => response.json()));
    }
    getUsers(page, pageSize) {
        return this.accountEndpoint.getUsersEndpoint(page, pageSize)
            .map((response) => response.json());
    }
    getUsersAndRoles(page, pageSize) {
        return Observable.forkJoin(this.accountEndpoint.getUsersEndpoint(page, pageSize).map((response) => response.json()), this.accountEndpoint.getRolesEndpoint().map((response) => response.json()));
    }
    updateUser(user) {
        if (user.id) {
            return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
        }
        else {
            return this.accountEndpoint.getUserByUserNameEndpoint(user.userName)
                .map((response) => response.json())
                .mergeMap(foundUser => {
                user.id = foundUser.id;
                return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
            });
        }
    }
    newUser(user) {
        return this.accountEndpoint.getNewUserEndpoint(user)
            .map((response) => response.json());
    }
    getUserPreferences() {
        return this.accountEndpoint.getUserPreferencesEndpoint()
            .map((response) => response.json());
    }
    updateUserPreferences(configuration) {
        return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
    }
    deleteUser(userOrUserId) {
        if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
            return this.accountEndpoint.getDeleteUserEndpoint(userOrUserId)
                .map((response) => response.json())
                .do(data => this.onRolesUserCountChanged(data.roles));
        }
        else {
            if (userOrUserId.id) {
                return this.deleteUser(userOrUserId.id);
            }
            else {
                return this.accountEndpoint.getUserByUserNameEndpoint(userOrUserId.userName)
                    .map((response) => response.json())
                    .mergeMap(user => this.deleteUser(user.id));
            }
        }
    }
    unblockUser(userId) {
        return this.accountEndpoint.getUnblockUserEndpoint(userId);
    }
    userHasPermission(permissionValue) {
        return this.permissions.some(p => p == permissionValue);
    }
    refreshLoggedInUser() {
        return this.authService.refreshLogin();
    }
    getRoles(page, pageSize) {
        return this.accountEndpoint.getRolesEndpoint(page, pageSize)
            .map((response) => response.json());
    }
    getRolesAndPermissions(page, pageSize) {
        return Observable.forkJoin(this.accountEndpoint.getRolesEndpoint(page, pageSize).map((response) => response.json()), this.accountEndpoint.getPermissionsEndpoint().map((response) => response.json()));
    }
    updateRole(role) {
        if (role.id) {
            return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id)
                .do(data => this.onRolesChanged([role], AccountService_1.roleModifiedOperation));
        }
        else {
            return this.accountEndpoint.getRoleByRoleNameEndpoint(role.name)
                .map((response) => response.json())
                .mergeMap(foundRole => {
                role.id = foundRole.id;
                return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
            })
                .do(data => this.onRolesChanged([role], AccountService_1.roleModifiedOperation));
        }
    }
    newRole(role) {
        return this.accountEndpoint.getNewRoleEndpoint(role)
            .map((response) => response.json())
            .do(data => this.onRolesChanged([role], AccountService_1.roleAddedOperation));
    }
    deleteRole(roleOrRoleId) {
        if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
            return this.accountEndpoint.getDeleteRoleEndpoint(roleOrRoleId)
                .map((response) => response.json())
                .do(data => this.onRolesChanged([data], AccountService_1.roleDeletedOperation));
        }
        else {
            if (roleOrRoleId.id) {
                return this.deleteRole(roleOrRoleId.id);
            }
            else {
                return this.accountEndpoint.getRoleByRoleNameEndpoint(roleOrRoleId.name)
                    .map((response) => response.json())
                    .mergeMap(role => this.deleteRole(role.id));
            }
        }
    }
    getPermissions() {
        return this.accountEndpoint.getPermissionsEndpoint()
            .map((response) => response.json());
    }
    onRolesChanged(roles, op) {
        this._rolesChanged.next({ roles: roles, operation: op });
    }
    onRolesUserCountChanged(roles) {
        return this.onRolesChanged(roles, AccountService_1.roleModifiedOperation);
    }
    getRolesChangedEvent() {
        return this._rolesChanged.asObservable();
    }
    get permissions() {
        return this.authService.userPermissions;
    }
    get currentUser() {
        return this.authService.currentUser;
    }
};
AccountService.roleAddedOperation = "add";
AccountService.roleDeletedOperation = "delete";
AccountService.roleModifiedOperation = "modify";
AccountService = AccountService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, Http, AuthService,
        AccountEndpoint])
], AccountService);
export { AccountService };
var AccountService_1;
//# sourceMappingURL=account.service.js.map