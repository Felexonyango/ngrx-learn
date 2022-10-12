import { Roles } from "src/user/models/user.schema";

export const defaultMenuData = [
    {
        label: 'DASHBOARD',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/leave/dashboard/admin'],
        role:[Roles.SUPERVISOR,Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN],
        items: [
          {
            label: 'My Dashboard',
            routerLink: ['/leave/dashboard/employee'],
            role:[Roles.SUPERVISOR,Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN]
          },
          {
            label: 'Admin',
            routerLink: ['/leave/dashboard/admin'],
            role:[Roles.SUPERVISOR,Roles.HUMANRESOURCE, Roles.USERADMIN]
          },
        ],
      },
      {
        label: 'LEAVE',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/leave/request/history'],
        role:[Roles.SUPERVISOR,Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN, Roles.DEPARTMENTHEAD],
        items: [
          {
            label: 'Apply Leave',
            routerLink: ['/leave/leaves/apply'],
            role:[Roles.SUPERVISOR,Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN, Roles.DEPARTMENTHEAD]
          },
          {
            label: 'My Leaves',
            routerLink: ['/leave/request/history'],
            role:[Roles.USER, Roles.DEPARTMENTHEAD, Roles.HUMANRESOURCE, Roles.SUPERVISOR, Roles.USERADMIN],
          },
          {
            label: 'Employee Leaves',
            routerLink: ['/leave/request/all-leaverequest'],
            role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.DEPARTMENTHEAD],
          },
          {
            label: 'All leave history',
            routerLink: ['/leave/request/admin/leavehistory'],
            role:['SUPERVISOR'],
           },
         
        ],
      },
      {
        label: 'EMPLOYEES',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/leave/dashboard/employee'],
        role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN],
        items: [
          {
            label: 'Add New Employee',
            routerLink: ['/leave/employees/add'],
            role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN]
          },
          {
            label: 'All Employees',
            routerLink: ['/leave/employees/all'],
            role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN]
          },
        ],
      },
   
      {
        label: 'SETTINGS',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/leave/request/settings'],
        role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE],
        items: [
          {
            label: 'Leave settings',
            routerLink: ['/leave/request/settings'],
            role:[Roles.SUPERVISOR, Roles.HUMANRESOURCE]
          },
      
        ],
      }
]