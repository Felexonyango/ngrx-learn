import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth/auth.guard';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },

    canActivate: [AuthGuard],

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule)
      },
    ],
  },

  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
