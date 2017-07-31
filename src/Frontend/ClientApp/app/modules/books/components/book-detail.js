var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
let BookDetailComponent = class BookDetailComponent {
    constructor() {
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
    }
    /**
     * Tip: Utilize getters to keep templates clean
     */
    get id() {
        return this.book.id;
    }
    get title() {
        return this.book.volumeInfo.title;
    }
    get subtitle() {
        return this.book.volumeInfo.subtitle;
    }
    get description() {
        return this.book.volumeInfo.description;
    }
    get thumbnail() {
        return (this.book.volumeInfo.imageLinks &&
            this.book.volumeInfo.imageLinks.smallThumbnail);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BookDetailComponent.prototype, "book", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BookDetailComponent.prototype, "inCollection", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BookDetailComponent.prototype, "add", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BookDetailComponent.prototype, "remove", void 0);
BookDetailComponent = __decorate([
    Component({
        selector: 'bc-book-detail',
        template: `
    <md-card *ngIf="book">
      <md-card-title-group>
        <md-card-title>{{ title }}</md-card-title>
        <md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
        <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </md-card-title-group>
      <md-card-content>
        <p [innerHtml]="description"></p>
      </md-card-content>
      <md-card-footer class="footer">
        <bc-book-authors [book]="book"></bc-book-authors>
      </md-card-footer>
      <md-card-actions align="start">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(book)">
        Remove Book from Collection
        </button>

        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(book)">
        Add Book to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
        styles: [
            `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 600px;
    }
    md-card-title-group {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin: 15px 0 50px;
    }
    md-card-actions {
      margin: 25px 0 0 !important;
    }
    md-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `,
        ],
    })
], BookDetailComponent);
export { BookDetailComponent };
//# sourceMappingURL=book-detail.js.map