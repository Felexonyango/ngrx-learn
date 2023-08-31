import { Menu, Role } from "../types";

const MenuData: Menu[] = [
  {
    name: "Dashboard",
    url: "",
    icon: "fa fa-home",
    role: [Role.Admin,Role.User],
  },
 

  {
    name: "Apply Leave",
    url: "leave/apply-leave",
    role: [Role.Admin,Role.User],
    icon: "fa fa-calendar",
  },
  // {
  //   name: "Leave history",
  //   url: "leave/request/history",
  //   role: [Role.User],
  //   icon: "fa fa-folder",
  // },

  {
    name: "All leave history",
    url: "leave/all-request/history",
    role: [Role.Admin],
    icon: "fa fa-folder-open",
  },

  {
    name: "Create Employee",
    url: "employees/create",
    role: [Role.Admin],
    icon: " fa fa-user",
  },
  {
    name: "All Employees",
    url: "employees/all-employees",
    role: [Role.Admin],
    icon: "fa fa-users",
  },
  {
    name: "Approved Leaves",
    url: "leave/all-approved-leaves",
    role: [Role.Admin],
    icon: "fa fa-folder-o ",
  },

  {
    name: "Settings",
    url: "leave/leave-setting",
    role: [Role.Admin],
    icon: "fa fa-cog",
  },
];

export default MenuData;
