import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig} from 'primeng/api';
import { Subscription } from 'rxjs';
import { ILeaves } from 'src/app/leave-management-system/models/leavehistory.model'
import { Router } from '@angular/router';
import { LeavesService } from '../../../leaves/services/leaves.service';
import { DashboardsServicesService } from '../../services/dashboards-services.service';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
import { IEmployee } from '../../../employees/models/employeeModel';
import { EmployeesService } from '../../../employees/services/employees.service';
@Component({
  selector: 'app-employee-dashboards',
  templateUrl: './employee-dashboards.component.html',
  styleUrls: ['./employee-dashboards.component.scss'],
  
})
export class EmployeeDashboardsComponent implements OnInit {

ileaves: ILeaves[] = []
IpendingLeaves: ILeaves[] = []
leave:ILeaves

allEmployees:IEmployee[]=[]

id: any

employee:IEmployee;
subscription = new Subscription()


  constructor(
    private primengConfig: PrimeNGConfig,
    private  leaveservice: LeavesService,
    private dashboardservice : DashboardsServicesService,
    private router: Router,
    private breadcrumbService: AppBreadcrumbService,
    private employeeService: EmployeesService,
     
    ) {
     this.breadcrumbService.setItems([
       {label: 'DASHBOARD', routerLink: '/leave/dashboard/employee'},
     ])
     }
  
  

  ngOnInit(): void {
    this.primengConfig.ripple = true;
   
    this.getEmployee()
    this.getUpcomingLeaves()
    this.PendingLeveRequests()
    this.getLeaveSummary()

  
    }




PendingLeveRequests(){

  this.subscription.add(this.leaveservice.pendingLeaveRequests().subscribe(data=>{
    this.IpendingLeaves=data.result
 
  },
   error => console.log(error)
  ))
}


getUpcomingLeaves(){

  this.subscription.add(this.leaveservice.EmployeeApprovedLeaveRequest().subscribe(data=>{
    this.ileaves=data.result
  
  },
   error => console.log(error)
  
  ))


}
getEmployee(){
  this.subscription.add(this.dashboardservice.getEmployee().subscribe(data=>{
    this.employee=data.result
    
  }, error => console.log(error)
  
  ))

}

handleSelect(id) {
  this.router.navigate([`/leave/leaves/details/${id}`]);
  
}

applyleave(){
  this.router.navigate(['/leave/request/apply'])
  console.log('apply leave')
}

getLeaveSummary(){

  this.subscription.add(this.leaveservice.getLeaveSummary().subscribe((data)=>{
      this.leave=data.result

      console.log(this.leave)
  }))
}




viewPayslip(payslip_id) {
  this.router.navigate([`/payroll/all/payslips/${payslip_id}/details`])
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
   
   
  }))
}
   
  }


