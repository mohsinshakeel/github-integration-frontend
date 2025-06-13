import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'connect',
    loadComponent: () => import('./connect/connect.component').then(c => c.ConnectComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('./callback/callback.component').then(c => c.GitHubCallbackComponent)
  },
  {
    path: 'view',
    loadComponent: () => import('./view/view.component').then(c => c.ViewComponent)
  },
  {
    path: '',
    redirectTo: 'connect',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitHubRoutingModule { }
