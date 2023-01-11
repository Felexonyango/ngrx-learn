
import { Schema, model, Document } from "mongoose";


export interface DepartmentDocument extends Document {
  department:string
}

const departmentSchema = new Schema(
    {
      department:String,
    },
    {
      timestamps: true,
    }
  );
  export const Department = model<DepartmentDocument>("Department", departmentSchema);
  
