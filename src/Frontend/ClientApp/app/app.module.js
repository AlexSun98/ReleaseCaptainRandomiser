"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//ng core
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
//ng bootstrap
var core_2 = require("@ngx-translate/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var ng2_toasty_1 = require("ng2-toasty");
var modal_1 = require("ngx-bootstrap/modal");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var popover_1 = require("ngx-bootstrap/popover");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var carousel_1 = require("ngx-bootstrap/carousel");
var ng2_charts_1 = require("ng2-charts");
//ng services
var app_routing_module_1 = require("./app-routing.module");
var app_error_handler_1 = require("./app-error.handler");
var app_title_service_1 = require("./services/app-title.service");
var app_translation_service_1 = require("./services/app-translation.service");
var configuration_service_1 = require("./services/configuration.service");
var alert_service_1 = require("./services/alert.service");
var local_store_manager_service_1 = require("./services/local-store-manager.service");
var endpoint_factory_service_1 = require("./services/endpoint-factory.service");
var notification_service_1 = require("./services/notification.service");
var notification_endpoint_service_1 = require("./services/notification-endpoint.service");
var account_service_1 = require("./services/account.service");
var account_endpoint_service_1 = require("./services/account-endpoint.service");
//ng directives
var equal_validator_directive_1 = require("./directives/equal-validator.directive");
var last_element_directive_1 = require("./directives/last-element.directive");
var autofocus_directive_1 = require("./directives/autofocus.directive");
var bootstrap_tab_directive_1 = require("./directives/bootstrap-tab.directive");
var bootstrap_toggle_directive_1 = require("./directives/bootstrap-toggle.directive");
var bootstrap_select_directive_1 = require("./directives/bootstrap-select.directive");
var bootstrap_datepicker_directive_1 = require("./directives/bootstrap-datepicker.directive");
var group_by_pipe_1 = require("./pipes/group-by.pipe");
//ng components
var app_component_1 = require("./components/app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        //imports module - packge.json (NPM)
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useClass: app_translation_service_1.TranslateLanguageLoader
                }
            }),
            ngx_datatable_1.NgxDatatableModule,
            ng2_toasty_1.ToastyModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            popover_1.PopoverModule.forRoot(),
            dropdown_1.BsDropdownModule.forRoot(),
            carousel_1.CarouselModule.forRoot(),
            modal_1.ModalModule.forRoot(),
            ng2_charts_1.ChartsModule
        ],
        //app's root components
        declarations: [
            app_component_1.AppComponent,
            //LoginComponent,
            //HomeComponent,
            //CustomersComponent,
            //ProductsComponent,
            //OrdersComponent,
            //SettingsComponent,
            //UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
            //RolesManagementComponent, RoleEditorComponent,
            //AboutComponent,
            //NotFoundComponent,
            //NotificationsViewerComponent,
            //SearchBoxComponent,
            //StatisticsDemoComponent, TodoDemoComponent, BannerDemoComponent,
            equal_validator_directive_1.EqualValidator,
            last_element_directive_1.LastElementDirective,
            autofocus_directive_1.AutofocusDirective,
            bootstrap_tab_directive_1.BootstrapTabDirective,
            bootstrap_toggle_directive_1.BootstrapToggleDirective,
            bootstrap_select_directive_1.BootstrapSelectDirective,
            bootstrap_datepicker_directive_1.BootstrapDatepickerDirective,
            group_by_pipe_1.GroupByPipe
        ],
        //service provider - provide services to all components to use
        providers: [
            { provide: core_1.ErrorHandler, useClass: app_error_handler_1.AppErrorHandler },
            alert_service_1.AlertService,
            configuration_service_1.ConfigurationService,
            app_title_service_1.AppTitleService,
            app_translation_service_1.AppTranslationService,
            notification_service_1.NotificationService,
            notification_endpoint_service_1.NotificationEndpoint,
            account_service_1.AccountService,
            account_endpoint_service_1.AccountEndpoint,
            local_store_manager_service_1.LocalStoreManager,
            endpoint_factory_service_1.EndpointFactory
        ],
        //When Angular launches the app, it places the HTML rendering of AppComponent in the DOM, inside the <my-app> element tags of the index.html.
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map