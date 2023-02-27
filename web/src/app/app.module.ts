import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {reducers} from './store/state/appState'
import {metaReducers} from './store/reducer/metaReducer'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/Interceptors/Interceptor';
import {LeaveTypeService } from 'src/app/services/leave/leave-type.service'
 import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {DepartmentEFfect} from 'src/app/store/Effects/departmentEffect'

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import {DialogModule} from 'primeng/dialog'
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { StoreModule } from '@ngrx/store';
import {AuthEffects} from './store/Effects/authEffects'
import  {EmployeeEffect } from './store/Effects/employeEffects'
import {LeaveEFfect} from './store/Effects/leaveEffects'
import { HttpClientModule } from '@angular/common/http';
import {LeaveTypeEFfect} from './store/Effects/leaveTypeEFfect'
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import {EmployeeService} from './services/employee/employees.service'
import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterSerializer } from './store/router/custom-serializer';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};


export function tokenGetter() {
  return localStorage.getItem('token');
}

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      AuthEffects,
      EmployeeEffect,
      LeaveTypeEFfect,
      DepartmentEFfect,
      LeaveEFfect
    
    ]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    }),

    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
     NgbModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    EmployeeService,
    LeaveTypeService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
   
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    
  ],
  bootstrap: [AppComponent],
})
export class  AppModule {
}
