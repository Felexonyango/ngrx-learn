import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  },

  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
