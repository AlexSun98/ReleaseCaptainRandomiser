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
var quiz_service_1 = require("../services/quiz.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var QuizComponent = (function () {
    function QuizComponent(QuizService, route, router) {
        this.QuizService = QuizService;
        this.route = route;
        this.router = router;
        this.score = 0;
    }
    QuizComponent.prototype.VerifyAnswer = function (o, e) {
        if (o == this.q.r) {
            this.score = this.score + 10;
        }
        if (this.id == this.qNumber) {
            // when the last Question 
            localStorage.setItem('score', this.score.toString());
            this.router.navigate(['score']);
        }
        else {
            // navigate to next Question
            this.router.navigate(['/' + (this.id + 1)]);
        }
    };
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            // (+) converts string 'id' to a number
            // fetch the file and get next Question
            _this.id = +params['id'];
            if (localStorage.getItem('q') !== null) {
                var data = JSON.parse(localStorage.getItem('q'));
                _this.qNumber = parseInt(localStorage.getItem('qNumber'));
                _this.q = data.results[_this.id - 1];
            }
            else {
                _this.QuizService.getQuestion();
                var data = JSON.parse(localStorage.getItem('q'));
                _this.qNumber = parseInt(localStorage.getItem('qNumber'));
                _this.q = data.results[_this.id - 1];
            }
        });
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return QuizComponent;
}());
QuizComponent = __decorate([
    core_1.Component({
        selector: 'quiz',
        templateUrl: 'quiz.component.html',
        providers: [quiz_service_1.QuizService]
    }),
    __metadata("design:paramtypes", [quiz_service_1.QuizService, router_1.ActivatedRoute, router_2.Router])
], QuizComponent);
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map