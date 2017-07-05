"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var ng2_toasty_1 = require("ng2-toasty");
var modal_1 = require("ngx-bootstrap/modal");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var popover_1 = require("ngx-bootstrap/popover");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var carousel_1 = require("ngx-bootstrap/carousel");
var ng2_charts_1 = require("ng2-charts");
//import { AppRoutingModule } from './app-routing.module';
var app_component_1 = require("./components/app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            //AppRoutingModule,
            ngx_datatable_1.NgxDatatableModule,
            ng2_toasty_1.ToastyModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            popover_1.PopoverModule.forRoot(),
            dropdown_1.BsDropdownModule.forRoot(),
            carousel_1.CarouselModule.forRoot(),
            modal_1.ModalModule.forRoot(),
            ng2_charts_1.ChartsModule
        ],
        declarations: [],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map