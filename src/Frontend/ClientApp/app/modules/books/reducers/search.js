import * as book from '../actions/book';
const initialState = {
    ids: [],
    loading: false,
    query: '',
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case book.SEARCH: {
            const query = action.payload;
            if (query === '') {
                return {
                    ids: [],
                    loading: false,
                    query,
                };
            }
            return Object.assign({}, state, {
                query,
                loading: true,
            });
        }
        case book.SEARCH_COMPLETE: {
            const books = action.payload;
            return {
                ids: books.map(book => book.id),
                loading: false,
                query: state.query,
            };
        }
        default: {
            return state;
        }
    }
}
export const getIds = (state) => state.ids;
export const getQuery = (state) => state.query;
export const getLoading = (state) => state.loading;
//# sourceMappingURL=search.js.map