import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { ILeaves, INote} from "src/app/leave-management-system/models/leavehistory.model";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
// import { IEmployee } from "src/app/leave-management-system/models/employee.model";
import { LeavesService } from "../../services/leaves.service";
import { DashboardsServicesService } from "src/app/leave-management-system/modules/dashboards/services/dashboards-services.service";
import { AppBreadcrumbService } from "src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service";
import { IEmployee } from "../../../employees/models/employeeModel";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: "app-leaverequest-details",
    templateUrl: "./leaverequest-details.component.html",
    styleUrls: ["./leaverequest-details.component.scss"],
})
export class LeaverequestDetailsComponent implements OnInit {
  
ileave:ILeaves
employee:IEmployee
description:string
leave:ILeaves
leaveNote:INote[]
imageToShow :any
    subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private leaveService: LeavesService,
        private dashboardservice:DashboardsServicesService,
        private router: Router,
        private breadcrumbService: AppBreadcrumbService,
        private primengConfig: PrimeNGConfig,
        private sanitizer: DomSanitizer
    ) {
      this.breadcrumbService.setItems([
        {label: 'LEAVE REQUEST DETAILS', routerLink: '/leave/leaves/details/:ID'},
      ])
    }

    ngOnInit(): void {
       
        this.primengConfig.ripple = true;
     
         this.getParams()
         this.getEmployee()
         this.getLeaveSummary()
         this.getProfilePicture()

      
        
    }



  

    EditRequest(leaveId:string) {
        this.router.navigate([`/leave/request/details/${leaveId}/edit`]);
    }

    getParams() {
     
        let LeaveID = this.route.snapshot.paramMap.get("ID");
   
        this.getLeaveDetails(LeaveID)
      }

      getLeaveDetails(ID:any){

        this.subscription.add(this.leaveService.getLeaveRequestDetail(ID).subscribe((data) => {
            this.ileave = data.result;
           
            this.getleaveNote()
            
          
        }, error => console.log(error)
        ));

      }

        getEmployee(){
            this.subscription.add(this.dashboardservice.getEmployee().subscribe(data=>{
              this.employee=data.result
              
            }, error => console.log(error)
            ))
          
          }

   
        
          getLeaveSummary(){

            this.subscription.add(this.leaveService.getLeaveSummary().subscribe((data)=>{
                this.leave=data.result
          
    
            }))
          }
          getleaveNote(){
           
            this.subscription.add(this.leaveService.getNote(this.ileave._id).subscribe((data)=>{
              this.leaveNote =data.result
              console.log(this.leaveNote)
        
  
          }))
           
          }
          getProfilePicture(){
            this.subscription.add(this.leaveService.getProfileImage().subscribe({
              next: (res) => {
                this.createImageFromBlob(res);
              }
            }))
          
          }
          
          createImageFromBlob(image: Blob) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
               this.imageToShow = reader.result;
            }, false);
          
            if (image) {
               reader.readAsDataURL(image);
            }
          }
          getSantizeUrl(image) {
            return this.sanitizer.bypassSecurityTrustUrl(image);
          }

    }

 


