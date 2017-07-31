var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
let BookPreviewListComponent = class BookPreviewListComponent {
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], BookPreviewListComponent.prototype, "books", void 0);
BookPreviewListComponent = __decorate([
    Component({
        selector: 'bc-book-preview-list',
        template: `
    <bc-book-preview *ngFor="let book of books" [book]="book"></bc-book-preview>
  `,
        styles: [
            `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
        ],
    })
], BookPreviewListComponent);
export { BookPreviewListComponent };
//# sourceMappingURL=book-preview-list.js.map