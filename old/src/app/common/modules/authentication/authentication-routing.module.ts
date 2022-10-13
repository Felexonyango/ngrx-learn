import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'login/invites/:email',
    component: LoginComponent,

  },
  {
    path: 'loginWithGoogle/:access_Token',
    component: LoginGoogleComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register/invites/:email',
    component: RegisterComponent,
  },
  {
    path: 'resetPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
