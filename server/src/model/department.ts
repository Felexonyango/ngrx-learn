import mongoose,{ Schema, model, Document } from "mongoose";
const { ObjectId } = Schema.Types;

export interface DepartmentDocument extends Document {
  
  departmentName: string;
  numOfEmployees:number
  user: mongoose.Types.ObjectId 
}

const departmentSchema = new Schema(
  {
    numOfEmployees:{
      type:Number,
      required: true,
      unique: true
    },
    departmentName:{
      type:String,
      required: true
      
     },
     user: [{
      type: ObjectId,
      ref: "User",
      required: true
    }],

    
 
  },
  

  {
    timestamps: true,
  }
);
export const Department = model<DepartmentDocument>(
  "Department",
  departmentSchema
);
