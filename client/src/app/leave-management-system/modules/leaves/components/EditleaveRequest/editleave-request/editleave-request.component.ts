import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig,FieldType } from '@ngx-formly/core';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';

@Component({
  selector: 'app-editleave-request',
  templateUrl: './editleave-request.component.html',
  styleUrls: ['./editleave-request.component.scss']
})
export class EditleaveRequestComponent implements OnInit {

  

  constructor(
    private breadcrumbService: AppBreadcrumbService
    ) {
      this.breadcrumbService.setItems([
        {label: 'UPDATE LEAVE REQUEST', routerLink: '/leave/leaves/apply/:id'},
      ])
    }

  ngOnInit(): void {
  }

  editLeaveform = new FormGroup({});
  model: any = {};

  options: FormlyFormOptions = {};
  
  fields: FormlyFieldConfig[] = [
    {
  
      fieldGroupClassName: 'grid',
        fieldGroup: [
    
          {
            className: 'col-6',
            key: "typeofleave",
            type: "select",
            templateOptions: {
              type: 'select',
              label: 'Type of Leave',
              placeholder: 'Type of Leave',
              options: [
                {label: 'Casual Leave', value: 'Casual Leave'},
                {label: 'Emergency Leave' , value: 'Emergency Leave'},
                {label: 'Sick Leave', value: 'Sick Leave'},
               
              ],
                required: true,
            },
        },
        {
          className: 'col-6',
          key: "modeofleave",
          type: "select",
          templateOptions: {
            type: 'select',
            label: 'Mode of Leave',
            placeholder: 'Mode of Leave',
            options: [
              {label: 'Full Leave',value:'Full Leave'},
              {label: 'Partial Leave',value: 'Partial Leave'},
            ],
              required: true,
          },
      }
    
        ]
    },
    
          {
            className:'col-6',
            key: "Department",
            type: "select",
            templateOptions: {
              type: 'select',
              label: 'Department',
              placeholder: 'Department',
              options: [
                {label: 'HR', value: 'HR'},
                {label: 'Software Engineering' , value: 'Software Engineering'},
                {label: 'Microsoft Department ', value: 'Microsoft Department'},
               
               
              ],
                required: true,
            },
        },
        
  {
  
    fieldGroupClassName: 'grid',
      fieldGroup: [
  
        {
          className: " col-6",
          key: "start",
          type: "input",
          templateOptions: {
              label: "Start Date",
              type: "date",
              required: true,
          },
        },
      {
        className: " col-6",
        key: "end",
        type: "input",
        templateOptions: {
            label: "End Date",
            type: "date",
            required: true,
        },
      },
  
      ]
  },
  
  
  
  {
    className:'col-12',
    key: "comment",
    type: "input",
    templateOptions: {
      label: 'Comments',
      type: 'text',
        placeholder: "comment",

        required: true,
    },
  },
  
  
  ]
  

UpdateLeaveForm(){
  console.log(this.editLeaveform.value);
  this.editLeaveform.reset()

}


}
