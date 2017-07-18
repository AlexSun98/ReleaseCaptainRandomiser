"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
var $ = require("jquery");
require("bootstrap-datepicker/dist/js/bootstrap-datepicker");
var BootstrapDatepickerDirective = (function () {
    function BootstrapDatepickerDirective(el) {
        var _this = this;
        this.el = el;
        this._isShown = false;
        this.options = {};
        this.ngModelChange = new core_1.EventEmitter();
        this.changedSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'change').subscribe(function (e) { return setTimeout(function () { return _this.ngModelChange.emit(e.target.value); }); });
        this.shownSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'show').subscribe(function (e) { return _this._isShown = true; });
        this.hiddenSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'hide').subscribe(function (e) { return _this._isShown = false; });
    }
    Object.defineProperty(BootstrapDatepickerDirective.prototype, "isShown", {
        get: function () {
            return this._isShown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BootstrapDatepickerDirective.prototype, "ngModel", {
        set: function (value) {
            this.tryUpdate(value);
        },
        enumerable: true,
        configurable: true
    });
    BootstrapDatepickerDirective.prototype.ngOnInit = function () {
        this.initialize(this.options);
    };
    BootstrapDatepickerDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    BootstrapDatepickerDirective.prototype.initialize = function (options) {
        $(this.el.nativeElement).datepicker(options);
    };
    BootstrapDatepickerDirective.prototype.destroy = function () {
        if (this.changedSubscription) {
            this.changedSubscription.unsubscribe();
            this.shownSubscription.unsubscribe();
            this.hiddenSubscription.unsubscribe();
        }
        $(this.el.nativeElement).datepicker('destroy');
    };
    BootstrapDatepickerDirective.prototype.show = function () {
        $(this.el.nativeElement).datepicker('show');
    };
    BootstrapDatepickerDirective.prototype.hide = function () {
        $(this.el.nativeElement).datepicker('hide');
    };
    BootstrapDatepickerDirective.prototype.toggle = function () {
        this.isShown ? this.hide() : this.show();
    };
    BootstrapDatepickerDirective.prototype.tryUpdate = function (value) {
        var _this = this;
        clearTimeout(this.updateTimeout);
        if (!$(this.el.nativeElement).is(":focus")) {
            this.update(value);
        }
        else {
            this.updateTimeout = setTimeout(function () {
                _this.updateTimeout = null;
                _this.tryUpdate(value);
            }, 100);
        }
    };
    BootstrapDatepickerDirective.prototype.update = function (value) {
        var _this = this;
        setTimeout(function () { return $(_this.el.nativeElement).datepicker('update', value); });
    };
    BootstrapDatepickerDirective.prototype.setDate = function (value) {
        var _this = this;
        setTimeout(function () { return $(_this.el.nativeElement).datepicker('setDate', value); });
    };
    BootstrapDatepickerDirective.prototype.setUTCDate = function (value) {
        var _this = this;
        setTimeout(function () { return $(_this.el.nativeElement).datepicker('setUTCDate', value); });
    };
    BootstrapDatepickerDirective.prototype.clearDates = function () {
        var _this = this;
        setTimeout(function () { return $(_this.el.nativeElement).datepicker('clearDates'); });
    };
    BootstrapDatepickerDirective.prototype.getDate = function () {
        $(this.el.nativeElement).datepicker('getDate');
    };
    BootstrapDatepickerDirective.prototype.getUTCDate = function () {
        $(this.el.nativeElement).datepicker('getUTCDate');
    };
    return BootstrapDatepickerDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BootstrapDatepickerDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapDatepickerDirective.prototype, "ngModel", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BootstrapDatepickerDirective.prototype, "ngModelChange", void 0);
BootstrapDatepickerDirective = __decorate([
    core_1.Directive({
        selector: '[bootstrapDatepicker]',
        exportAs: 'bootstrap-datepicker'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BootstrapDatepickerDirective);
exports.BootstrapDatepickerDirective = BootstrapDatepickerDirective;
//# sourceMappingURL=bootstrap-datepicker.directive.js.map