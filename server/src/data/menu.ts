import { Menu, Role } from "../types";

 const MenuData:Menu[] = [
  {
    name: 'Dashboard',
    url: 'dashboard/admin-dashboard',
    role: [Role.Admin]
  },
    {
        name: 'Dashboard',
        url: 'dashboard/employee-dashboard',
        role: [Role.User]
        
      },
   
    
      {
        name: 'Apply Leave',
        url: 'leave/apply-leave',
        role: [Role.Admin,Role.User]
      },
      {
        name: 'Leave history',
        url: 'leave/request/history',
        role: [Role.User]
      },
    
      {
        name: 'All leave history',
        url: 'leave/all-request/history',
        role: [Role.Admin]
      },
    
      {
        name: 'Create Employee',
        url: 'employees/create',
        role: [Role.Admin]
      },
      {
        name: 'All Employees',
        url: 'employees/all-employees',
        role: [Role.Admin]
      },
    
      {
        name: 'Settings',
        url: 'leave/leave-setting',
        role: [Role.Admin]
      },
]

export  default MenuData