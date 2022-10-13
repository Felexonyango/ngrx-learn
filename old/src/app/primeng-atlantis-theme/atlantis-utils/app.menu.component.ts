import {Component, OnInit} from '@angular/core'
import {JwtHelperService} from '@auth0/angular-jwt'
import {Subscription} from 'rxjs'
import {AppComponent} from 'src/app/app.component'
import {userRoleArray} from 'src/app/leave-management-system/models/user.model'
import {EmployeesService} from 'src/app/leave-management-system/modules/employees/services/employees.service'
import {AuthService} from 'src/app/leave-management-system/services/auth/auth.service'
import {projectConstants} from 'src/app/project-constants/project.constants'
import {AppMainComponent} from '../app-main-layout/app.main.component'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  public model: any
  projectConstants = projectConstants
  subscription = new Subscription()
  TOKEN_KEY = 'access_token'

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private authService: AuthService,
    private employeeService: EmployeesService,
    private tokenDecoder: JwtHelperService
  ) {}

  ngOnInit() {
    this.getMenu()
  }
  getMenu() {
    this.subscription.add(
      this.employeeService.getMenu().subscribe((res) => {
        this.model = res
      })
    )
  }

  getRole() {
    let token = localStorage.getItem(this.TOKEN_KEY)

    this.decodedToken(token)
  }
  decodedToken(token): any {
    const userToken = token ? this.tokenDecoder.decodeToken(token) : {}
    let userRole = userToken.role
    let rolesArray = []

    for (let index = 0; index < this.model.length; index++) {
      const element = this.model[index]
      if (this.checkIfValueIsInAnotherArray(element.role, userRole)) {
        rolesArray.push(
          element.items.filter((x) => {
            return this.checkIfValueIsInAnotherArray(x.role, userRole)
          })
        )
        // element.items.role=rolesArray
        // element.role = rolesArray
        this.model = rolesArray
      }
    }
  }

  checkIfValueIsInAnotherArray(menuRoles, userRoles) {
    for (let index = 0; index < menuRoles.length; index++) {
      const element = menuRoles[index]
      if (userRoles.includes(element)) {
        return true
      }
    }
    return false
  }
}
