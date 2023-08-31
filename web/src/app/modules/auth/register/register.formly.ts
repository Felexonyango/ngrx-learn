import { FormlyFieldConfig } from "@ngx-formly/core";

export const registerFormlyFields: FormlyFieldConfig[] = [


    {
        fieldGroupClassName: 'flex',
        fieldGroup: [
            {
                className: "col-8",
                key: "firstname",
                type: "input",
                templateOptions: {
                    label: "First Name",
                    placeholder:'Enter First Name',
                    required: true,
                },

            },
            {
                className: "col-8",
                key: "lastname",
                type: "input",
                templateOptions: {
                    label: "Last Name",
                    placeholder:'Enter Last Name',
                    required: true,
                },

            },
            {
                className: "col-8",
                key: "email",
                type: "input",
                templateOptions: {
                    label: "Email",
                    placeholder:'Enter Email',
                    required: true,
                },

            },
            {
                className: "col-8",
                key: "password",
                type: "input",
                templateOptions: {
                    type:"password",

                    label: "Password",
                    placeholder:"Enter password",
                    required: true,
                },

            },
        ]

        }
    


];
