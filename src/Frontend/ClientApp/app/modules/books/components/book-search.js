var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter } from '@angular/core';
let BookSearchComponent = class BookSearchComponent {
    constructor() {
        this.query = '';
        this.searching = false;
        this.search = new EventEmitter();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BookSearchComponent.prototype, "query", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BookSearchComponent.prototype, "searching", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BookSearchComponent.prototype, "search", void 0);
BookSearchComponent = __decorate([
    Component({
        selector: 'bc-book-search',
        template: `
    <md-card>
      <md-card-title>Find a Book</md-card-title>
      <md-card-content>
        <md-input-container>
          <input mdInput placeholder="Search for a book" [value]="query" (keyup)="search.emit($event.target.value)">
        </md-input-container>
        <md-spinner [class.show]="searching"></md-spinner>
      </md-card-content>
    </md-card>
  `,
        styles: [
            `
    md-card-title,
    md-card-content {
      display: flex;
      justify-content: center;
    }

    input {
      width: 300px;
    }

    md-card-spinner {
      padding-left: 60px; // Make room for the spinner
    }

    md-spinner {
      width: 30px;
      height: 30px;
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
    }

    md-spinner.show {
      opacity: 1.0;
    }
  `,
        ],
    })
], BookSearchComponent);
export { BookSearchComponent };
//# sourceMappingURL=book-search.js.map