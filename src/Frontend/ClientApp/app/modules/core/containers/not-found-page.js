var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ChangeDetectionStrategy } from '@angular/core';
let NotFoundPageComponent = class NotFoundPageComponent {
};
NotFoundPageComponent = __decorate([
    Component({
        selector: 'bc-not-found-page',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <md-card>
      <md-card-title>404: Not Found</md-card-title>
      <md-card-content>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </md-card-content>
      <md-card-actions>
        <button md-raised-button color="primary" routerLink="/">Take Me Home</button>
      </md-card-actions>
    </md-card>
  `,
        styles: [
            `
    :host {
      text-align: center;
    }
  `,
        ],
    })
], NotFoundPageComponent);
export { NotFoundPageComponent };
//# sourceMappingURL=not-found-page.js.map