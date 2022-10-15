import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from 'src/app/pages/auth/containers';
import { AuthGuard } from 'src/app/pages/auth/guards';
import { YearPipe } from 'src/app/pages/auth/pipes';
import { LoginFormComponent, SignFormComponent } from './components';

@NgModule({
  declarations: [
    AuthPageComponent,
    YearPipe,
    LoginFormComponent,
    SignFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
   
   
  ],
  providers: [
   
    AuthGuard
  ]
})
export class AuthModule { }
