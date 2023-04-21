import { FormlyFieldConfig } from '@ngx-formly/core';

export const applyLeaveFormlyFields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'grid',
    fieldGroup: [
      {
        key: 'leavetype',
        type: 'select',
        props: {
          type: 'select',
          label: 'Type of Leave',
          placeholder: 'Type of Leave',
          valueProp: '_id',
          labelProp: 'leavetype',
          required: true,
        },
      },
    ],
  },

  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col-6',
        key: 'startDate',
        type: 'input',
        templateOptions: {
          label: 'Start Date',
          type: 'date',
          datepickerOptions: {
            min: '',
          },
          required: true,
        },
      },
      {
        className: 'col-6',
        key: 'endDate',
        type: 'input',
        templateOptions: {
          label: 'End Date',
          type: 'date',
          required: true,
        },
      },
    ],
  },
  {
    className:'col-12',
    key: "comment",
    type: "textarea",
    templateOptions: {
        placeholder: "Comment",
        type: "text",
        label: "Comment",
        required: true,
        rows: 5,
    },
},

];
