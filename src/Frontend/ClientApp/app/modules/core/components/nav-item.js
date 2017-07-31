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
let NavItemComponent = class NavItemComponent {
    constructor() {
        this.icon = '';
        this.hint = '';
        this.routerLink = '/';
        this.activate = new EventEmitter();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "hint", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "routerLink", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "activate", void 0);
NavItemComponent = __decorate([
    Component({
        selector: 'bc-nav-item',
        template: `
    <a md-list-item [routerLink]="routerLink" (click)="activate.emit()">
      <md-icon md-list-icon>{{ icon }}</md-icon>
      <span md-line><ng-content></ng-content></span>
      <span md-line class="secondary">{{ hint }}</span>
    </a>
  `,
        styles: [
            `
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `,
        ],
    })
], NavItemComponent);
export { NavItemComponent };
//# sourceMappingURL=nav-item.js.map