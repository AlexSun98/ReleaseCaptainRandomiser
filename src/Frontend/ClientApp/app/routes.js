import { AuthGuard } from './modules/auth/services/auth-guard.service';
import { NotFoundPageComponent } from './modules/core/containers/not-found-page';
export const routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    {
        path: 'books',
        loadChildren: './modules/books/books.module#BooksModule',
        canActivate: [AuthGuard],
    },
    { path: '**', component: NotFoundPageComponent },
];
//# sourceMappingURL=routes.js.map