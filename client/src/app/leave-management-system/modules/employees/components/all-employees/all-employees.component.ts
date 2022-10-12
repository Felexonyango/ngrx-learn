import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';


import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
import { DashboardsServicesService } from '../../../dashboards/services/dashboards-services.service';
import { IEmployee } from '../../models/employeeModel';
import { EmployeesService } from '../../services/employees.service';

// import { IEmployee } from 'src/app/payroll-system/models/employee.model';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
  subscription = new Subscription();
  allEmployees:IEmployee[]=[]
  employee:IEmployee
  name= "";
  modal: boolean;
  status: boolean;
  display:boolean
  employees:[]

  constructor(
    private employeeService: EmployeesService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbService: AppBreadcrumbService
    ) {
      this.breadcrumbService.setItems([
        {label: 'ALL EMPLOYEES', routerLink: '/leave/employees/all'},
      ])
    }

  ngOnInit(): void {
    this.getAllEmployees();
    
  }
  getAllEmployees(){
    this.subscription.add(this.employeeService.getAllEmployees().subscribe((res)=>{
      this.allEmployees=res.result
      console.log(this.allEmployees)
      for (let index = 0; index < this.allEmployees.length; index++) {
        const element = this.allEmployees[index];
        if(element.status){
          element.status="In Office"
        }
        else{
          element.status ="On Leave"
        }      
      }
      // for (let index = 0; index < this.allEmployees.length; index++) {
      //   const element = this.allEmployees[index];
      //   this.name = element.firstName.concat(element.lastName)
      // }
      
    }))
  }

 
  viewEmployee(id: any) {
    this.router.navigate([`/leave/employees/details/${id}`]);
}
addNew() {
 
  this.router.navigate(['/leave/employees/add'])
}
deleteEmployee(id:string){

  this.subscription.add(
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res)=>{
        this.allEmployees = this.allEmployees.filter((employee)=>employee._id !==id)
        this.display=false
        console.log(this.allEmployees)
      },
      error(err){

      }
    })
  )

}
deleteEmployeeDialog() {
  this.display = true;
}
cancelDeleteEmployeeDialogue(){
  this.display=false
}

getEmployeeId(employeeId:string){
  this.subscription.add(this.employeeService.getEmployeeByID(employeeId).subscribe((data)=>{
    this.employee=data.result
    this.router.navigate([`/leave/employees/add/${employeeId}`])
  }))


}



}
