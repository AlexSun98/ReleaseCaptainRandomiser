"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var quiz_component_1 = require("./components/quiz.component");
var score_component_1 = require("./components/score.component");
var home_component_1 = require("./components/home.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'score', component: score_component_1.ScoreComponent },
    { path: ':id', component: quiz_component_1.QuizComponent },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map