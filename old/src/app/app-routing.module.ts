import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {AppNotfoundComponent} from './primeng-atlantis-theme/pages/app.notfound.component'
import {AppErrorComponent} from './primeng-atlantis-theme/pages/app.error.component'
import {AppAccessdeniedComponent} from './primeng-atlantis-theme/pages/app.accessdenied.component'
import {AppLoginComponent} from './primeng-atlantis-theme/pages/app.login.component'
import {AppMainComponent} from './primeng-atlantis-theme/app-main-layout/app.main.component'
import {AuthGuard} from './common/modules/authentication/guard/auth.guard'
import {VerifyAccountComponent} from './common/modules/authentication/components/verify-account/verify-account.component'
import {ReverseGuard} from './common/modules/authentication/guard/reverse.guard'
import {LeavesModule} from './leave-management-system/modules/leaves/leaves.module'

@NgModule({
  imports: [
    LeavesModule,

    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'leave',
          pathMatch: 'full',
        },
        {
          path: 'auth',
          // canActivate: [ReverseGuard],
          loadChildren: () =>
            import(
              './common/modules/authentication/authentication.module'
            ).then((m) => m.AuthenticationModule),
        },
        {
          path: 'leave',
          component: AppMainComponent,
          canActivate: [AuthGuard],

          children: [
            {
              path: '',
              redirectTo: 'dashboard',
              pathMatch: 'full',
            },
            {
              path: 'dashboard',
              loadChildren: () =>
                import(
                  './leave-management-system/modules/dashboards/dashboards.module'
                ).then((m) => m.DashboardModule),
            },
            {
              path: 'employees',
              loadChildren: () =>
                import(
                  './leave-management-system/modules/employees/employees.module'
                ).then((m) => m.EmployeesModule),
            },
            {
              path: 'leaves',
              loadChildren: () =>
                import(
                  './leave-management-system/modules/leaves/leaves.module'
                ).then((m) => m.LeavesModule),
            },

            {
              path: 'shared',
              loadChildren: () =>
                import('./common/modules/shared/shared.module').then(
                  (m) => m.SharedModule
                ),
              canActivate: [AuthGuard],
            },
            {
              path: 'request',
              loadChildren: () =>
                import(
                  './leave-management-system/modules/leaves/leaves.module'
                ).then((m) => m.LeavesModule),
            },
          ],
        },

        {path: 'error', component: AppErrorComponent},
        {path: 'access', component: AppAccessdeniedComponent},
        {path: 'notfound', component: AppNotfoundComponent},
        {path: 'verify-account', component: VerifyAccountComponent},
        {path: 'login', component: AppLoginComponent},

        {path: '**', redirectTo: '/notfound'},
      ],
      {scrollPositionRestoration: 'enabled'}
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
