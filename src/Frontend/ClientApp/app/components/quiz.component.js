var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
let QuizComponent = class QuizComponent {
    constructor(QuizService, route, router) {
        this.QuizService = QuizService;
        this.route = route;
        this.router = router;
        this.score = 0;
    }
    VerifyAnswer(o, e) {
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
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            // (+) converts string 'id' to a number
            // fetch the file and get next Question
            this.id = +params['id'];
            if (localStorage.getItem('q') !== null) {
                var data = JSON.parse(localStorage.getItem('q'));
                this.qNumber = parseInt(localStorage.getItem('qNumber'));
                this.q = data.results[this.id - 1];
            }
            else {
                this.QuizService.getQuestion();
                var data = JSON.parse(localStorage.getItem('q'));
                this.qNumber = parseInt(localStorage.getItem('qNumber'));
                this.q = data.results[this.id - 1];
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
QuizComponent = __decorate([
    Component({
        selector: 'quiz',
        templateUrl: 'quiz.component.html',
        providers: [QuizService]
    }),
    __metadata("design:paramtypes", [QuizService, ActivatedRoute, Router])
], QuizComponent);
export { QuizComponent };
//# sourceMappingURL=quiz.component.js.map