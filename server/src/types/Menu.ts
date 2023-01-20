import { Role } from "./role";

export type Menu ={
     _id?:string
    name:string
    url:string
    role: Role[];

}