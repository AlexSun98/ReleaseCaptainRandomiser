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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBooks from '../reducers';
import * as book from '../actions/book';
let FindBookPageComponent = class FindBookPageComponent {
    constructor(store) {
        this.store = store;
        this.searchQuery$ = store.select(fromBooks.getSearchQuery).take(1);
        this.books$ = store.select(fromBooks.getSearchResults);
        this.loading$ = store.select(fromBooks.getSearchLoading);
    }
    search(query) {
        this.store.dispatch(new book.SearchAction(query));
    }
};
FindBookPageComponent = __decorate([
    Component({
        selector: 'bc-find-book-page',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <bc-book-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
    }),
    __metadata("design:paramtypes", [Store])
], FindBookPageComponent);
export { FindBookPageComponent };
//# sourceMappingURL=find-book-page.js.map