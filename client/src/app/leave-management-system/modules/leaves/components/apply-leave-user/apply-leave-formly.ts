import { FormlyFieldConfig } from "@ngx-formly/core";

export const applyLeaveFormlyFields: FormlyFieldConfig[] =[ 
        {
            fieldGroupClassName: "grid",
            fieldGroup: [
                {
                    className: "col-6",
                    key: "typeOfLeave",
                    type: "select",
                    templateOptions: {
                        type: "select",
                        label: "Type of Leave",
                        placeholder: "Type of Leave",
                       
                    valueProp: '_id',
                    labelProp: 'leaveType',

                        required: true,
                    },
                },
                {
                    className: "col-6",
                    key: "modeOfleave",
                    type: "select",
                    templateOptions: {
                        type: "select",
                        label: "Mode of Leave",
                        placeholder: "Mode of Leave",
                        options: [
                            { label: "FULL", value: "FULL" },
                            { label: "PARTIAL", value: "PARTIAL" },
                        ],
                        required: true,
                    },
                },
            ],
        },
        {   
            className: "col-12",
            key: "requested",
            type: "input",
            templateOptions: {
                label: "Number of Leave Days",
                type: "number",
                placeholder: "Enter number of leave days you need",

                required: true,
            },

        },

        // {
        //     fieldGroupClassName: "grid",
        //     fieldGroup: [
        //         {
        //             className: " col-6",
        //             key: "startDate",
        //             type: "input",
        //             templateOptions: {
        //                 label: "Start Date",
        //                 type: "date",
        //                 datepickerOptions: {
        //                     min: '',
        //                 },
        //                 required: true,
        //             },
        //         },
        //         {
        //             className: " col-6",
        //             key: "endDate",
        //             type: "input",
        //             templateOptions: {
        //                 label: "End Date",
        //                 type: "date",
        //                 required: true,
        //             },
        //         },
        //     ],
        // },

        {
            className: "col-12",
            key: "comment",
            type: "input",
            templateOptions: {
                label: "Comments",
                type: "text",
                placeholder: "comment",

                required: true,
            },
        },
    
]