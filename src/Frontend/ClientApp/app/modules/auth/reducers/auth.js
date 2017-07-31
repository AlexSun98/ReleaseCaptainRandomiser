import * as auth from '../actions/auth';
export const initialState = {
    loggedIn: false,
    user: null,
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case auth.LOGIN_SUCCESS: {
            return Object.assign({}, state, { loggedIn: true, user: action.payload.user });
        }
        case auth.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export const getLoggedIn = (state) => state.loggedIn;
export const getUser = (state) => state.user;
//# sourceMappingURL=auth.js.map