export interface IDepartment {
    _id?: string;
    departmentName: string;
    numOfEmployees?: number;
    employeesInOffice?: number;
    employeesOnLeave?: number;
    activeEmployees?:number
    head?:{
        id:string,
        firstName:string
        lastName: string,
      }
     users?:{
      firstName:string
      lastName:string
      status:string
      role:any[]
    
     }  
   
        
      

}
