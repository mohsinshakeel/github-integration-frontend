import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'github/view', pathMatch: 'full' },
  {
    path: 'github',
    children: [
      {
        path: 'connect',
        loadComponent: () => import('./github/connect/connect.component').then(m => m.ConnectComponent)
      },
      {
        path: 'view',
        loadComponent: () => import('./github/grid-view/grid-view.component').then(m => m.GridViewComponent)
      },
      {
        path: 'callback',
        loadComponent: () => import('./github/callback/callback.component').then(m => m.CallbackComponent)
      }
    ]
  },
  // Add the auth/callback route
  {
    path: 'auth/callback',
    loadComponent: () => import('./github/callback/callback.component').then(m => m.CallbackComponent)
  }
];

