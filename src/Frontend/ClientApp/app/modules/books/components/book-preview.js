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
let BookPreviewComponent = class BookPreviewComponent {
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
        if (this.book.volumeInfo.imageLinks) {
            return this.book.volumeInfo.imageLinks.smallThumbnail;
        }
        return false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BookPreviewComponent.prototype, "book", void 0);
BookPreviewComponent = __decorate([
    Component({
        selector: 'bc-book-preview',
        template: `
    <a [routerLink]="['/books', id]">
      <md-card>
        <md-card-title-group>
          <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          <md-card-title>{{ title | bcEllipsis:35 }}</md-card-title>
          <md-card-subtitle *ngIf="subtitle">{{ subtitle | bcEllipsis:40 }}</md-card-subtitle>
        </md-card-title-group>
        <md-card-content>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
        </md-card-content>
        <md-card-footer>
          <bc-book-authors [book]="book"></bc-book-authors>
        </md-card-footer>
      </md-card>
    </a>
  `,
        styles: [
            `
    md-card {
      width: 400px;
      height: 300px;
      margin: 15px;
    }
    @media only screen and (max-width: 768px) {
      md-card {
        margin: 15px 0 !important;
      }
    }
    md-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    md-card-title {
      margin-right: 10px;
    }
    md-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding: 0 25px 25px;
    }
  `,
        ],
    })
], BookPreviewComponent);
export { BookPreviewComponent };
//# sourceMappingURL=book-preview.js.map