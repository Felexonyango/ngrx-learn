import { Component } from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    constructor(public app: AppComponent) {}
}
