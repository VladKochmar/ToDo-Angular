import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomePage } from './home-page/home-page';
import { NotFoundPage } from './not-found-page/not-found-page';
import { guestGuard } from './core/auth/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard-page/dashboard-page').then((m) => m.DashboardPage),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
