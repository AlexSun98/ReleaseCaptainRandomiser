var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBooks from '../reducers';
let CollectionPageComponent = class CollectionPageComponent {
    constructor(store) {
        this.books$ = store.select(fromBooks.getBookCollection);
    }
};
CollectionPageComponent = __decorate([
    Component({
        selector: 'bc-collection-page',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>

    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
        /**
         * Container components are permitted to have just enough styles
         * to bring the view together. If the number of styles grow,
         * consider breaking them out into presentational
         * components.
         */
        styles: [
            `
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `,
        ],
    }),
    __metadata("design:paramtypes", [Store])
], CollectionPageComponent);
export { CollectionPageComponent };
//# sourceMappingURL=collection-page.js.map