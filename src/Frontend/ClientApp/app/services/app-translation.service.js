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
var core_2 = require("@ngx-translate/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
var AppTranslationService = (function () {
    function AppTranslationService(translate) {
        this.translate = translate;
        this._languageChanged = new Subject_1.Subject();
        this.defaultLanguage = "en";
        this.setDefaultLanguage(this.defaultLanguage);
    }
    AppTranslationService.prototype.addLanguages = function (lang) {
        this.translate.addLangs(lang);
    };
    AppTranslationService.prototype.setDefaultLanguage = function (lang) {
        this.translate.setDefaultLang(lang);
    };
    AppTranslationService.prototype.getDefaultLanguage = function () {
        return this.translate.defaultLang;
    };
    AppTranslationService.prototype.getBrowserLanguage = function () {
        return this.translate.getBrowserLang();
    };
    AppTranslationService.prototype.useBrowserLanguage = function () {
        var browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    };
    AppTranslationService.prototype.changeLanguage = function (language) {
        var _this = this;
        if (language === void 0) { language = "en"; }
        if (!language)
            language = this.translate.defaultLang;
        if (language != this.translate.currentLang) {
            setTimeout(function () {
                _this.translate.use(language);
                _this._languageChanged.next(language);
            });
        }
        return language;
    };
    AppTranslationService.prototype.getTranslation = function (key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    };
    AppTranslationService.prototype.getTranslationAsync = function (key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    };
    AppTranslationService.prototype.languageChangedEvent = function () {
        return this._languageChanged.asObservable();
    };
    return AppTranslationService;
}());
AppTranslationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_2.TranslateService])
], AppTranslationService);
exports.AppTranslationService = AppTranslationService;
var TranslateLanguageLoader = (function () {
    function TranslateLanguageLoader() {
    }
    /**
     * Gets the translations from webpack
     * @param lang
     * @returns {any}
     */
    TranslateLanguageLoader.prototype.getTranslation = function (lang) {
        //Note Dynamic require(variable) will not work. Require is always at compile time
        switch (lang) {
            case "en":
                return Observable_1.Observable.of(require("../assets/locale/en.json"));
            //case "fr":
            //    return Observable.of(require("../assets/locale/fr.json"));
            //case "ko":
            //    return Observable.of(require("../assets/locale/ko.json"));
            default:
        }
    };
    return TranslateLanguageLoader;
}());
exports.TranslateLanguageLoader = TranslateLanguageLoader;
//# sourceMappingURL=app-translation.service.js.map