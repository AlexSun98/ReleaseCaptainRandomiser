var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { GoogleBooksService } from '../../core/services/google-books';
import * as fromBooks from '../reducers';
import * as book from '../actions/book';
/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
let BookExistsGuard = class BookExistsGuard {
    constructor(store, googleBooks, router) {
        this.store = store;
        this.googleBooks = googleBooks;
        this.router = router;
    }
    /**
     * This method creates an observable that waits for the `loaded` property
     * of the collection state to turn `true`, emitting one time once loading
     * has finished.
     */
    waitForCollectionToLoad() {
        return this.store
            .select(fromBooks.getCollectionLoaded)
            .filter(loaded => loaded)
            .take(1);
    }
    /**
     * This method checks if a book with the given ID is already registered
     * in the Store
     */
    hasBookInStore(id) {
        return this.store
            .select(fromBooks.getBookEntities)
            .map(entities => !!entities[id])
            .take(1);
    }
    /**
     * This method loads a book with the given ID from the API and caches
     * it in the store, returning `true` or `false` if it was found.
     */
    hasBookInApi(id) {
        return this.googleBooks
            .retrieveBook(id)
            .map(bookEntity => new book.LoadAction(bookEntity))
            .do((action) => this.store.dispatch(action))
            .map(book => !!book)
            .catch(() => {
            this.router.navigate(['/404']);
            return of(false);
        });
    }
    /**
     * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
     * if the book is in store, and if not it then checks if it is in the
     * API.
     */
    hasBook(id) {
        return this.hasBookInStore(id).switchMap(inStore => {
            if (inStore) {
                return of(inStore);
            }
            return this.hasBookInApi(id);
        });
    }
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
    canActivate(route) {
        return this.waitForCollectionToLoad().switchMap(() => this.hasBook(route.params['id']));
    }
};
BookExistsGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Store,
        GoogleBooksService,
        Router])
], BookExistsGuard);
export { BookExistsGuard };
//# sourceMappingURL=book-exists.js.map