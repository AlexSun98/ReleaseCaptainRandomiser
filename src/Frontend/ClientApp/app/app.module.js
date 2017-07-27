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
"use strict";
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
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var quiz_component_1 = require("./components/quiz.component");
var not_found_component_1 = require("./components/not-found.component");
var score_component_1 = require("./components/score.component");
var home_component_1 = require("./components/home.component");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map