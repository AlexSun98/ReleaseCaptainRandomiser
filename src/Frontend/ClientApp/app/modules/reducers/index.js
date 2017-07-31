import { createSelector, createFeatureSelector, } from '@ngrx/store';
import { environment } from '../../environments/environment';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from '../core/reducers/layout';
/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers = {
    layout: fromLayout.reducer,
};
// console.log all actions
export function logger(reducer) {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers = !environment.production
    ? [logger]
    : [];
/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector('layout');
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
//# sourceMappingURL=index.js.map