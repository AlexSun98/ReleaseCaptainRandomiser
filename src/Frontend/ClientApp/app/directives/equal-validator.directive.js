var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
let EqualValidator = EqualValidator_1 = class EqualValidator {
    constructor(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    validate(c) {
        let other = c.root.get(this.validateEqual);
        if (!other)
            return null;
        return this.reverse === 'true' ? this.validateReverse(c, other) : this.validateNoReverse(c, other);
    }
    validateNoReverse(c, other) {
        return other.value === c.value ? null : { validateEqual: true };
    }
    validateReverse(c, other) {
        if (c.value === other.value) {
            if (other.errors) {
                delete other.errors['validateEqual'];
                if (Object.keys(other.errors).length == 0) {
                    other.setErrors(null);
                }
                ;
            }
        }
        else {
            other.setErrors({ validateEqual: true });
        }
        return null;
    }
};
EqualValidator = EqualValidator_1 = __decorate([
    Directive({
        selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator_1), multi: true }
        ]
    }),
    __param(0, Attribute('validateEqual')),
    __param(1, Attribute('reverse')),
    __metadata("design:paramtypes", [String, String])
], EqualValidator);
export { EqualValidator };
var EqualValidator_1;
//# sourceMappingURL=equal-validator.directive.js.map