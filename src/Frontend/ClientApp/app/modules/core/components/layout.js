var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let LayoutComponent = class LayoutComponent {
};
LayoutComponent = __decorate([
    Component({
        selector: 'bc-layout',
        template: `
    <md-sidenav-container fullscreen>

      <ng-content></ng-content>

    </md-sidenav-container>
  `,
        styles: [
            `
    md-sidenav-container {
      background: rgba(0, 0, 0, 0.03);
    }

    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `,
        ],
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.js.map