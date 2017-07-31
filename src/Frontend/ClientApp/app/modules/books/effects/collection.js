var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import * as collection from '../actions/collection';
let CollectionEffects = class CollectionEffects {
    constructor(actions$, db) {
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
        this.openDB$ = defer(() => {
            return this.db.open('books_app');
        });
        /**
         * This effect makes use of the `startWith` operator to trigger
         * the effect immediately on startup.
         */
        this.loadCollection$ = this.actions$
            .ofType(collection.LOAD)
            .startWith(new collection.LoadAction())
            .switchMap(() => this.db
            .query('books')
            .toArray()
            .map((books) => new collection.LoadSuccessAction(books))
            .catch(error => of(new collection.LoadFailAction(error))));
        this.addBookToCollection$ = this.actions$
            .ofType(collection.ADD_BOOK)
            .map((action) => action.payload)
            .mergeMap(book => this.db
            .insert('books', [book])
            .map(() => new collection.AddBookSuccessAction(book))
            .catch(() => of(new collection.AddBookFailAction(book))));
        this.removeBookFromCollection$ = this.actions$
            .ofType(collection.REMOVE_BOOK)
            .map((action) => action.payload)
            .mergeMap(book => this.db
            .executeWrite('books', 'delete', [book.id])
            .map(() => new collection.RemoveBookSuccessAction(book))
            .catch(() => of(new collection.RemoveBookFailAction(book))));
    }
};
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Observable)
], CollectionEffects.prototype, "openDB$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], CollectionEffects.prototype, "loadCollection$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], CollectionEffects.prototype, "addBookToCollection$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], CollectionEffects.prototype, "removeBookFromCollection$", void 0);
CollectionEffects = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Actions, Database])
], CollectionEffects);
export { CollectionEffects };
//# sourceMappingURL=collection.js.map