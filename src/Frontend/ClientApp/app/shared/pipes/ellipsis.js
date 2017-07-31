var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
let EllipsisPipe = class EllipsisPipe {
    transform(str, strLength = 250) {
        const withoutHtml = str.replace(/(<([^>]+)>)/gi, '');
        if (str.length >= strLength) {
            return `${withoutHtml.slice(0, strLength)}...`;
        }
        return withoutHtml;
    }
};
EllipsisPipe = __decorate([
    Pipe({ name: 'bcEllipsis' })
], EllipsisPipe);
export { EllipsisPipe };
//# sourceMappingURL=ellipsis.js.map