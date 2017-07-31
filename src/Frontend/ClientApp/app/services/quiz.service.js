var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
let QuizService = class QuizService {
    constructor(http) {
        this.http = http;
    }
    // getQuestion() {
    //     return this.http.get("https://opentdb.com/api.php?amount=30")
    //         .map(res => res.json()).subscribe(
    //         data => {
    //             // shuffle questions
    //             for (var i = 0; i < data.results.length - 1; i++) {
    //                 var j = i + Math.floor(Math.random() * (data.results.length - i));
    //                 var temp = data.results[j];
    //                 data[j] = data.results[i];
    //                 data[j].incorrect_answers.push(data[j].correct_answer)
    //                 data[i] = temp;
    //             }
    //             localStorage.setItem("q", JSON.stringify(data))
    //             localStorage.setItem("qNumber", JSON.stringify(data.length))
    //         },
    //         err => console.error(err)
    //         )
    getQuestion() {
        return "Fake";
    }
};
QuizService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], QuizService);
export { QuizService };
//# sourceMappingURL=quiz.service.js.map