import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxEchartsModule } from 'ngx-echarts';
 import { StoreModule } from '@ngrx/store';
import { AuthModule } from './modules/auth/auth.module';
import { reducers } from './store/state/appState';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/authEffects';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    DashboardModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      AuthEffects
    
    ]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
