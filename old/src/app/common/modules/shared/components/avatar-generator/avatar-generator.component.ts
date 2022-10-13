import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/leave-management-system/modules/employees/models/employeeModel';
import { EmployeesService } from 'src/app/leave-management-system/modules/employees/services/employees.service';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';
@Component({
  selector: 'app-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.scss'],
})
export class AvatarGeneratorComponent implements OnInit, OnChanges {
  @Input()
  public photoUrl: string;

  // @Input()
  // public firstName: string;

  // @Input()
  // public lastName: string;

  @Input()
  public name: string;

  @Input()
  public circleSize: string;

  @Input()
  public initialsSize: string;

  @Input()
  public circleColor: string;

  @Input()
  public showName = false;

  public showInitials = false;
 initials: string;
  subscription = new Subscription;
  employee: IEmployee
  


  constructor(public utilService: UtilService,
    private employeesService:EmployeesService,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    console.log("testin component")
    this.getParams()
    if (!this.photoUrl) {
      this.showInitials = true;

      // this.createInitials();
      this.profilePictureInitials();
    }

  }
  ngOnChanges(): void {
    if (!this.photoUrl) {
      this.showInitials = true;
      // this.createInitials();
      this.profilePictureInitials()
    }
  }

  // private createInitials(): void {
  //   this.initials = this.utilService.createInitials(this.name);

  // }
  
  getParams() {
    let employeeID = this.activatedRoute.snapshot.paramMap.get('ID')
    console.log(employeeID)

    this.getEmployeeDetails(employeeID)
  }
  getEmployeeDetails(ID: string) {
    this.subscription.add(
      this.employeesService.getEmployeeByID(ID).subscribe({
        next: (data: any) => {
          this.employee = data.result
          console.log(this.employee)
          console.log(this.employee.lastName)
          this.profilePictureInitials()
        },
        
      })
    )
  }
  private profilePictureInitials(){
    this.initials=this.utilService.profilePictureInitials(this.employee.firstName, this.employee.lastName)
    console.log(this.initials)
//   generateRandomColor() {
//     var randomColor = Math.floor(Math.random()*16777215).toString(16);
//     return '#' + randomColor

  }
}
