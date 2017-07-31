var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
let AddCommasPipe = class AddCommasPipe {
    transform(authors) {
        if (!authors) {
            return 'Author Unknown';
        }
        switch (authors.length) {
            case 0:
                return 'Author Unknown';
            case 1:
                return authors[0];
            case 2:
                return authors.join(' and ');
            default:
                const last = authors[authors.length - 1];
                const remaining = authors.slice(0, -1);
                return `${remaining.join(', ')}, and ${last}`;
        }
    }
};
AddCommasPipe = __decorate([
    Pipe({ name: 'bcAddCommas' })
], AddCommasPipe);
export { AddCommasPipe };
//# sourceMappingURL=add-commas.js.map