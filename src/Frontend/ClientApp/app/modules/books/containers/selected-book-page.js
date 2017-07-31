var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBooks from '../reducers';
import * as collection from '../actions/collection';
let SelectedBookPageComponent = class SelectedBookPageComponent {
    constructor(store) {
        this.store = store;
        this.book$ = store.select(fromBooks.getSelectedBook);
        this.isSelectedBookInCollection$ = store.select(fromBooks.isSelectedBookInCollection);
    }
    addToCollection(book) {
        this.store.dispatch(new collection.AddBookAction(book));
    }
    removeFromCollection(book) {
        this.store.dispatch(new collection.RemoveBookAction(book));
    }
};
SelectedBookPageComponent = __decorate([
    Component({
        selector: 'bc-selected-book-page',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-book-detail>
  `,
    }),
    __metadata("design:paramtypes", [Store])
], SelectedBookPageComponent);
export { SelectedBookPageComponent };
//# sourceMappingURL=selected-book-page.js.map