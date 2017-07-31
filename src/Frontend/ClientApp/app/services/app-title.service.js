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
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { Utilities } from './utilities';
let AppTitleService = class AppTitleService {
    constructor(titleService, router) {
        this.titleService = titleService;
        this.router = router;
        this.sub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(_ => this.router.routerState.root)
            .map(route => {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .flatMap(route => route.data)
            .subscribe(data => {
            let title = data['title'];
            if (title) {
                let fragment = this.router.url.split('#')[1];
                if (fragment)
                    title += " | " + Utilities.toTitleCase(fragment);
            }
            if (title && this.appName)
                title += ' - ' + this.appName;
            else if (this.appName)
                title = this.appName;
            if (title)
                this.titleService.setTitle(title);
        });
    }
};
AppTitleService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Title, Router])
], AppTitleService);
export { AppTitleService };
//# sourceMappingURL=app-title.service.js.map