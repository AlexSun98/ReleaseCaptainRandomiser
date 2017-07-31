var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import * as $ from 'jquery';
let BootstrapTabDirective = class BootstrapTabDirective {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.showBSTab = new EventEmitter();
        this.hideBSTab = new EventEmitter();
        this.tabShownSubscription = Observable.fromEvent($(this.el.nativeElement), 'show.bs.tab')
            .subscribe((e) => {
            this.runInZone(() => this.showBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }));
        });
        this.tabHiddenSubscription = Observable.fromEvent($(this.el.nativeElement), 'hidden.bs.tab')
            .subscribe((e) => {
            this.runInZone(() => this.hideBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }));
        });
    }
    ngOnDestroy() {
        this.tabShownSubscription.unsubscribe();
        this.tabHiddenSubscription.unsubscribe();
    }
    runInZone(delegate) {
        this.zone.run(() => {
            delegate();
        });
    }
    show(selector) {
        $(selector).tab('show');
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], BootstrapTabDirective.prototype, "showBSTab", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BootstrapTabDirective.prototype, "hideBSTab", void 0);
BootstrapTabDirective = __decorate([
    Directive({
        selector: '[bootstrapTab]',
        exportAs: 'bootstrap-tab'
    }),
    __metadata("design:paramtypes", [ElementRef, NgZone])
], BootstrapTabDirective);
export { BootstrapTabDirective };
//# sourceMappingURL=bootstrap-tab.directive.js.map