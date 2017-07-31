export const ADD_BOOK = '[Collection] Add Book';
export const ADD_BOOK_SUCCESS = '[Collection] Add Book Success';
export const ADD_BOOK_FAIL = '[Collection] Add Book Fail';
export const REMOVE_BOOK = '[Collection] Remove Book';
export const REMOVE_BOOK_SUCCESS = '[Collection] Remove Book Success';
export const REMOVE_BOOK_FAIL = '[Collection] Remove Book Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';
/**
 * Add Book to Collection Actions
 */
export class AddBookAction {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_BOOK;
    }
}
export class AddBookSuccessAction {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_BOOK_SUCCESS;
    }
}
export class AddBookFailAction {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_BOOK_FAIL;
    }
}
/**
 * Remove Book from Collection Actions
 */
export class RemoveBookAction {
    constructor(payload) {
        this.payload = payload;
        this.type = REMOVE_BOOK;
    }
}
export class RemoveBookSuccessAction {
    constructor(payload) {
        this.payload = payload;
        this.type = REMOVE_BOOK_SUCCESS;
    }
}
export class RemoveBookFailAction {
    constructor(payload) {
        this.payload = payload;
        this.type = REMOVE_BOOK_FAIL;
    }
}
/**
 * Load Collection Actions
 */
export class LoadAction {
    constructor() {
        this.type = LOAD;
    }
}
export class LoadSuccessAction {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_SUCCESS;
    }
}
export class LoadFailAction {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_FAIL;
    }
}
//# sourceMappingURL=collection.js.map