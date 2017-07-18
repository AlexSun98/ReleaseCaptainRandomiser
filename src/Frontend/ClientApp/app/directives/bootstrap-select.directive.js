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
var $ = require("jquery");
require("bootstrap-select/dist/js/bootstrap-select");
var BootstrapSelectDirective = (function () {
    function BootstrapSelectDirective(el) {
        this.el = el;
    }
    Object.defineProperty(BootstrapSelectDirective.prototype, "ngModel", {
        set: function (values) {
            var _this = this;
            setTimeout(function () { return _this.selected = values; });
        },
        enumerable: true,
        configurable: true
    });
    BootstrapSelectDirective.prototype.ngOnInit = function () {
        var _this = this;
        $(this.el.nativeElement).selectpicker();
        if (this.requiredAttribute)
            $(this.el.nativeElement).selectpicker('setStyle', 'required', 'add');
        setTimeout(function () {
            _this.refresh();
            _this.doValidation();
        });
    };
    BootstrapSelectDirective.prototype.ngOnDestroy = function () {
        $(this.el.nativeElement).selectpicker('destroy');
    };
    BootstrapSelectDirective.prototype.doValidation = function () {
        if (this.requiredAttribute) {
            $(this.el.nativeElement).selectpicker('setStyle', !this.valid ? 'ng-valid' : 'ng-invalid', 'remove');
            $(this.el.nativeElement).selectpicker('setStyle', this.valid ? 'ng-valid' : 'ng-invalid', 'add');
        }
    };
    Object.defineProperty(BootstrapSelectDirective.prototype, "requiredAttribute", {
        get: function () {
            return this.required === "" || this.required == "true";
        },
        enumerable: true,
        configurable: true
    });
    BootstrapSelectDirective.prototype.refresh = function () {
        $(this.el.nativeElement).selectpicker('refresh');
    };
    BootstrapSelectDirective.prototype.render = function () {
        $(this.el.nativeElement).selectpicker('render');
    };
    Object.defineProperty(BootstrapSelectDirective.prototype, "valid", {
        get: function () {
            return this.requiredAttribute ? this.selected && this.selected.length > 0 : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BootstrapSelectDirective.prototype, "selected", {
        get: function () {
            return $(this.el.nativeElement).selectpicker('val');
        },
        set: function (values) {
            $(this.el.nativeElement).selectpicker('val', values);
            this.doValidation();
        },
        enumerable: true,
        configurable: true
    });
    return BootstrapSelectDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BootstrapSelectDirective.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BootstrapSelectDirective.prototype, "ngModel", null);
BootstrapSelectDirective = __decorate([
    core_1.Directive({
        selector: '[bootstrapSelect]',
        exportAs: 'bootstrap-select'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BootstrapSelectDirective);
exports.BootstrapSelectDirective = BootstrapSelectDirective;
//# sourceMappingURL=bootstrap-select.directive.js.map