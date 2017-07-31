var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AppTranslationService } from './app-translation.service';
import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-Keys';
import { Utilities } from './utilities';
let ConfigurationService = ConfigurationService_1 = class ConfigurationService {
    constructor(localStorage, translationService) {
        this.localStorage = localStorage;
        this.translationService = translationService;
        this.baseUrl = Utilities.baseUrl().replace(/\/$/, '');
        this.fallbackBaseUrl = "http://ebenmonney.com/demo/quickapp";
        this.loginUrl = "/Login";
        //***End of defaults***  
        this._language = null;
        this._homeUrl = null;
        this._theme = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.loadLocalChanges();
    }
    loadLocalChanges() {
        if (this.localStorage.exists(DBkeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject(DBkeys.LANGUAGE);
            this.translationService.changeLanguage(this._language);
        }
        else {
            this.resetLanguage();
        }
        if (this.localStorage.exists(DBkeys.HOME_URL))
            this._homeUrl = this.localStorage.getDataObject(DBkeys.HOME_URL);
        if (this.localStorage.exists(DBkeys.THEME))
            this._theme = this.localStorage.getDataObject(DBkeys.THEME);
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_STATISTICS))
            this._showDashboardStatistics = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_STATISTICS);
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS))
            this._showDashboardNotifications = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_TODO))
            this._showDashboardTodo = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_TODO);
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_BANNER))
            this._showDashboardBanner = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_BANNER);
    }
    saveToLocalStore(data, key) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }
    import(jsonValue) {
        this.clearLocalChanges();
        if (!jsonValue)
            return;
        let importValue = Utilities.JSonTryParse(jsonValue);
        if (importValue.language != null)
            this.language = importValue.language;
        if (importValue.homeUrl != null)
            this.homeUrl = importValue.homeUrl;
        if (importValue.theme != null)
            this.theme = importValue.theme;
        if (importValue.showDashboardStatistics != null)
            this.showDashboardStatistics = importValue.showDashboardStatistics;
        if (importValue.showDashboardNotifications != null)
            this.showDashboardNotifications = importValue.showDashboardNotifications;
        if (importValue.showDashboardTodo != null)
            this.showDashboardTodo = importValue.showDashboardTodo;
        if (importValue.showDashboardBanner != null)
            this.showDashboardBanner = importValue.showDashboardBanner;
    }
    export(changesOnly = true) {
        let exportValue = {
            language: changesOnly ? this._language : this.language,
            homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
            theme: changesOnly ? this._theme : this.theme,
            showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
            showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
            showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
            showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
        };
        return JSON.stringify(exportValue);
    }
    clearLocalChanges() {
        this._language = null;
        this._homeUrl = null;
        this._theme = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.localStorage.deleteData(DBkeys.LANGUAGE);
        this.localStorage.deleteData(DBkeys.HOME_URL);
        this.localStorage.deleteData(DBkeys.THEME);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_STATISTICS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_TODO);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_BANNER);
        this.resetLanguage();
    }
    resetLanguage() {
        let language = this.translationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.changeLanguage();
        }
    }
    set language(value) {
        this._language = value;
        this.saveToLocalStore(value, DBkeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    get language() {
        if (this._language != null)
            return this._language;
        return ConfigurationService_1.defaultLanguage;
    }
    set homeUrl(value) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    get homeUrl() {
        if (this._homeUrl != null)
            return this._homeUrl;
        return ConfigurationService_1.defaultHomeUrl;
    }
    set theme(value) {
        this._theme = value;
        this.saveToLocalStore(value, DBkeys.THEME);
    }
    get theme() {
        if (this._theme != null)
            return this._theme;
        return ConfigurationService_1.defaultTheme;
    }
    set showDashboardStatistics(value) {
        this._showDashboardStatistics = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
    }
    get showDashboardStatistics() {
        if (this._showDashboardStatistics != null)
            return this._showDashboardStatistics;
        return ConfigurationService_1.defaultShowDashboardStatistics;
    }
    set showDashboardNotifications(value) {
        this._showDashboardNotifications = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }
    get showDashboardNotifications() {
        if (this._showDashboardNotifications != null)
            return this._showDashboardNotifications;
        return ConfigurationService_1.defaultShowDashboardNotifications;
    }
    set showDashboardTodo(value) {
        this._showDashboardTodo = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
    }
    get showDashboardTodo() {
        if (this._showDashboardTodo != null)
            return this._showDashboardTodo;
        return ConfigurationService_1.defaultShowDashboardTodo;
    }
    set showDashboardBanner(value) {
        this._showDashboardBanner = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
    }
    get showDashboardBanner() {
        if (this._showDashboardBanner != null)
            return this._showDashboardBanner;
        return ConfigurationService_1.defaultShowDashboardBanner;
    }
};
ConfigurationService.appVersion = "1.0.0";
//***Specify default configurations here***
ConfigurationService.defaultLanguage = "en";
ConfigurationService.defaultHomeUrl = "/";
ConfigurationService.defaultTheme = "Default";
ConfigurationService.defaultShowDashboardStatistics = true;
ConfigurationService.defaultShowDashboardNotifications = true;
ConfigurationService.defaultShowDashboardTodo = false;
ConfigurationService.defaultShowDashboardBanner = true;
ConfigurationService = ConfigurationService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LocalStoreManager, AppTranslationService])
], ConfigurationService);
export { ConfigurationService };
var ConfigurationService_1;
//# sourceMappingURL=configuration.service.js.map