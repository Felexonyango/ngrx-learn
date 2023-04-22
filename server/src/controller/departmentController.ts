import { NextFunction, Request, Response } from "express";
import { Department } from "../model/department";
import { User } from "../model/user";
import { User as UserTypes } from "../types/user";
import { Leave, Status } from "../model/leave";

export const create = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { departmentName, numOfEmployees } = req.body;
    const departmentExists = await Department.findOne({"departmentName":departmentName});
    if (departmentExists) {
     return res.status(500).json({ msg: "Department with that name already exists" });
    }
    const department = await Department.create({
      departmentName,
      numOfEmployees,
    });
   await department.save();

    
    return res.status(200).json({ msg: "created department", department });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while creating department" });
  }
  next()
};

export const getdepartments = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await Department.find({});
    if (!result)
      return res.status(500).json({ msg: "There are no department " });

    return res.status(200).json({ msg: "All departments retrieved", result });
  } catch (err) {
    
    res.status(500).json({ msg: err });
  }
  next()
};
export const getdepartmentById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    let {id} = req.params

    const department = await Department.findById(id);
    console.log(department)
    if (!department)
      return res.status(500).json({ msg: "There is no department " });
    return res.status(200).json({ msg: department });
  } catch (err) {
  
    res.status(500).json({ msg: err });
  }
  next()
};
export const deleteDepartment = async (req: Request, res: Response,next:NextFunction) => {
  try{
    const department = await Department.findById(req.params.id);
    if (!department)
      return res.status(500).json({ msg: "There is no department" });
    await Department.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "succesfully deleted" });
  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
  next()
  
};

export const updateDepartment = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { departmentName, numOfEmployees } = req.body;
    const dep = await Department.findById(req.params.id).populate("user");
    if (!dep) return res.status(500).json({ msg: "There is no department" });
    const result = await Department.findOneAndUpdate(
      { _id: dep._id },
      { $set: { departmentName, numOfEmployees } },
      { returnOriginal: false }
    );
    if (result) {
      return res
        .status(200)
        .json({ msg: "department updated succesfully", result });
    }
  } catch (err) {
  res.status(500).json({ msg: "server error", err });
  }
  next()
};

export const getAdminTotals = async (req: Request) => {
  try {
    const user = req.user as UserTypes;
    const totaldepartments = await Department.countDocuments();
    const totalUser = await User.countDocuments();
    const totalLeaves = await Leave.countDocuments();

    return {
      totalLeaves,
      totaldepartments,
      totalUser,
    };
  } catch (err) {
    console.log(err);
  }
  
};

export const getUserTotals = async (req: Request) => {
  try {
    const user = req.user as UserTypes;
    const approvedleaves = await Leave.find({
      user: user._id,
      status: Status.APPROVED,
    }).countDocuments();
    const pendingLeaves = await Leave.find({
      user: user._id,
      status: Status.PENDING,
    }).countDocuments();
    const appliedLeaves = await Leave.find({ user: user._id }).countDocuments();

    return {
      appliedLeaves,
      pendingLeaves,
      approvedleaves,
    };
  } catch (err) {
    console.log(err);
  }
};
