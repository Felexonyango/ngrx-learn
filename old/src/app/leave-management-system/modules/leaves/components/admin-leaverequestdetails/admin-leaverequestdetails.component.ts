import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ILeaves, INote } from 'src/app/leave-management-system/models/leavehistory.model';
import { DashboardsServicesService } from '../../../dashboards/services/dashboards-services.service';
import { IEmployee } from '../../../employees/models/employeeModel';
import { LeavesService } from '../../services/leaves.service';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
@Component({
  selector: 'app-admin-leaverequestdetails',
  templateUrl: './admin-leaverequestdetails.component.html',
  styleUrls: ['./admin-leaverequestdetails.component.scss']
})
export class AdminLeaverequestdetailsComponent implements OnInit {


  ileave:ILeaves
  employee:IEmployee
  description:string
  leave:ILeaves
  note:INote
  comment:any
  imageToShow:any

      subscription = new Subscription();
  
      constructor(
          private route: ActivatedRoute,
          private leaveService: LeavesService,
          private router: Router,
          private primengConfig: PrimeNGConfig,
          private sanitizer: DomSanitizer,
          private breadcrumbService: AppBreadcrumbService,
     
          ) {
           this.breadcrumbService.setItems([
             {label: ' LEAVE REQUEST DETAILS', routerLink: '/leave/request/admin/leavedetails/:ID'},
           ])
           }
     
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
    this.getParams()
    this.getLeaveSummary()
  }

  noteForm = new FormGroup({});
  model: any = {};

  options: FormlyFormOptions = {};
  
  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [

        {
          className:'col-12',
          key: "note",
          type: "input",
          templateOptions: {
            label: 'Note',
            type: 'text',
              placeholder :"Add Note",
      
              required: true,
          },
        },
      ]


    }
]
submitNote(){
  this.note =this.noteForm.value
  this.subscription.add(this.leaveService.addNote(this.ileave._id, this.note).subscribe(data=>{
    this.comment=data.result.note
   
  
    
  }))
  this.noteForm.reset()

}

  EditRequest(leaveId) {
    this.router.navigate([`/leave/request/details/${leaveId}/edit`]);
}

getParams() {
 
    let LeaveID = this.route.snapshot.paramMap.get("ID");

    this.getLeaveDetails(LeaveID)
  }

  getLeaveDetails(ID:any){
    this.subscription.add(this.leaveService.getLeaveRequestDetail(ID).subscribe({
      next: (data: any) => {
            this.ileave = data.result
            console.log(this.ileave)
    
          },
          complete: () => {
            this.getProfilePicture()
          
          
          },
    }))

  }

    
      getLeaveSummary(){

        this.subscription.add(this.leaveService.getLeaveSummary().subscribe((data)=>{
            this.leave=data.result
      

        }))
      }
      getProfilePicture(){
        console.log(this.ileave.appliedBy)
        this.subscription.add(this.leaveService.getProfileById(this.ileave.appliedBy._id).subscribe({
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

