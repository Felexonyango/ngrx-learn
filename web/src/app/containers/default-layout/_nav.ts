import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  
  },
  {
    name: 'Leave',
    iconComponent: { name: ' cil-Save'},
    children:[
      {
        name: 'Apply Leave',
        url: 'leave/apply-leave',
    },
    {
      name:'leave history',
      url:'leave/leave-history',
    }
    
  ]
  
  },
  {
    name: 'Employees',
    iconComponent: { name: 'cil-speedometer' },
    children:[
      {
        name: 'Create Employee',
        url: 'employees/create',
      },
      {
        name: 'All Employees',
        url: 'employees/all-employees',
      }
    ]
    
  
  },
  {
    name:'settings',
    iconComponent: { name: 'cil-settings' },
    url: 'leave/leave-setting'
  }



 
  
];
