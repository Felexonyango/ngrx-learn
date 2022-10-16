import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogOut } from 'src/app/store/actions/auth.action';
import { AppState } from 'src/app/store/state/appState';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {


  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;


  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private store: Store<AppState>
    ) {
      
    super(
      
    );
  }
  
  ngOnInit() {
   
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
