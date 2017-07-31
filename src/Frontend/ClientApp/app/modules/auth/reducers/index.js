import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';
export const reducers = {
    status: fromAuth.reducer,
    loginPage: fromLoginPage.reducer,
};
export const selectAuthState = createFeatureSelector('auth');
export const selectAuthStatusState = createSelector(selectAuthState, (state) => state.status);
export const getLoggedIn = createSelector(selectAuthStatusState, fromAuth.getLoggedIn);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const selectLoginPageState = createSelector(selectAuthState, (state) => state.loginPage);
export const getLoginPageError = createSelector(selectLoginPageState, fromLoginPage.getError);
export const getLoginPagePending = createSelector(selectLoginPageState, fromLoginPage.getPending);
//# sourceMappingURL=index.js.map