import { Request, Response } from "express";
import { Department } from "../model/department";
//import { Department as DepartmentTypes } from "../types";
//import mongoose from "mongoose";

// const { ObjectId } = mongoose.Types;

export const create = async (req: Request, res: Response) => {
  try {
 
    const { department } = req.body;
    const depart = await Department.create({
    department
     
    });
    await depart.save();
    return res.status(200).json({ msg: "created department", depart});
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while creating department" });
  }
};

export const getdepartments = async (req: Request, res: Response) => {
    try {

      const department = await Department.find({})
      if (!department) return res.status(500).json({ msg: "There are no department " });
      return res.status(200).json({ msg: department });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    }
  };
  export const getdepartmentById = async (req: Request, res: Response) => {
    try {
      const {id}=req.params

      const department = await Department.findById(id)
      if (!department) return res.status(500).json({ msg: "There is no department " });
      return res.status(200).json({ msg: department });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    }
  };
  export  const deleteDepartment =async(req:Request,res:Response)=>{

    const department = await Department.findById(req.params.id)
    if (!department) return res.status(500).json({ msg: "There is no department" });
     await Department.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "succesfully deleted" });
  }

  export const updateDepartment = async (req: Request, res: Response) => {
    try{

    
    const { department } = req.body;
    const dep = await Department.findById(req.params.id).populate('user')
    if(!dep) return res.status(500).json({ msg: "There is no department" })
    const result = await Department.findOneAndUpdate(
        {_id:dep._id},
        {$set:{department}},
         { returnOriginal: false }
        )
        if(result){
            return res.status(200).json({msg:'department updated succesfully',result})
        }
    }
    catch(err){
        console.log(err)    }

};