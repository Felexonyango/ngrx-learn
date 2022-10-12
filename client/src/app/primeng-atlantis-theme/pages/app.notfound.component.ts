import { Component } from '@angular/core';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-notfound',
  templateUrl: './app.notfound.component.html',
})
export class AppNotfoundComponent {


    constructor(public app: AppComponent, public utilService: UtilService) {}
}
