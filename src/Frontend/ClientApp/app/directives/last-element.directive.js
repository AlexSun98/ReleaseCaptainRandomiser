var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, EventEmitter } from '@angular/core';
let LastElementDirective = class LastElementDirective {
    constructor() {
        this.lastFunction = new EventEmitter();
    }
    set lastElement(isLastElement) {
        if (isLastElement) {
            setTimeout(() => {
                this.lastFunction.emit();
            });
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], LastElementDirective.prototype, "lastElement", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LastElementDirective.prototype, "lastFunction", void 0);
LastElementDirective = __decorate([
    Directive({
        selector: '[lastElement]'
    })
], LastElementDirective);
export { LastElementDirective };
//# sourceMappingURL=last-element.directive.js.map