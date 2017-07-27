/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor_aaca39a411ae4833299a;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(1);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(192);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(7);
__webpack_require__(24);
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
    QuizService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], QuizService);
    return QuizService;
}());
exports.QuizService = QuizService;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var quiz_service_1 = __webpack_require__(3);
var router_1 = __webpack_require__(2);
var router_2 = __webpack_require__(2);
var HomeComponent = (function () {
    function HomeComponent(QuizService, route, router) {
        this.QuizService = QuizService;
        this.route = route;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.QuizService.getQuestion();
    };
    HomeComponent.prototype.ngOnDestroy = function () { };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: __webpack_require__(21),
            providers: [quiz_service_1.QuizService]
        }),
        __metadata("design:paramtypes", [quiz_service_1.QuizService, router_1.ActivatedRoute, router_2.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var quiz_service_1 = __webpack_require__(3);
var router_1 = __webpack_require__(2);
var router_2 = __webpack_require__(2);
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
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'quiz',
            template: __webpack_require__(22),
            providers: [quiz_service_1.QuizService]
        }),
        __metadata("design:paramtypes", [quiz_service_1.QuizService, router_1.ActivatedRoute, router_2.Router])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(2);
var router_2 = __webpack_require__(2);
var ScoreComponent = (function () {
    function ScoreComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    ScoreComponent.prototype.ngOnInit = function () {
        this.score = localStorage.getItem('score');
    };
    ScoreComponent.prototype.ngOnDestroy = function () { };
    ScoreComponent = __decorate([
        core_1.Component({
            selector: 'score',
            template: __webpack_require__(23)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router])
    ], ScoreComponent);
    return ScoreComponent;
}());
exports.ScoreComponent = ScoreComponent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(190);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

////ng core
//import { NgModule, ErrorHandler } from "@angular/core";
//import { RouterModule } from "@angular/router";
//import { FormsModule } from "@angular/forms";
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http';
////ng bootstrap
//import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { ToastyModule } from 'ng2-toasty';
//import { ModalModule } from 'ngx-bootstrap/modal';
//import { TooltipModule } from "ngx-bootstrap/tooltip";
//import { PopoverModule } from "ngx-bootstrap/popover";
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { CarouselModule } from 'ngx-bootstrap/carousel';
//import { ChartsModule } from 'ng2-charts';
////ng services
//import { AppRoutingModule } from './app-routing.module';
//import { AppErrorHandler } from './app-error.handler';
//import { AppTitleService } from './services/app-title.service';
//import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
//import { ConfigurationService } from './services/configuration.service';
//import { AlertService } from './services/alert.service';
//import { LocalStoreManager } from './services/local-store-manager.service';
//import { EndpointFactory } from './services/endpoint-factory.service';
//import { NotificationService } from './services/notification.service';
//import { NotificationEndpoint } from './services/notification-endpoint.service';
//import { AccountService } from './services/account.service';
//import { AccountEndpoint } from './services/account-endpoint.service';
////ng directives
//import { EqualValidator } from './directives/equal-validator.directive';
//import { LastElementDirective } from './directives/last-element.directive';
//import { AutofocusDirective } from './directives/autofocus.directive';
//import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
//import { BootstrapToggleDirective } from './directives/bootstrap-toggle.directive';
//import { BootstrapSelectDirective } from './directives/bootstrap-select.directive';
//import { BootstrapDatepickerDirective } from './directives/bootstrap-datepicker.directive';
//import { GroupByPipe } from './pipes/group-by.pipe';
////ng components
//import { AppComponent } from "./components/app.component";
//import { LoginComponent } from "./components/login/login.component";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@NgModule({
//    //imports module - packge.json (NPM)
//    imports: [
//        BrowserModule,
//        BrowserAnimationsModule,
//        HttpModule,
//        FormsModule,
//        AppRoutingModule,
//        TranslateModule.forRoot({
//            loader: {
//                provide: TranslateLoader,
//                useClass: TranslateLanguageLoader
//            }
//        }),
//        NgxDatatableModule,
//        ToastyModule.forRoot(),
//        TooltipModule.forRoot(),
//        PopoverModule.forRoot(),
//        BsDropdownModule.forRoot(),
//        CarouselModule.forRoot(),
//        ModalModule.forRoot(),
//        ChartsModule
//    ],
//    //app's root components
//    declarations: [
//        AppComponent,
//        //LoginComponent,
//        //HomeComponent,
//        //CustomersComponent,
//        //ProductsComponent,
//        //OrdersComponent,
//        //SettingsComponent,
//        //UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
//        //RolesManagementComponent, RoleEditorComponent,
//        //AboutComponent,
//        //NotFoundComponent,
//        //NotificationsViewerComponent,
//        //SearchBoxComponent,
//        //StatisticsDemoComponent, TodoDemoComponent, BannerDemoComponent,
//        EqualValidator,
//        LastElementDirective,
//        AutofocusDirective,
//        BootstrapTabDirective,
//        BootstrapToggleDirective,
//        BootstrapSelectDirective,
//        BootstrapDatepickerDirective,
//        GroupByPipe
//    ],
//    //service provider - provide services to all components to use
//    providers: [
//        { provide: ErrorHandler, useClass: AppErrorHandler },
//        AlertService,
//        ConfigurationService,
//        AppTitleService,
//        AppTranslationService,
//        NotificationService,
//        NotificationEndpoint,
//        AccountService,
//        AccountEndpoint,
//        LocalStoreManager,
//        EndpointFactory
//    ],
//    //When Angular launches the app, it places the HTML rendering of AppComponent in the DOM, inside the <my-app> element tags of the index.html.
//    bootstrap: [AppComponent]
//})
//export class AppModule { }
var platform_browser_1 = __webpack_require__(29);
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(27);
var http_1 = __webpack_require__(7);
var app_component_1 = __webpack_require__(14);
var quiz_component_1 = __webpack_require__(5);
var not_found_component_1 = __webpack_require__(16);
var score_component_1 = __webpack_require__(6);
var home_component_1 = __webpack_require__(4);
var app_routing_1 = __webpack_require__(15);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                quiz_component_1.QuizComponent,
                not_found_component_1.PageNotFoundComponent,
                score_component_1.ScoreComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(191);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(195);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(196);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(214);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(215);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var quiz_service_1 = __webpack_require__(3);
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: __webpack_require__(20),
            styles: [__webpack_require__(25)],
            providers: [quiz_service_1.QuizService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(2);
var quiz_component_1 = __webpack_require__(5);
var score_component_1 = __webpack_require__(6);
var home_component_1 = __webpack_require__(4);
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'score', component: score_component_1.ScoreComponent },
    { path: ':id', component: quiz_component_1.QuizComponent },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent = __decorate([
        core_1.Component({
            template: '<h2>Page not found</h2>'
        })
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
exports.PageNotFoundComponent = PageNotFoundComponent;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
var core_1 = __webpack_require__(1);
var platform_browser_dynamic_1 = __webpack_require__(9);
var app_module_1 = __webpack_require__(8);
__webpack_require__(10);
var rootElemTagName = 'my-app'; //root element tag
if (false) {
    module['hot'].accept();
    module['hot'].dispose(function () {
        // Before restarting the app, we create a new root element and dispose the old one
        var oldRootElem = document.querySelector(rootElemTagName);
        var newRootElem = document.createElement(rootElemTagName);
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        modulePromise.then(function (appModule) { return appModule.destroy(); });
    });
}
else {
    core_1.enableProdMode();
}
// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
var modulePromise = platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n\r\n    <div class=\"card\">\r\n        <div class=\"card-block\">\r\n            <a class=\"btn btn-large btn-outline\" href=\"#/1\">\r\n    \r\n    Begin\r\n    This is a test !!!! Test abc efd\r\n</a>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n\r\n\r\n  <div class=\"card\">\r\n    <div class=\"card-block\">\r\n\r\n      <h3 [innerHTML]=\"q.question\"></h3>\r\n      <p [innerHTML]=\"q.category\"></p>\r\n      <form>\r\n        <fieldset>\r\n\r\n          <div class=\"\" *ngFor=\"let radio of q.incorrect_answers ; let i = index\">\r\n            <label class=\"custom-control custom-radio\">\r\n           <input id=\"radioStacked-{{i}}\" name=\"radio-stacked\"  (change)=\"VerifyAnswer(radio, $event)\" type=\"radio\" class=\"custom-control-input\"  >\r\n           <span class=\"custom-control-indicator\"></span>\r\n           <span class=\"custom-control-description\" [innerHTML]=\"radio\" ></span>\r\n         </label>\r\n\r\n          </div>\r\n        </fieldset>\r\n\r\n      </form>\r\n\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n";

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n\r\n    <div class=\"card\">\r\n        <div class=\"card-block\">\r\n            <h3>Score is : {{score}} </h3>\r\n            <a class=\"btn btn-large btn-outline\" href=\"/\">\r\n    \r\n    Home\r\n    \r\n</a>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(28);
var map_1 = __webpack_require__(26);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(18);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(179);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(189);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(2);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(9);

/***/ })
/******/ ]);
//# sourceMappingURL=main-client.js.map