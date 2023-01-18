import { Request, Response } from "express";
import { Leave } from "../model/leave";
import {  User as UserTypes } from "../types/user";
//import {LeaveType as LeaveTypess} from '../types/leaveType'

// const { ObjectId } = mongoose.Types;

export const create = async (req: Request, res: Response) => {
  try {
  // const leavt  = req.leavetype as LeaveTypess;
    const user = req.user as UserTypes;
    const {leavetype, comment, startDate, endDate } = req.body;
    const leave = await Leave.create({
      leavetype,
      comment,
      startDate,
      endDate,
      user: user._id,
      // leavetype:leavt._id,
    });
    await leave.save();
    return res.status(200).json({ msg: "created", leave });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while creating leave" });
  }
};

export const userleaves = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const result = await Leave.find({user:user._id}).populate("user")
    //.populate('leavetype')
    if (!result) return res.status(500).json({ msg: "You don't have leaves " });
    return res.status(200).json({ msg: "Successfully retrieved  users leaves", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const getleaveById = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const result = await Leave.findOne({ user: user._id }).populate("user")
    if (!result) return res.status(500).json({ msg: "You dont have leave" });
    return res.status(200).json({ msg: "succesfully fetched leave By Id",result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
export const deleteleave = async (req: Request, res: Response) => {
  const leave = await Leave.findById(req.params.id)
  if (!leave) return res.status(500).json({ msg: "There is no leave" });
   await Leave.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "succesfully deleted" });
};
export const updateleave = async (req: Request, res: Response) => {
    try{

    
    const { leavetype, comment, startDate, endDate } = req.body;
    const leave = await Leave.findById(req.params.id).populate('user')
    if(!leave) return res.status(500).json({ msg: "There is no leave" })
    const result = await Leave.findOneAndUpdate(
        {_id:leave._id},
        {$set:{leavetype,comment,startDate,endDate}},
         { returnOriginal: false }
        )
        if(result){
            return res.status(200).json({msg:'leave updated succesfully',result})
        }
    }
    catch(err){
        console.log(err)    }

};

//admin routes
export const leaveHistory = async (req: Request, res: Response) => {
  try {
   
    const result = await Leave.find({}).populate("user")
   
    if (!result) return res.status(500).json({ msg: " There is no leaves " });
    return res.status(200).json({ msg:"successfully retrieved all leave history",result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
export const adminupdateleave = async (req: Request, res: Response) => {
  try{

  
  const { leavetype, comment, startDate, endDate } = req.body;
  const leave = await Leave.findById(req.params.id).populate('user')
  if(!leave) return res.status(500).json({ msg: "There is no leave" })
  const result = await Leave.findOneAndUpdate(
      {_id:leave._id},
      {$set:{leavetype,comment,startDate,endDate}},
       { returnOriginal: false }
      )
      if(result){
          return res.status(200).json({msg:'leave updated succesfully',result})
      }
  }
  catch(err){
      console.log(err)    }

};
export const getleaveByIdByAdmin = async (req: Request, res: Response) => {
  try {
    // const user = req.user as UserTypes;
    const result = await Leave.findOne().populate("user")
    if (!result) return res.status(500).json({ msg: "You dont have leave" });
    return res.status(200).json({ msg: "Successfully fetched leave By Id ",result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
export const admindeleteleave = async (req: Request, res: Response) => {
  const leave = await Leave.findById(req.params.id).populate('user')
  if (!leave) return res.status(500).json({ msg: "There is no leave" });
   await Leave.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "succesfully deleted" });
};