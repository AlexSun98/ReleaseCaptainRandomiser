var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ErrorHandler } from "@angular/core";
let AppErrorHandler = class AppErrorHandler extends ErrorHandler {
    //private alertService: AlertService;
    constructor() {
        super(true);
    }
    handleError(error) {
        //if (this.alertService == null) {
        //    this.alertService = this.injector.get(AlertService);
        //}
        //this.alertService.showStickyMessage("Fatal Error!", "An unresolved error has occured. Please reload the page to correct this error", MessageSeverity.warn);
        //this.alertService.showStickyMessage("Unhandled Error", error.message || error, MessageSeverity.error, error);
        if (confirm("Fatal Error!\nAn unresolved error has occured. Do you want to reload the page to correct this?\n\nError: " + error.message))
            window.location.reload(true);
        super.handleError(error);
    }
};
AppErrorHandler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AppErrorHandler);
export { AppErrorHandler };
//# sourceMappingURL=app-error.handler.js.map