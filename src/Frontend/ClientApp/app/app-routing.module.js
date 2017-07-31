var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
//import { HomeComponent } from "./components/home/home.component";
//import { CustomersComponent } from "./components/customers/customers.component";
//import { ProductsComponent } from "./components/products/products.component";
//import { OrdersComponent } from "./components/orders/orders.component";
//import { SettingsComponent } from "./components/settings/settings.component";
//import { AboutComponent } from "./components/about/about.component";
//import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot([
                //{ path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
                { path: "login", component: LoginComponent, data: { title: "Login" } },
                //{ path: "customers", component: CustomersComponent, canActivate: [AuthGuard], data: { title: "Customers" } },
                //{ path: "products", component: ProductsComponent, canActivate: [AuthGuard], data: { title: "Products" } },
                //{ path: "orders", component: OrdersComponent, canActivate: [AuthGuard], data: { title: "Orders" } },
                //{ path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
                //{ path: "about", component: AboutComponent, data: { title: "About Us" } },
                { path: "home", redirectTo: "/", pathMatch: "full" },
            ])
        ],
        exports: [
            RouterModule
        ],
        providers: [
            AuthService, AuthGuard
        ]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map