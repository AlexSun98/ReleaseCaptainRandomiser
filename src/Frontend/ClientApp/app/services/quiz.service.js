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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var QuizService = (function () {
    function QuizService(http) {
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
    QuizService.prototype.getQuestion = function () {
        return "Fake";
    };
    return QuizService;
}());
QuizService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map