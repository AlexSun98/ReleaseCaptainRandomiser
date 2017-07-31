webpackJsonp([0],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(10);
var material_1 = __webpack_require__(28);
var router_1 = __webpack_require__(9);
var store_1 = __webpack_require__(4);
var effects_1 = __webpack_require__(18);
var components_1 = __webpack_require__(137);
var book_1 = __webpack_require__(142);
var collection_1 = __webpack_require__(143);
var book_exists_1 = __webpack_require__(144);
var find_book_page_1 = __webpack_require__(139);
var view_book_page_1 = __webpack_require__(141);
var selected_book_page_1 = __webpack_require__(140);
var collection_page_1 = __webpack_require__(138);
var reducers_1 = __webpack_require__(128);
var BooksModule = (function () {
    function BooksModule() {
    }
    BooksModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MaterialModule,
                components_1.ComponentsModule,
                router_1.RouterModule.forChild([
                    { path: 'find', component: find_book_page_1.FindBookPageComponent },
                    {
                        path: ':id',
                        component: view_book_page_1.ViewBookPageComponent,
                        canActivate: [book_exists_1.BookExistsGuard],
                    },
                    { path: '', component: collection_page_1.CollectionPageComponent },
                ]),
                /**
                 * StoreModule.forFeature is used for composing state
                 * from feature modules. These modules can be loaded
                 * eagerly or lazily and will be dynamically added to
                 * the existing state.
                 */
                store_1.StoreModule.forFeature('books', reducers_1.reducers),
                /**
                 * Effects.forFeature is used to register effects
                 * from feature modules. Effects can be loaded
                 * eagerly or lazily and will be started immediately.
                 *
                 * All Effects will only be instantiated once regardless of
                 * whether they are registered once or multiple times.
                 */
                effects_1.EffectsModule.forFeature([book_1.BookEffects, collection_1.CollectionEffects]),
            ],
            declarations: [
                find_book_page_1.FindBookPageComponent,
                view_book_page_1.ViewBookPageComponent,
                selected_book_page_1.SelectedBookPageComponent,
                collection_page_1.CollectionPageComponent,
            ],
            providers: [book_exists_1.BookExistsGuard],
        })
    ], BooksModule);
    return BooksModule;
}());
exports.BooksModule = BooksModule;


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCH = '[Book] Search';
exports.SEARCH_COMPLETE = '[Book] Search Complete';
exports.LOAD = '[Book] Load';
exports.SELECT = '[Book] Select';
/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
var SearchAction = (function () {
    function SearchAction(payload) {
        this.payload = payload;
        this.type = exports.SEARCH;
    }
    return SearchAction;
}());
exports.SearchAction = SearchAction;
var SearchCompleteAction = (function () {
    function SearchCompleteAction(payload) {
        this.payload = payload;
        this.type = exports.SEARCH_COMPLETE;
    }
    return SearchCompleteAction;
}());
exports.SearchCompleteAction = SearchCompleteAction;
var LoadAction = (function () {
    function LoadAction(payload) {
        this.payload = payload;
        this.type = exports.LOAD;
    }
    return LoadAction;
}());
exports.LoadAction = LoadAction;
var SelectAction = (function () {
    function SelectAction(payload) {
        this.payload = payload;
        this.type = exports.SELECT;
    }
    return SelectAction;
}());
exports.SelectAction = SelectAction;


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __webpack_require__(4);
var fromSearch = __webpack_require__(147);
var fromBooks = __webpack_require__(145);
var fromCollection = __webpack_require__(146);
exports.reducers = {
    search: fromSearch.reducer,
    books: fromBooks.reducer,
    collection: fromCollection.reducer,
};
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
exports.getBooksState = store_1.createFeatureSelector('books');
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
exports.getBookEntitiesState = store_1.createSelector(exports.getBooksState, function (state) { return state.books; });
exports.getBookEntities = store_1.createSelector(exports.getBookEntitiesState, fromBooks.getEntities);
exports.getBookIds = store_1.createSelector(exports.getBookEntitiesState, fromBooks.getIds);
exports.getSelectedBookId = store_1.createSelector(exports.getBookEntitiesState, fromBooks.getSelectedId);
exports.getSelectedBook = store_1.createSelector(exports.getBookEntitiesState, fromBooks.getSelected);
/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
exports.getSearchState = store_1.createSelector(exports.getBooksState, function (state) { return state.search; });
exports.getSearchBookIds = store_1.createSelector(exports.getSearchState, fromSearch.getIds);
exports.getSearchQuery = store_1.createSelector(exports.getSearchState, fromSearch.getQuery);
exports.getSearchLoading = store_1.createSelector(exports.getSearchState, fromSearch.getLoading);
/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
exports.getSearchResults = store_1.createSelector(exports.getBookEntities, exports.getSearchBookIds, function (books, searchIds) {
    return searchIds.map(function (id) { return books[id]; });
});
exports.getCollectionState = store_1.createSelector(exports.getBooksState, function (state) { return state.collection; });
exports.getCollectionLoaded = store_1.createSelector(exports.getCollectionState, fromCollection.getLoaded);
exports.getCollectionLoading = store_1.createSelector(exports.getCollectionState, fromCollection.getLoading);
exports.getCollectionBookIds = store_1.createSelector(exports.getCollectionState, fromCollection.getIds);
exports.getBookCollection = store_1.createSelector(exports.getBookEntities, exports.getCollectionBookIds, function (entities, ids) {
    return ids.map(function (id) { return entities[id]; });
});
exports.isSelectedBookInCollection = store_1.createSelector(exports.getCollectionBookIds, exports.getSelectedBookId, function (ids, selected) {
    return ids.indexOf(selected) > -1;
});


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_BOOK = '[Collection] Add Book';
exports.ADD_BOOK_SUCCESS = '[Collection] Add Book Success';
exports.ADD_BOOK_FAIL = '[Collection] Add Book Fail';
exports.REMOVE_BOOK = '[Collection] Remove Book';
exports.REMOVE_BOOK_SUCCESS = '[Collection] Remove Book Success';
exports.REMOVE_BOOK_FAIL = '[Collection] Remove Book Fail';
exports.LOAD = '[Collection] Load';
exports.LOAD_SUCCESS = '[Collection] Load Success';
exports.LOAD_FAIL = '[Collection] Load Fail';
/**
 * Add Book to Collection Actions
 */
var AddBookAction = (function () {
    function AddBookAction(payload) {
        this.payload = payload;
        this.type = exports.ADD_BOOK;
    }
    return AddBookAction;
}());
exports.AddBookAction = AddBookAction;
var AddBookSuccessAction = (function () {
    function AddBookSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.ADD_BOOK_SUCCESS;
    }
    return AddBookSuccessAction;
}());
exports.AddBookSuccessAction = AddBookSuccessAction;
var AddBookFailAction = (function () {
    function AddBookFailAction(payload) {
        this.payload = payload;
        this.type = exports.ADD_BOOK_FAIL;
    }
    return AddBookFailAction;
}());
exports.AddBookFailAction = AddBookFailAction;
/**
 * Remove Book from Collection Actions
 */
var RemoveBookAction = (function () {
    function RemoveBookAction(payload) {
        this.payload = payload;
        this.type = exports.REMOVE_BOOK;
    }
    return RemoveBookAction;
}());
exports.RemoveBookAction = RemoveBookAction;
var RemoveBookSuccessAction = (function () {
    function RemoveBookSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.REMOVE_BOOK_SUCCESS;
    }
    return RemoveBookSuccessAction;
}());
exports.RemoveBookSuccessAction = RemoveBookSuccessAction;
var RemoveBookFailAction = (function () {
    function RemoveBookFailAction(payload) {
        this.payload = payload;
        this.type = exports.REMOVE_BOOK_FAIL;
    }
    return RemoveBookFailAction;
}());
exports.RemoveBookFailAction = RemoveBookFailAction;
/**
 * Load Collection Actions
 */
var LoadAction = (function () {
    function LoadAction() {
        this.type = exports.LOAD;
    }
    return LoadAction;
}());
exports.LoadAction = LoadAction;
var LoadSuccessAction = (function () {
    function LoadSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.LOAD_SUCCESS;
    }
    return LoadSuccessAction;
}());
exports.LoadSuccessAction = LoadSuccessAction;
var LoadFailAction = (function () {
    function LoadFailAction(payload) {
        this.payload = payload;
        this.type = exports.LOAD_FAIL;
    }
    return LoadFailAction;
}());
exports.LoadFailAction = LoadFailAction;


/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var switchMap_1 = __webpack_require__(30);
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var debounceTime_1 = __webpack_require__(68);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var BookAuthorsComponent = (function () {
    function BookAuthorsComponent() {
    }
    Object.defineProperty(BookAuthorsComponent.prototype, "authors", {
        get: function () {
            return this.book.volumeInfo.authors;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BookAuthorsComponent.prototype, "book", void 0);
    BookAuthorsComponent = __decorate([
        core_1.Component({
            selector: 'bc-book-authors',
            template: "\n    <h5 md-subheader>Written By:</h5>\n    <span>\n      {{ authors | bcAddCommas }}\n    </span>\n  ",
            styles: [
                "\n    h5 {\n      margin-bottom: 5px;\n    }\n  ",
            ],
        })
    ], BookAuthorsComponent);
    return BookAuthorsComponent;
}());
exports.BookAuthorsComponent = BookAuthorsComponent;


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var BookDetailComponent = (function () {
    function BookDetailComponent() {
        this.add = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
    }
    Object.defineProperty(BookDetailComponent.prototype, "id", {
        /**
         * Tip: Utilize getters to keep templates clean
         */
        get: function () {
            return this.book.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookDetailComponent.prototype, "title", {
        get: function () {
            return this.book.volumeInfo.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookDetailComponent.prototype, "subtitle", {
        get: function () {
            return this.book.volumeInfo.subtitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookDetailComponent.prototype, "description", {
        get: function () {
            return this.book.volumeInfo.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookDetailComponent.prototype, "thumbnail", {
        get: function () {
            return (this.book.volumeInfo.imageLinks &&
                this.book.volumeInfo.imageLinks.smallThumbnail);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BookDetailComponent.prototype, "book", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BookDetailComponent.prototype, "inCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BookDetailComponent.prototype, "add", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BookDetailComponent.prototype, "remove", void 0);
    BookDetailComponent = __decorate([
        core_1.Component({
            selector: 'bc-book-detail',
            template: "\n    <md-card *ngIf=\"book\">\n      <md-card-title-group>\n        <md-card-title>{{ title }}</md-card-title>\n        <md-card-subtitle *ngIf=\"subtitle\">{{ subtitle }}</md-card-subtitle>\n        <img md-card-sm-image *ngIf=\"thumbnail\" [src]=\"thumbnail\"/>\n      </md-card-title-group>\n      <md-card-content>\n        <p [innerHtml]=\"description\"></p>\n      </md-card-content>\n      <md-card-footer class=\"footer\">\n        <bc-book-authors [book]=\"book\"></bc-book-authors>\n      </md-card-footer>\n      <md-card-actions align=\"start\">\n        <button md-raised-button color=\"warn\" *ngIf=\"inCollection\" (click)=\"remove.emit(book)\">\n        Remove Book from Collection\n        </button>\n\n        <button md-raised-button color=\"primary\" *ngIf=\"!inCollection\" (click)=\"add.emit(book)\">\n        Add Book to Collection\n        </button>\n      </md-card-actions>\n    </md-card>\n\n  ",
            styles: [
                "\n    :host {\n      display: flex;\n      justify-content: center;\n      margin: 75px 0;\n    }\n    md-card {\n      max-width: 600px;\n    }\n    md-card-title-group {\n      margin-left: 0;\n    }\n    img {\n      width: 60px;\n      min-width: 60px;\n      margin-left: 5px;\n    }\n    md-card-content {\n      margin: 15px 0 50px;\n    }\n    md-card-actions {\n      margin: 25px 0 0 !important;\n    }\n    md-card-footer {\n      padding: 0 25px 25px;\n      position: relative;\n    }\n  ",
            ],
        })
    ], BookDetailComponent);
    return BookDetailComponent;
}());
exports.BookDetailComponent = BookDetailComponent;


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var BookPreviewListComponent = (function () {
    function BookPreviewListComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BookPreviewListComponent.prototype, "books", void 0);
    BookPreviewListComponent = __decorate([
        core_1.Component({
            selector: 'bc-book-preview-list',
            template: "\n    <bc-book-preview *ngFor=\"let book of books\" [book]=\"book\"></bc-book-preview>\n  ",
            styles: [
                "\n    :host {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center;\n    }\n  ",
            ],
        })
    ], BookPreviewListComponent);
    return BookPreviewListComponent;
}());
exports.BookPreviewListComponent = BookPreviewListComponent;


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var BookPreviewComponent = (function () {
    function BookPreviewComponent() {
    }
    Object.defineProperty(BookPreviewComponent.prototype, "id", {
        get: function () {
            return this.book.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookPreviewComponent.prototype, "title", {
        get: function () {
            return this.book.volumeInfo.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookPreviewComponent.prototype, "subtitle", {
        get: function () {
            return this.book.volumeInfo.subtitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookPreviewComponent.prototype, "description", {
        get: function () {
            return this.book.volumeInfo.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookPreviewComponent.prototype, "thumbnail", {
        get: function () {
            if (this.book.volumeInfo.imageLinks) {
                return this.book.volumeInfo.imageLinks.smallThumbnail;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BookPreviewComponent.prototype, "book", void 0);
    BookPreviewComponent = __decorate([
        core_1.Component({
            selector: 'bc-book-preview',
            template: "\n    <a [routerLink]=\"['/books', id]\">\n      <md-card>\n        <md-card-title-group>\n          <img md-card-sm-image *ngIf=\"thumbnail\" [src]=\"thumbnail\"/>\n          <md-card-title>{{ title | bcEllipsis:35 }}</md-card-title>\n          <md-card-subtitle *ngIf=\"subtitle\">{{ subtitle | bcEllipsis:40 }}</md-card-subtitle>\n        </md-card-title-group>\n        <md-card-content>\n          <p *ngIf=\"description\">{{ description | bcEllipsis }}</p>\n        </md-card-content>\n        <md-card-footer>\n          <bc-book-authors [book]=\"book\"></bc-book-authors>\n        </md-card-footer>\n      </md-card>\n    </a>\n  ",
            styles: [
                "\n    md-card {\n      width: 400px;\n      height: 300px;\n      margin: 15px;\n    }\n    @media only screen and (max-width: 768px) {\n      md-card {\n        margin: 15px 0 !important;\n      }\n    }\n    md-card:hover {\n      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);\n    }\n    md-card-title {\n      margin-right: 10px;\n    }\n    md-card-title-group {\n      margin: 0;\n    }\n    a {\n      color: inherit;\n      text-decoration: none;\n    }\n    img {\n      width: 60px;\n      min-width: 60px;\n      margin-left: 5px;\n    }\n    md-card-content {\n      margin-top: 15px;\n      margin: 15px 0 0;\n    }\n    span {\n      display: inline-block;\n      font-size: 13px;\n    }\n    md-card-footer {\n      padding: 0 25px 25px;\n    }\n  ",
            ],
        })
    ], BookPreviewComponent);
    return BookPreviewComponent;
}());
exports.BookPreviewComponent = BookPreviewComponent;


/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(131);
__webpack_require__(17);
__webpack_require__(151);
var core_1 = __webpack_require__(1);
var BookSearchComponent = (function () {
    function BookSearchComponent() {
        this.query = '';
        this.searching = false;
        this.search = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BookSearchComponent.prototype, "query", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BookSearchComponent.prototype, "searching", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BookSearchComponent.prototype, "search", void 0);
    BookSearchComponent = __decorate([
        core_1.Component({
            selector: 'bc-book-search',
            template: "\n    <md-card>\n      <md-card-title>Find a Book</md-card-title>\n      <md-card-content>\n        <md-input-container>\n          <input mdInput placeholder=\"Search for a book\" [value]=\"query\" (keyup)=\"search.emit($event.target.value)\">\n        </md-input-container>\n        <md-spinner [class.show]=\"searching\"></md-spinner>\n      </md-card-content>\n    </md-card>\n  ",
            styles: [
                "\n    md-card-title,\n    md-card-content {\n      display: flex;\n      justify-content: center;\n    }\n\n    input {\n      width: 300px;\n    }\n\n    md-card-spinner {\n      padding-left: 60px; // Make room for the spinner\n    }\n\n    md-spinner {\n      width: 30px;\n      height: 30px;\n      position: relative;\n      top: 10px;\n      left: 10px;\n      opacity: 0.0;\n    }\n\n    md-spinner.show {\n      opacity: 1.0;\n    }\n  ",
            ],
        })
    ], BookSearchComponent);
    return BookSearchComponent;
}());
exports.BookSearchComponent = BookSearchComponent;


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(10);
var material_1 = __webpack_require__(28);
var forms_1 = __webpack_require__(19);
var router_1 = __webpack_require__(9);
var book_authors_1 = __webpack_require__(132);
var book_detail_1 = __webpack_require__(133);
var book_preview_1 = __webpack_require__(135);
var book_preview_list_1 = __webpack_require__(134);
var book_search_1 = __webpack_require__(136);
var pipes_1 = __webpack_require__(150);
exports.COMPONENTS = [
    book_authors_1.BookAuthorsComponent,
    book_detail_1.BookDetailComponent,
    book_preview_1.BookPreviewComponent,
    book_preview_list_1.BookPreviewListComponent,
    book_search_1.BookSearchComponent,
];
var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                material_1.MaterialModule,
                router_1.RouterModule,
                pipes_1.PipesModule,
            ],
            declarations: exports.COMPONENTS,
            exports: exports.COMPONENTS,
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(63);
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(4);
var fromBooks = __webpack_require__(128);
var CollectionPageComponent = (function () {
    function CollectionPageComponent(store) {
        this.books$ = store.select(fromBooks.getBookCollection);
    }
    CollectionPageComponent = __decorate([
        core_1.Component({
            selector: 'bc-collection-page',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <md-card>\n      <md-card-title>My Collection</md-card-title>\n    </md-card>\n\n    <bc-book-preview-list [books]=\"books$ | async\"></bc-book-preview-list>\n  ",
            /**
             * Container components are permitted to have just enough styles
             * to bring the view together. If the number of styles grow,
             * consider breaking them out into presentational
             * components.
             */
            styles: [
                "\n    md-card-title {\n      display: flex;\n      justify-content: center;\n    }\n  ",
            ],
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], CollectionPageComponent);
    return CollectionPageComponent;
}());
exports.CollectionPageComponent = CollectionPageComponent;


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(29);
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(4);
var fromBooks = __webpack_require__(128);
var book = __webpack_require__(127);
var FindBookPageComponent = (function () {
    function FindBookPageComponent(store) {
        this.store = store;
        this.searchQuery$ = store.select(fromBooks.getSearchQuery).take(1);
        this.books$ = store.select(fromBooks.getSearchResults);
        this.loading$ = store.select(fromBooks.getSearchLoading);
    }
    FindBookPageComponent.prototype.search = function (query) {
        this.store.dispatch(new book.SearchAction(query));
    };
    FindBookPageComponent = __decorate([
        core_1.Component({
            selector: 'bc-find-book-page',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <bc-book-search [query]=\"searchQuery$ | async\" [searching]=\"loading$ | async\" (search)=\"search($event)\"></bc-book-search>\n    <bc-book-preview-list [books]=\"books$ | async\"></bc-book-preview-list>\n  ",
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], FindBookPageComponent);
    return FindBookPageComponent;
}());
exports.FindBookPageComponent = FindBookPageComponent;


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(4);
var fromBooks = __webpack_require__(128);
var collection = __webpack_require__(129);
var SelectedBookPageComponent = (function () {
    function SelectedBookPageComponent(store) {
        this.store = store;
        this.book$ = store.select(fromBooks.getSelectedBook);
        this.isSelectedBookInCollection$ = store.select(fromBooks.isSelectedBookInCollection);
    }
    SelectedBookPageComponent.prototype.addToCollection = function (book) {
        this.store.dispatch(new collection.AddBookAction(book));
    };
    SelectedBookPageComponent.prototype.removeFromCollection = function (book) {
        this.store.dispatch(new collection.RemoveBookAction(book));
    };
    SelectedBookPageComponent = __decorate([
        core_1.Component({
            selector: 'bc-selected-book-page',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <bc-book-detail\n      [book]=\"book$ | async\"\n      [inCollection]=\"isSelectedBookInCollection$ | async\"\n      (add)=\"addToCollection($event)\"\n      (remove)=\"removeFromCollection($event)\">\n    </bc-book-detail>\n  ",
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], SelectedBookPageComponent);
    return SelectedBookPageComponent;
}());
exports.SelectedBookPageComponent = SelectedBookPageComponent;


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(17);
__webpack_require__(153);
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(9);
var store_1 = __webpack_require__(4);
var book = __webpack_require__(127);
/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
var ViewBookPageComponent = (function () {
    function ViewBookPageComponent(store, route) {
        this.actionsSubscription = route.params
            .map(function (params) { return new book.SelectAction(params.id); })
            .subscribe(store);
    }
    ViewBookPageComponent.prototype.ngOnDestroy = function () {
        this.actionsSubscription.unsubscribe();
    };
    ViewBookPageComponent = __decorate([
        core_1.Component({
            selector: 'bc-view-book-page',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <bc-selected-book-page></bc-selected-book-page>\n  ",
        }),
        __metadata("design:paramtypes", [store_1.Store, router_1.ActivatedRoute])
    ], ViewBookPageComponent);
    return ViewBookPageComponent;
}());
exports.ViewBookPageComponent = ViewBookPageComponent;


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(61);
__webpack_require__(17);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(154);
__webpack_require__(156);
var core_1 = __webpack_require__(1);
var effects_1 = __webpack_require__(18);
var Observable_1 = __webpack_require__(2);
var Scheduler_1 = __webpack_require__(65);
var async_1 = __webpack_require__(32);
var empty_1 = __webpack_require__(67);
var of_1 = __webpack_require__(11);
var google_books_1 = __webpack_require__(62);
var book = __webpack_require__(127);
exports.SEARCH_DEBOUNCE = new core_1.InjectionToken('Search Debounce');
exports.SEARCH_SCHEDULER = new core_1.InjectionToken('Search Scheduler');
/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/platform/blob/master/docs/effects/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */
var BookEffects = (function () {
    function BookEffects(actions$, googleBooks, debounce, 
        /**
           * You inject an optional Scheduler that will be undefined
           * in normal application usage, but its injected here so that you can mock out
           * during testing using the RxJS TestScheduler for simulating passages of time.
           */
        scheduler) {
        if (debounce === void 0) { debounce = 300; }
        var _this = this;
        this.actions$ = actions$;
        this.googleBooks = googleBooks;
        this.debounce = debounce;
        this.scheduler = scheduler;
        this.search$ = this.actions$
            .ofType(book.SEARCH)
            .debounceTime(this.debounce, this.scheduler || async_1.async)
            .map(effects_1.toPayload)
            .switchMap(function (query) {
            if (query === '') {
                return empty_1.empty();
            }
            var nextSearch$ = _this.actions$.ofType(book.SEARCH).skip(1);
            return _this.googleBooks
                .searchBooks(query)
                .takeUntil(nextSearch$)
                .map(function (books) { return new book.SearchCompleteAction(books); })
                .catch(function () { return of_1.of(new book.SearchCompleteAction([])); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], BookEffects.prototype, "search$", void 0);
    BookEffects = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(exports.SEARCH_DEBOUNCE)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(exports.SEARCH_SCHEDULER)),
        __metadata("design:paramtypes", [effects_1.Actions,
            google_books_1.GoogleBooksService, Number, Scheduler_1.Scheduler])
    ], BookEffects);
    return BookEffects;
}());
exports.BookEffects = BookEffects;


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(17);
__webpack_require__(61);
__webpack_require__(155);
__webpack_require__(130);
__webpack_require__(152);
__webpack_require__(157);
var core_1 = __webpack_require__(1);
var effects_1 = __webpack_require__(18);
var db_1 = __webpack_require__(64);
var Observable_1 = __webpack_require__(2);
var defer_1 = __webpack_require__(159);
var of_1 = __webpack_require__(11);
var collection = __webpack_require__(129);
var CollectionEffects = (function () {
    function CollectionEffects(actions$, db) {
        var _this = this;
        this.actions$ = actions$;
        this.db = db;
        /**
         * This effect does not yield any actions back to the store. Set
         * `dispatch` to false to hint to @ngrx/effects that it should
         * ignore any elements of this effect stream.
         *
         * The `defer` observable accepts an observable factory function
         * that is called when the observable is subscribed to.
         * Wrapping the database open call in `defer` makes
         * effect easier to test.
         */
        this.openDB$ = defer_1.defer(function () {
            return _this.db.open('books_app');
        });
        /**
         * This effect makes use of the `startWith` operator to trigger
         * the effect immediately on startup.
         */
        this.loadCollection$ = this.actions$
            .ofType(collection.LOAD)
            .startWith(new collection.LoadAction())
            .switchMap(function () {
            return _this.db
                .query('books')
                .toArray()
                .map(function (books) { return new collection.LoadSuccessAction(books); })
                .catch(function (error) { return of_1.of(new collection.LoadFailAction(error)); });
        });
        this.addBookToCollection$ = this.actions$
            .ofType(collection.ADD_BOOK)
            .map(function (action) { return action.payload; })
            .mergeMap(function (book) {
            return _this.db
                .insert('books', [book])
                .map(function () { return new collection.AddBookSuccessAction(book); })
                .catch(function () { return of_1.of(new collection.AddBookFailAction(book)); });
        });
        this.removeBookFromCollection$ = this.actions$
            .ofType(collection.REMOVE_BOOK)
            .map(function (action) { return action.payload; })
            .mergeMap(function (book) {
            return _this.db
                .executeWrite('books', 'delete', [book.id])
                .map(function () { return new collection.RemoveBookSuccessAction(book); })
                .catch(function () { return of_1.of(new collection.RemoveBookFailAction(book)); });
        });
    }
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], CollectionEffects.prototype, "openDB$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CollectionEffects.prototype, "loadCollection$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CollectionEffects.prototype, "addBookToCollection$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CollectionEffects.prototype, "removeBookFromCollection$", void 0);
    CollectionEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, db_1.Database])
    ], CollectionEffects);
    return CollectionEffects;
}());
exports.CollectionEffects = CollectionEffects;


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(29);
__webpack_require__(161);
__webpack_require__(66);
__webpack_require__(17);
__webpack_require__(130);
__webpack_require__(61);
__webpack_require__(63);
var core_1 = __webpack_require__(1);
var store_1 = __webpack_require__(4);
var router_1 = __webpack_require__(9);
var of_1 = __webpack_require__(11);
var google_books_1 = __webpack_require__(62);
var fromBooks = __webpack_require__(128);
var book = __webpack_require__(127);
/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
var BookExistsGuard = (function () {
    function BookExistsGuard(store, googleBooks, router) {
        this.store = store;
        this.googleBooks = googleBooks;
        this.router = router;
    }
    /**
     * This method creates an observable that waits for the `loaded` property
     * of the collection state to turn `true`, emitting one time once loading
     * has finished.
     */
    BookExistsGuard.prototype.waitForCollectionToLoad = function () {
        return this.store
            .select(fromBooks.getCollectionLoaded)
            .filter(function (loaded) { return loaded; })
            .take(1);
    };
    /**
     * This method checks if a book with the given ID is already registered
     * in the Store
     */
    BookExistsGuard.prototype.hasBookInStore = function (id) {
        return this.store
            .select(fromBooks.getBookEntities)
            .map(function (entities) { return !!entities[id]; })
            .take(1);
    };
    /**
     * This method loads a book with the given ID from the API and caches
     * it in the store, returning `true` or `false` if it was found.
     */
    BookExistsGuard.prototype.hasBookInApi = function (id) {
        var _this = this;
        return this.googleBooks
            .retrieveBook(id)
            .map(function (bookEntity) { return new book.LoadAction(bookEntity); })
            .do(function (action) { return _this.store.dispatch(action); })
            .map(function (book) { return !!book; })
            .catch(function () {
            _this.router.navigate(['/404']);
            return of_1.of(false);
        });
    };
    /**
     * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
     * if the book is in store, and if not it then checks if it is in the
     * API.
     */
    BookExistsGuard.prototype.hasBook = function (id) {
        var _this = this;
        return this.hasBookInStore(id).switchMap(function (inStore) {
            if (inStore) {
                return of_1.of(inStore);
            }
            return _this.hasBookInApi(id);
        });
    };
    /**
     * This is the actual method the router will call when our guard is run.
     *
     * Our guard waits for the collection to load, then it checks if we need
     * to request a book from the API or if we already have it in our cache.
     * If it finds it in the cache or in the API, it returns an Observable
     * of `true` and the route is rendered successfully.
     *
     * If it was unable to find it in our cache or in the API, this guard
     * will return an Observable of `false`, causing the router to move
     * on to the next candidate route. In this case, it will move on
     * to the 404 page.
     */
    BookExistsGuard.prototype.canActivate = function (route) {
        var _this = this;
        return this.waitForCollectionToLoad().switchMap(function () {
            return _this.hasBook(route.params['id']);
        });
    };
    BookExistsGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store,
            google_books_1.GoogleBooksService,
            router_1.Router])
    ], BookExistsGuard);
    return BookExistsGuard;
}());
exports.BookExistsGuard = BookExistsGuard;


/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __webpack_require__(4);
var book = __webpack_require__(127);
var collection = __webpack_require__(129);
exports.initialState = {
    ids: [],
    entities: {},
    selectedBookId: null,
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case book.SEARCH_COMPLETE:
        case collection.LOAD_SUCCESS: {
            var books = action.payload;
            var newBooks = books.filter(function (book) { return !state.entities[book.id]; });
            var newBookIds = newBooks.map(function (book) { return book.id; });
            var newBookEntities = newBooks.reduce(function (entities, book) {
                return Object.assign(entities, (_a = {},
                    _a[book.id] = book,
                    _a));
                var _a;
            }, {});
            return {
                ids: state.ids.concat(newBookIds),
                entities: Object.assign({}, state.entities, newBookEntities),
                selectedBookId: state.selectedBookId,
            };
        }
        case book.LOAD: {
            var book_1 = action.payload;
            if (state.ids.indexOf(book_1.id) > -1) {
                return state;
            }
            return {
                ids: state.ids.concat([book_1.id]),
                entities: Object.assign({}, state.entities, (_a = {},
                    _a[book_1.id] = book_1,
                    _a)),
                selectedBookId: state.selectedBookId,
            };
        }
        case book.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedBookId: action.payload,
            };
        }
        default: {
            return state;
        }
    }
    var _a;
}
exports.reducer = reducer;
/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
exports.getEntities = function (state) { return state.entities; };
exports.getIds = function (state) { return state.ids; };
exports.getSelectedId = function (state) { return state.selectedBookId; };
exports.getSelected = store_1.createSelector(exports.getEntities, exports.getSelectedId, function (entities, selectedId) {
    return entities[selectedId];
});
exports.getAll = store_1.createSelector(exports.getEntities, exports.getIds, function (entities, ids) {
    return ids.map(function (id) { return entities[id]; });
});


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var collection = __webpack_require__(129);
var initialState = {
    loaded: false,
    loading: false,
    ids: [],
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case collection.LOAD: {
            return Object.assign({}, state, {
                loading: true,
            });
        }
        case collection.LOAD_SUCCESS: {
            var books = action.payload;
            return {
                loaded: true,
                loading: false,
                ids: books.map(function (book) { return book.id; }),
            };
        }
        case collection.ADD_BOOK_SUCCESS:
        case collection.REMOVE_BOOK_FAIL: {
            var book = action.payload;
            if (state.ids.indexOf(book.id) > -1) {
                return state;
            }
            return Object.assign({}, state, {
                ids: state.ids.concat([book.id]),
            });
        }
        case collection.REMOVE_BOOK_SUCCESS:
        case collection.ADD_BOOK_FAIL: {
            var book_1 = action.payload;
            return Object.assign({}, state, {
                ids: state.ids.filter(function (id) { return id !== book_1.id; }),
            });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getLoaded = function (state) { return state.loaded; };
exports.getLoading = function (state) { return state.loading; };
exports.getIds = function (state) { return state.ids; };


/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var book = __webpack_require__(127);
var initialState = {
    ids: [],
    loading: false,
    query: '',
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case book.SEARCH: {
            var query = action.payload;
            if (query === '') {
                return {
                    ids: [],
                    loading: false,
                    query: query,
                };
            }
            return Object.assign({}, state, {
                query: query,
                loading: true,
            });
        }
        case book.SEARCH_COMPLETE: {
            var books = action.payload;
            return {
                ids: books.map(function (book) { return book.id; }),
                loading: false,
                query: state.query,
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getIds = function (state) { return state.ids; };
exports.getQuery = function (state) { return state.query; };
exports.getLoading = function (state) { return state.loading; };


/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var AddCommasPipe = (function () {
    function AddCommasPipe() {
    }
    AddCommasPipe.prototype.transform = function (authors) {
        if (!authors) {
            return 'Author Unknown';
        }
        switch (authors.length) {
            case 0:
                return 'Author Unknown';
            case 1:
                return authors[0];
            case 2:
                return authors.join(' and ');
            default:
                var last = authors[authors.length - 1];
                var remaining = authors.slice(0, -1);
                return remaining.join(', ') + ", and " + last;
        }
    };
    AddCommasPipe = __decorate([
        core_1.Pipe({ name: 'bcAddCommas' })
    ], AddCommasPipe);
    return AddCommasPipe;
}());
exports.AddCommasPipe = AddCommasPipe;


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var EllipsisPipe = (function () {
    function EllipsisPipe() {
    }
    EllipsisPipe.prototype.transform = function (str, strLength) {
        if (strLength === void 0) { strLength = 250; }
        var withoutHtml = str.replace(/(<([^>]+)>)/gi, '');
        if (str.length >= strLength) {
            return withoutHtml.slice(0, strLength) + "...";
        }
        return withoutHtml;
    };
    EllipsisPipe = __decorate([
        core_1.Pipe({ name: 'bcEllipsis' })
    ], EllipsisPipe);
    return EllipsisPipe;
}());
exports.EllipsisPipe = EllipsisPipe;


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var add_commas_1 = __webpack_require__(148);
var ellipsis_1 = __webpack_require__(149);
exports.PIPES = [add_commas_1.AddCommasPipe, ellipsis_1.EllipsisPipe];
var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        core_1.NgModule({
            declarations: exports.PIPES,
            exports: exports.PIPES,
        })
    ], PipesModule);
    return PipesModule;
}());
exports.PipesModule = PipesModule;


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var distinctUntilChanged_1 = __webpack_require__(69);
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var mergeMap_1 = __webpack_require__(33);
Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var pluck_1 = __webpack_require__(70);
Observable_1.Observable.prototype.pluck = pluck_1.pluck;
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var skip_1 = __webpack_require__(71);
Observable_1.Observable.prototype.skip = skip_1.skip;
//# sourceMappingURL=skip.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var startWith_1 = __webpack_require__(72);
Observable_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var takeUntil_1 = __webpack_require__(31);
Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(2);
var toArray_1 = __webpack_require__(160);
Observable_1.Observable.prototype.toArray = toArray_1.toArray;
//# sourceMappingURL=toArray.js.map

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(2);
var subscribeToResult_1 = __webpack_require__(13);
var OuterSubscriber_1 = __webpack_require__(12);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {@link create}
     *
     * @param {function(): SubscribableOrPromise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=DeferObservable.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DeferObservable_1 = __webpack_require__(158);
exports.defer = DeferObservable_1.DeferObservable.create;
//# sourceMappingURL=defer.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
 * @method toArray
 * @owner Observable
 */
function toArray() {
    return this.lift(new ToArrayOperator());
}
exports.toArray = toArray;
var ToArrayOperator = (function () {
    function ToArrayOperator() {
    }
    ToArrayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ToArraySubscriber(subscriber));
    };
    return ToArrayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ToArraySubscriber = (function (_super) {
    __extends(ToArraySubscriber, _super);
    function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
    }
    ToArraySubscriber.prototype._next = function (x) {
        this.array.push(x);
    };
    ToArraySubscriber.prototype._complete = function () {
        this.destination.next(this.array);
        this.destination.complete();
    };
    return ToArraySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=toArray.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(290);

/***/ })

});
//# sourceMappingURL=0.js.map