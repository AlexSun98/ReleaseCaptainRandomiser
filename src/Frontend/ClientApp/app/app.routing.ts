//import { ModuleWithProviders } from '@angular/core';
//import { Routes, RouterModule } from '@angular/router';
//import { QuizComponent } from './components/quiz.component';
//import { PageNotFoundComponent } from './components/not-found.component';
//import { ScoreComponent } from './components/score.component';
//import { HomeComponent } from './components/home.component';

//const appRoutes: Routes = [
//  { path: '', component: HomeComponent, pathMatch: 'full' },
//  { path: 'score', component: ScoreComponent },
//  { path: ':id', component: QuizComponent },
//];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

//import { Routes } from '@angular/router';
//import { AuthGuard } from './auth/services/auth-guard.service';
//import { NotFoundPageComponent } from './core/containers/not-found-page';

//export const routes: Routes = [
//  { path: '', redirectTo: '/books', pathMatch: 'full' },
//  {
//    path: 'books',
//    loadChildren: './books/books.module#BooksModule',
//    canActivate: [AuthGuard],
//  },
//  { path: '**', component: NotFoundPageComponent },
//];
