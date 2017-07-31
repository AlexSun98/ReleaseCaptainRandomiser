/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema = {
    version: 1,
    name: 'books_app',
    stores: {
        books: {
            autoIncrement: true,
            primaryKey: 'id',
        },
    },
};
//# sourceMappingURL=db.js.map