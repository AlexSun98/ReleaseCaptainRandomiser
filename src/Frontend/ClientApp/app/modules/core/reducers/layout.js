import * as layout from '../actions/layout';
const initialState = {
    showSidenav: false,
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case layout.CLOSE_SIDENAV:
            return {
                showSidenav: false,
            };
        case layout.OPEN_SIDENAV:
            return {
                showSidenav: true,
            };
        default:
            return state;
    }
}
export const getShowSidenav = (state) => state.showSidenav;
//# sourceMappingURL=layout.js.map