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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var ScoreComponent = (function () {
    function ScoreComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    ScoreComponent.prototype.ngOnInit = function () {
        this.score = localStorage.getItem('score');
    };
    ScoreComponent.prototype.ngOnDestroy = function () { };
    return ScoreComponent;
}());
ScoreComponent = __decorate([
    core_1.Component({
        selector: 'score',
        templateUrl: './score.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router])
], ScoreComponent);
exports.ScoreComponent = ScoreComponent;
//# sourceMappingURL=score.component.js.map