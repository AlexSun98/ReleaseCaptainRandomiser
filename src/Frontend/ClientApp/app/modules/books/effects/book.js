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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { GoogleBooksService } from '../../core/services/google-books';
import * as book from '../actions/book';
export const SEARCH_DEBOUNCE = new InjectionToken('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken('Search Scheduler');
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
let BookEffects = class BookEffects {
    constructor(actions$, googleBooks, debounce = 300, 
        /**
           * You inject an optional Scheduler that will be undefined
           * in normal application usage, but its injected here so that you can mock out
           * during testing using the RxJS TestScheduler for simulating passages of time.
           */
        scheduler) {
        this.actions$ = actions$;
        this.googleBooks = googleBooks;
        this.debounce = debounce;
        this.scheduler = scheduler;
        this.search$ = this.actions$
            .ofType(book.SEARCH)
            .debounceTime(this.debounce, this.scheduler || async)
            .map(toPayload)
            .switchMap(query => {
            if (query === '') {
                return empty();
            }
            const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);
            return this.googleBooks
                .searchBooks(query)
                .takeUntil(nextSearch$)
                .map((books) => new book.SearchCompleteAction(books))
                .catch(() => of(new book.SearchCompleteAction([])));
        });
    }
};
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], BookEffects.prototype, "search$", void 0);
BookEffects = __decorate([
    Injectable(),
    __param(2, Optional()),
    __param(2, Inject(SEARCH_DEBOUNCE)),
    __param(3, Optional()),
    __param(3, Inject(SEARCH_SCHEDULER)),
    __metadata("design:paramtypes", [Actions,
        GoogleBooksService, Number, Scheduler])
], BookEffects);
export { BookEffects };
//# sourceMappingURL=book.js.map