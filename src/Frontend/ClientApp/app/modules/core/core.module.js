var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { GoogleBooksService } from './services/google-books';
export const COMPONENTS = [
    AppComponent,
    NotFoundPageComponent,
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
];
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule_1,
            providers: [GoogleBooksService],
        };
    }
};
CoreModule = CoreModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule, MaterialModule],
        declarations: COMPONENTS,
        exports: COMPONENTS,
    })
], CoreModule);
export { CoreModule };
var CoreModule_1;
//# sourceMappingURL=core.module.js.map