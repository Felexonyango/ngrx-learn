import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Imenu } from 'src/app/model/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  subscription = new Subscription()

  foundMenuItems:Imenu[]=[];
  
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    private auth:AuthService,
   

  ) {}
  ngOnInit(): void {
   this.getMenus()
    

  }

  getMenus(){
    const userRoles = this.auth.getRole();
    this.subscription.add(
      this.auth.GetAllMenus().subscribe({
        next:(res)=>{
          this.foundMenuItems = res.result.filter((x)=> x.role.some((r)=>userRoles.includes(r)));
        }
      })
    );
  }

}
