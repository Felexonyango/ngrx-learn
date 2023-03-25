import { FormlyFieldConfig } from "@ngx-formly/core";

export const createEmployeeFormlyFields: FormlyFieldConfig[] = [


    {
        fieldGroupClassName: 'row',
        fieldGroup: [
            {
                className: "col-6",
                key: "firstname",
                type: "input",
                templateOptions: {
                    label: "First Name",
                    required: true,
                },

            },

            {
                className: "col-6",
                key: "lastname",
                type: "input",
                templateOptions: {
                    label: "Last Name",
                    required: true,
                },
            },
        ],
    },

    {
        fieldGroupClassName: 'row',
        fieldGroup: [
            {
                className: " col-12",
                key: "email",
                type: "input",
                templateOptions: {
                    label: "Email Adress",
                    type: "email",
                    required: true,
                },
            },
            {
                className: " col-12",
                key: "department",
                type: "select",
                 props: {
                    label: "Department",
                    type: "input",
                    valueProp: '_id',
                    labelProp: 'department',

                },
            },
    
            {
                className: " col-12",
                key: "startDate",
                type: "input",
                templateOptions: {
                    label: "Start Date",
                    type: "date",
                    required: true,
                },
            },
            {
                className: "col-12",
                key: "idNumber",
                type: "input",
                templateOptions: {
                    label: "Enter National  Number",
                    type: "number",
                    required: true,
                },

            },
            {
                className: "col-12",
                key: "employeeIdNumber",
                type: "input",
                templateOptions: {
                    label: "Employee ID ",
                    type: "string",
                    required: true,
                },

            },
            {
                className: "col-12",
                key: "phoneNumber",
                type: "input",
                templateOptions: {
                    label: "Phone Number",
                    type: "number",
                    required: true,
                },

            },
            {
                className: " col-12",
                key: "nextOfKin",
                type: "input",
                templateOptions: {
                    label: "Next of kin",
                    type: "input",
                },
            },

         
      
              {
                className: " col-12",
                key: "password",
                type: "input",
                templateOptions: {
                    label: "Password",
                    type: "password",
                    required: true,
                },
            },
          ],
      },
        ]
