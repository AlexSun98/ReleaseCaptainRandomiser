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
var BootstrapTabDirective = (function () {
    function BootstrapTabDirective(el, zone) {
        var _this = this;
        this.el = el;
        this.zone = zone;
        this.showBSTab = new core_1.EventEmitter();
        this.hideBSTab = new core_1.EventEmitter();
        this.tabShownSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'show.bs.tab')
            .subscribe(function (e) {
            _this.runInZone(function () { return _this.showBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }); });
        });
        this.tabHiddenSubscription = Observable_1.Observable.fromEvent($(this.el.nativeElement), 'hidden.bs.tab')
            .subscribe(function (e) {
            _this.runInZone(function () { return _this.hideBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }); });
        });
    }
    BootstrapTabDirective.prototype.ngOnDestroy = function () {
        this.tabShownSubscription.unsubscribe();
        this.tabHiddenSubscription.unsubscribe();
    };
    BootstrapTabDirective.prototype.runInZone = function (delegate) {
        this.zone.run(function () {
            delegate();
        });
    };
    BootstrapTabDirective.prototype.show = function (selector) {
        $(selector).tab('show');
    };
    return BootstrapTabDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BootstrapTabDirective.prototype, "showBSTab", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BootstrapTabDirective.prototype, "hideBSTab", void 0);
BootstrapTabDirective = __decorate([
    core_1.Directive({
        selector: '[bootstrapTab]',
        exportAs: 'bootstrap-tab'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], BootstrapTabDirective);
exports.BootstrapTabDirective = BootstrapTabDirective;
//# sourceMappingURL=bootstrap-tab.directive.js.map