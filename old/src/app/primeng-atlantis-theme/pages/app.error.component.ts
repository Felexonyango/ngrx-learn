import { Component } from '@angular/core';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-error',
  templateUrl: './app.error.component.html',
})
export class AppErrorComponent {
 

    constructor(public app: AppComponent) {}
}
