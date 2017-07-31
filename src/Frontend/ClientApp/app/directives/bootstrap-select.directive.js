var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-select/dist/js/bootstrap-select';
let BootstrapSelectDirective = class BootstrapSelectDirective {
    constructor(el) {
        this.el = el;
    }
    set ngModel(values) {
        setTimeout(() => this.selected = values);
    }
    ngOnInit() {
        $(this.el.nativeElement).selectpicker();
        if (this.requiredAttribute)
            $(this.el.nativeElement).selectpicker('setStyle', 'required', 'add');
        setTimeout(() => {
            this.refresh();
            this.doValidation();
        });
    }
    ngOnDestroy() {
        $(this.el.nativeElement).selectpicker('destroy');
    }
    doValidation() {
        if (this.requiredAttribute) {
            $(this.el.nativeElement).selectpicker('setStyle', !this.valid ? 'ng-valid' : 'ng-invalid', 'remove');
            $(this.el.nativeElement).selectpicker('setStyle', this.valid ? 'ng-valid' : 'ng-invalid', 'add');
        }
    }
    get requiredAttribute() {
        return this.required === "" || this.required == "true";
    }
    refresh() {
        $(this.el.nativeElement).selectpicker('refresh');
    }
    render() {
        $(this.el.nativeElement).selectpicker('render');
    }
    get valid() {
        return this.requiredAttribute ? this.selected && this.selected.length > 0 : true;
    }
    set selected(values) {
        $(this.el.nativeElement).selectpicker('val', values);
        this.doValidation();
    }
    get selected() {
        return $(this.el.nativeElement).selectpicker('val');
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], BootstrapSelectDirective.prototype, "required", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapSelectDirective.prototype, "ngModel", null);
BootstrapSelectDirective = __decorate([
    Directive({
        selector: '[bootstrapSelect]',
        exportAs: 'bootstrap-select'
    }),
    __metadata("design:paramtypes", [ElementRef])
], BootstrapSelectDirective);
export { BootstrapSelectDirective };
//# sourceMappingURL=bootstrap-select.directive.js.map