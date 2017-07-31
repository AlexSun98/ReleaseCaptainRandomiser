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
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
let BootstrapDatepickerDirective = class BootstrapDatepickerDirective {
    constructor(el) {
        this.el = el;
        this._isShown = false;
        this.options = {};
        this.ngModelChange = new EventEmitter();
        this.changedSubscription = Observable.fromEvent($(this.el.nativeElement), 'change').subscribe((e) => setTimeout(() => this.ngModelChange.emit(e.target.value)));
        this.shownSubscription = Observable.fromEvent($(this.el.nativeElement), 'show').subscribe((e) => this._isShown = true);
        this.hiddenSubscription = Observable.fromEvent($(this.el.nativeElement), 'hide').subscribe((e) => this._isShown = false);
    }
    get isShown() {
        return this._isShown;
    }
    set ngModel(value) {
        this.tryUpdate(value);
    }
    ngOnInit() {
        this.initialize(this.options);
    }
    ngOnDestroy() {
        this.destroy();
    }
    initialize(options) {
        $(this.el.nativeElement).datepicker(options);
    }
    destroy() {
        if (this.changedSubscription) {
            this.changedSubscription.unsubscribe();
            this.shownSubscription.unsubscribe();
            this.hiddenSubscription.unsubscribe();
        }
        $(this.el.nativeElement).datepicker('destroy');
    }
    show() {
        $(this.el.nativeElement).datepicker('show');
    }
    hide() {
        $(this.el.nativeElement).datepicker('hide');
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    tryUpdate(value) {
        clearTimeout(this.updateTimeout);
        if (!$(this.el.nativeElement).is(":focus")) {
            this.update(value);
        }
        else {
            this.updateTimeout = setTimeout(() => {
                this.updateTimeout = null;
                this.tryUpdate(value);
            }, 100);
        }
    }
    update(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('update', value));
    }
    setDate(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('setDate', value));
    }
    setUTCDate(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('setUTCDate', value));
    }
    clearDates() {
        setTimeout(() => $(this.el.nativeElement).datepicker('clearDates'));
    }
    getDate() {
        $(this.el.nativeElement).datepicker('getDate');
    }
    getUTCDate() {
        $(this.el.nativeElement).datepicker('getUTCDate');
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BootstrapDatepickerDirective.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapDatepickerDirective.prototype, "ngModel", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BootstrapDatepickerDirective.prototype, "ngModelChange", void 0);
BootstrapDatepickerDirective = __decorate([
    Directive({
        selector: '[bootstrapDatepicker]',
        exportAs: 'bootstrap-datepicker'
    }),
    __metadata("design:paramtypes", [ElementRef])
], BootstrapDatepickerDirective);
export { BootstrapDatepickerDirective };
//# sourceMappingURL=bootstrap-datepicker.directive.js.map