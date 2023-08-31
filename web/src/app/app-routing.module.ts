import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReverseGuard} from '../app/modules/auth/guard/reverse-guard/reverse.guard'
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';
import { AuthGuard } from './modules/auth/guard/auth-guard/auth.guard';

const routes: Routes = [
{
  path:'',
  redirectTo:'app',
  pathMatch:'full'
},

{
  path: 'auth',
  canActivate: [ReverseGuard],
  loadChildren: () =>
    import('./modules/auth/auth.module').then((m) => m.AuthModule),
  
},
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },


  {
  path:'app',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    children: [
   
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },

      {
        path: 'employees',
        loadChildren: () =>
          import('./modules/Employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./modules/leave/leave.module').then((m) => m.LeaveModule),
      },

      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
