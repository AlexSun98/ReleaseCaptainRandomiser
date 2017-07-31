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
let SidenavComponent = class SidenavComponent {
    constructor() {
        this.open = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SidenavComponent.prototype, "open", void 0);
SidenavComponent = __decorate([
    Component({
        selector: 'bc-sidenav',
        template: `
    <md-sidenav [opened]="open">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
        styles: [
            `
    md-sidenav {
      width: 300px;
    }
  `,
        ],
    })
], SidenavComponent);
export { SidenavComponent };
//# sourceMappingURL=sidenav.js.map