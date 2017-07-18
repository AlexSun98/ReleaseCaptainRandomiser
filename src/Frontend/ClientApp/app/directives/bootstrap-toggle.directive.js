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
require("bootstrap-toggle/js/bootstrap-toggle");
var BootstrapToggleDirective = (function () {
    function BootstrapToggleDirective(el) {
        var _this = this;
        this.el = el;
        this.ngModelChange = new core_1.EventEmitter();
        this.checkedSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'change')
            .subscribe(function (e) { return _this.ngModelChange.emit(e.target.checked); });
    }
    Object.defineProperty(BootstrapToggleDirective.prototype, "ngModel", {
        set: function (value) {
            this.toggle(value);
        },
        enumerable: true,
        configurable: true
    });
    BootstrapToggleDirective.prototype.ngOnInit = function () {
        this.initialize();
    };
    BootstrapToggleDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    BootstrapToggleDirective.prototype.initialize = function (options) {
        $(this.el.nativeElement).bootstrapToggle(options);
    };
    BootstrapToggleDirective.prototype.destroy = function () {
        if (this.checkedSubscription)
            this.checkedSubscription.unsubscribe();
        $(this.el.nativeElement).bootstrapToggle('destroy');
    };
    BootstrapToggleDirective.prototype.toggleOn = function () {
        $(this.el.nativeElement).bootstrapToggle('on');
    };
    BootstrapToggleDirective.prototype.toggleOff = function () {
        $(this.el.nativeElement).bootstrapToggle('off');
    };
    BootstrapToggleDirective.prototype.toggle = function (value) {
        if (value == null)
            $(this.el.nativeElement).bootstrapToggle('toggle');
        else
            $(this.el.nativeElement).prop('checked', value).change();
    };
    BootstrapToggleDirective.prototype.enable = function () {
        $(this.el.nativeElement).bootstrapToggle('enable');
    };
    BootstrapToggleDirective.prototype.disable = function () {
        $(this.el.nativeElement).bootstrapToggle('disable');
    };
    return BootstrapToggleDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapToggleDirective.prototype, "ngModel", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BootstrapToggleDirective.prototype, "ngModelChange", void 0);
BootstrapToggleDirective = __decorate([
    core_1.Directive({
        selector: '[bootstrapToggle]',
        exportAs: 'bootstrap-toggle'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BootstrapToggleDirective);
exports.BootstrapToggleDirective = BootstrapToggleDirective;
//# sourceMappingURL=bootstrap-toggle.directive.js.map