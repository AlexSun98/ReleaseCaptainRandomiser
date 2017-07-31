export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export class Login {
    constructor(payload) {
        this.payload = payload;
        this.type = LOGIN;
    }
}
export class LoginSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LOGIN_SUCCESS;
    }
}
export class LoginFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = LOGIN_FAILURE;
    }
}
export class LoginRedirect {
    constructor() {
        this.type = LOGIN_REDIRECT;
    }
}
export class Logout {
    constructor() {
        this.type = LOGOUT;
    }
}
//# sourceMappingURL=auth.js.map