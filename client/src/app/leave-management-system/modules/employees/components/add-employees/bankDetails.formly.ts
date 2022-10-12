import { FormlyFieldConfig } from "@ngx-formly/core";

export const bankInfoFormlyFields: FormlyFieldConfig[] = [
    {
        fieldGroupClassName: "grid",
        fieldGroup: [
            {
                className: " col-6",
                key: "bankName",
                type: "input",
                templateOptions: {
                    label: "Bank Name",
                    type: "text",
                    required: true,
                },
            },
            {
                className: " col-6",
                key: "branchName",
                type: "input",
                templateOptions: {
                    label: "Branch Name",
                    type: "text",
                    required: true,
                },
            },
        ]
    },

{
    fieldGroupClassName: "grid",
    fieldGroup: [
        {
            className: "col-12",
            key: "bankAccNumber",
            type: "input",
            templateOptions: {
                label: "Account Number",
                type: "number",
                required: true,
            },

        },
        {
            className: "col-6",
            key: "bankCode",
            type: "input",
            templateOptions: {
                label: "Bank Code",
                type: "string",
                required: true,
            },

        },
        {
            className: "col-6",
            key: "swiftCode",
            type: "input",
            templateOptions: {
                label: "Swift Code",
                type: "string",
            },
        },

        {
            className: "col-12",
            key: "taxRegNO",
            type: "input",
            templateOptions: {
                label: "Tax Reg No",
                type: "string",
                required: true,
            },
        },
        {
            className: "col-12",
            key: "kraPin",
            type: "input",
            templateOptions: {
                label: "Kra Pin",
                type: "string",
                required: true,
            },
        },
    ],
},
    
]
{
    
}