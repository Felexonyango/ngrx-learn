import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponentComponent } from './register/register-component.component';

const routes: Routes = [
 
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component:RegisterComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
