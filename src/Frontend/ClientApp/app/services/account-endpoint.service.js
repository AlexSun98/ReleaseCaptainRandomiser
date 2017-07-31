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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
let AccountEndpoint = class AccountEndpoint extends EndpointFactory {
    constructor(http, configurations, injector) {
        super(http, configurations, injector);
        this._usersUrl = "/api/account/users";
        this._userByUserNameUrl = "/api/account/users/username";
        this._currentUserUrl = "/api/account/users/me";
        this._currentUserPreferencesUrl = "/api/account/users/me/preferences";
        this._unblockUserUrl = "/api/account/users/unblock";
        this._rolesUrl = "/api/account/roles";
        this._roleByRoleNameUrl = "/api/account/roles/name";
        this._permissionsUrl = "/api/account/permissions";
    }
    get usersUrl() { return this.configurations.baseUrl + this._usersUrl; }
    get userByUserNameUrl() { return this.configurations.baseUrl + this._userByUserNameUrl; }
    get currentUserUrl() { return this.configurations.baseUrl + this._currentUserUrl; }
    get currentUserPreferencesUrl() { return this.configurations.baseUrl + this._currentUserPreferencesUrl; }
    get unblockUserUrl() { return this.configurations.baseUrl + this._unblockUserUrl; }
    get rolesUrl() { return this.configurations.baseUrl + this._rolesUrl; }
    get roleByRoleNameUrl() { return this.configurations.baseUrl + this._roleByRoleNameUrl; }
    get permissionsUrl() { return this.configurations.baseUrl + this._permissionsUrl; }
    getUserEndpoint(userId) {
        let endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUserEndpoint(userId));
        });
    }
    getUserByUserNameEndpoint(userName) {
        let endpointUrl = `${this.userByUserNameUrl}/${userName}`;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUserByUserNameEndpoint(userName));
        });
    }
    getUsersEndpoint(page, pageSize) {
        let endpointUrl = page && pageSize ? `${this.usersUrl}/${page}/${pageSize}` : this.usersUrl;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUsersEndpoint(page, pageSize));
        });
    }
    getNewUserEndpoint(userObject) {
        return this.http.post(this.usersUrl, JSON.stringify(userObject), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getNewUserEndpoint(userObject));
        });
    }
    getUpdateUserEndpoint(userObject, userId) {
        let endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
        return this.http.put(endpointUrl, JSON.stringify(userObject), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUpdateUserEndpoint(userObject, userId));
        });
    }
    getPatchUpdateUserEndpoint(valueOrPatch, opOrUserId, path, from, userId) {
        let endpointUrl;
        let patchDocument;
        if (path) {
            endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
            patchDocument = from ?
                [{ "value": valueOrPatch, "path": path, "op": opOrUserId, "from": from }] :
                [{ "value": valueOrPatch, "path": path, "op": opOrUserId }];
        }
        else {
            endpointUrl = opOrUserId ? `${this.usersUrl}/${opOrUserId}` : this.currentUserUrl;
            patchDocument = valueOrPatch;
        }
        return this.http.patch(endpointUrl, JSON.stringify(patchDocument), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getPatchUpdateUserEndpoint(valueOrPatch, opOrUserId, path, from, userId));
        });
    }
    getUserPreferencesEndpoint() {
        return this.http.get(this.currentUserPreferencesUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUserPreferencesEndpoint());
        });
    }
    getUpdateUserPreferencesEndpoint(configuration) {
        return this.http.put(this.currentUserPreferencesUrl, JSON.stringify(configuration), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUpdateUserPreferencesEndpoint(configuration));
        });
    }
    getUnblockUserEndpoint(userId) {
        let endpointUrl = `${this.unblockUserUrl}/${userId}`;
        return this.http.put(endpointUrl, null, this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUnblockUserEndpoint(userId));
        });
    }
    getDeleteUserEndpoint(userId) {
        let endpointUrl = `${this.usersUrl}/${userId}`;
        return this.http.delete(endpointUrl, this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getDeleteUserEndpoint(userId));
        });
    }
    getRoleEndpoint(roleId) {
        let endpointUrl = `${this.rolesUrl}/${roleId}`;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getRoleEndpoint(roleId));
        });
    }
    getRoleByRoleNameEndpoint(roleName) {
        let endpointUrl = `${this.roleByRoleNameUrl}/${roleName}`;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getRoleByRoleNameEndpoint(roleName));
        });
    }
    getRolesEndpoint(page, pageSize) {
        let endpointUrl = page && pageSize ? `${this.rolesUrl}/${page}/${pageSize}` : this.rolesUrl;
        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getRolesEndpoint(page, pageSize));
        });
    }
    getNewRoleEndpoint(roleObject) {
        return this.http.post(this.rolesUrl, JSON.stringify(roleObject), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getNewRoleEndpoint(roleObject));
        });
    }
    getUpdateRoleEndpoint(roleObject, roleId) {
        let endpointUrl = `${this.rolesUrl}/${roleId}`;
        return this.http.put(endpointUrl, JSON.stringify(roleObject), this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getUpdateRoleEndpoint(roleObject, roleId));
        });
    }
    getDeleteRoleEndpoint(roleId) {
        let endpointUrl = `${this.rolesUrl}/${roleId}`;
        return this.http.delete(endpointUrl, this.getAuthHeader(true))
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getDeleteRoleEndpoint(roleId));
        });
    }
    getPermissionsEndpoint() {
        return this.http.get(this.permissionsUrl, this.getAuthHeader())
            .map((response) => {
            return response;
        })
            .catch(error => {
            return this.handleError(error, () => this.getPermissionsEndpoint());
        });
    }
};
AccountEndpoint = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ConfigurationService, Injector])
], AccountEndpoint);
export { AccountEndpoint };
//# sourceMappingURL=account-endpoint.service.js.map