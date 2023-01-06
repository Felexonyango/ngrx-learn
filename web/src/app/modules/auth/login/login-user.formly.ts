import { FormlyFieldConfig } from "@ngx-formly/core";

export const loginFormlyFields: FormlyFieldConfig[] = [


    {
        fieldGroupClassName: 'flex',
        fieldGroup: [
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
                    label: "Password",
                    placeholder:"Enter password",
                    required: true,
                },

            },
        ]

        }
    


];
