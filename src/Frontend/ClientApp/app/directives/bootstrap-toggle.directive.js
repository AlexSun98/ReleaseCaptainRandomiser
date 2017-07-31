var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import * as $ from 'jquery';
import 'bootstrap-toggle/js/bootstrap-toggle';
let BootstrapToggleDirective = class BootstrapToggleDirective {
    constructor(el) {
        this.el = el;
        this.ngModelChange = new EventEmitter();
        this.checkedSubscription = Observable.fromEvent($(this.el.nativeElement), 'change')
            .subscribe((e) => this.ngModelChange.emit(e.target.checked));
    }
    set ngModel(value) {
        this.toggle(value);
    }
    ngOnInit() {
        this.initialize();
    }
    ngOnDestroy() {
        this.destroy();
    }
    initialize(options) {
        $(this.el.nativeElement).bootstrapToggle(options);
    }
    destroy() {
        if (this.checkedSubscription)
            this.checkedSubscription.unsubscribe();
        $(this.el.nativeElement).bootstrapToggle('destroy');
    }
    toggleOn() {
        $(this.el.nativeElement).bootstrapToggle('on');
    }
    toggleOff() {
        $(this.el.nativeElement).bootstrapToggle('off');
    }
    toggle(value) {
        if (value == null)
            $(this.el.nativeElement).bootstrapToggle('toggle');
        else
            $(this.el.nativeElement).prop('checked', value).change();
    }
    enable() {
        $(this.el.nativeElement).bootstrapToggle('enable');
    }
    disable() {
        $(this.el.nativeElement).bootstrapToggle('disable');
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapToggleDirective.prototype, "ngModel", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BootstrapToggleDirective.prototype, "ngModelChange", void 0);
BootstrapToggleDirective = __decorate([
    Directive({
        selector: '[bootstrapToggle]',
        exportAs: 'bootstrap-toggle'
    }),
    __metadata("design:paramtypes", [ElementRef])
], BootstrapToggleDirective);
export { BootstrapToggleDirective };
//# sourceMappingURL=bootstrap-toggle.directive.js.map