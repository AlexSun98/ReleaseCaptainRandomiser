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
import 'rxjs/add/operator/pluck';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as book from '../actions/book';
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
let ViewBookPageComponent = class ViewBookPageComponent {
    constructor(store, route) {
        this.actionsSubscription = route.params
            .map(params => new book.SelectAction(params.id))
            .subscribe(store);
    }
    ngOnDestroy() {
        this.actionsSubscription.unsubscribe();
    }
};
ViewBookPageComponent = __decorate([
    Component({
        selector: 'bc-view-book-page',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <bc-selected-book-page></bc-selected-book-page>
  `,
    }),
    __metadata("design:paramtypes", [Store, ActivatedRoute])
], ViewBookPageComponent);
export { ViewBookPageComponent };
//# sourceMappingURL=view-book-page.js.map