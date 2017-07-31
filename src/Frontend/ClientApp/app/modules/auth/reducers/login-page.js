import * as auth from '../actions/auth';
export const initialState = {
    error: null,
    pending: false,
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case auth.LOGIN: {
            return Object.assign({}, state, { error: null, pending: true });
        }
        case auth.LOGIN_SUCCESS: {
            return Object.assign({}, state, { error: null, pending: false });
        }
        case auth.LOGIN_FAILURE: {
            return Object.assign({}, state, { error: action.payload, pending: false });
        }
        default: {
            return state;
        }
    }
}
export const getError = (state) => state.error;
export const getPending = (state) => state.pending;
//# sourceMappingURL=login-page.js.map