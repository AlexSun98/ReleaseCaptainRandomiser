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
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
let AppTranslationService = class AppTranslationService {
    constructor(translate) {
        this.translate = translate;
        this._languageChanged = new Subject();
        this.defaultLanguage = "en";
        this.setDefaultLanguage(this.defaultLanguage);
    }
    addLanguages(lang) {
        this.translate.addLangs(lang);
    }
    setDefaultLanguage(lang) {
        this.translate.setDefaultLang(lang);
    }
    getDefaultLanguage() {
        return this.translate.defaultLang;
    }
    getBrowserLanguage() {
        return this.translate.getBrowserLang();
    }
    useBrowserLanguage() {
        let browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    }
    changeLanguage(language = "en") {
        if (!language)
            language = this.translate.defaultLang;
        if (language != this.translate.currentLang) {
            setTimeout(() => {
                this.translate.use(language);
                this._languageChanged.next(language);
            });
        }
        return language;
    }
    getTranslation(key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    }
    getTranslationAsync(key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    }
    languageChangedEvent() {
        return this._languageChanged.asObservable();
    }
};
AppTranslationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TranslateService])
], AppTranslationService);
export { AppTranslationService };
export class TranslateLanguageLoader {
    /**
     * Gets the translations from webpack
     * @param lang
     * @returns {any}
     */
    getTranslation(lang) {
        //Note Dynamic require(variable) will not work. Require is always at compile time
        switch (lang) {
            case "en":
                return Observable.of(require("../assets/locale/en.json"));
            //case "fr":
            //    return Observable.of(require("../assets/locale/fr.json"));
            //case "ko":
            //    return Observable.of(require("../assets/locale/ko.json"));
            default:
        }
    }
}
//# sourceMappingURL=app-translation.service.js.map