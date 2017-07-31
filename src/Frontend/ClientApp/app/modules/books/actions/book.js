export const SEARCH = '[Book] Search';
export const SEARCH_COMPLETE = '[Book] Search Complete';
export const LOAD = '[Book] Load';
export const SELECT = '[Book] Select';
/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction {
    constructor(payload) {
        this.payload = payload;
        this.type = SEARCH;
    }
}
export class SearchCompleteAction {
    constructor(payload) {
        this.payload = payload;
        this.type = SEARCH_COMPLETE;
    }
}
export class LoadAction {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD;
    }
}
export class SelectAction {
    constructor(payload) {
        this.payload = payload;
        this.type = SELECT;
    }
}
//# sourceMappingURL=book.js.map