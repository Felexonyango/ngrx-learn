import { Request, Response } from "express";
import { Leave } from "../model/leave";
import {  User as UserTypes } from "../types/user";
import {LeaveType as LeaveTypes} from '../types/leaveType'

// const { ObjectId } = mongoose.Types;

export const create = async (req: Request, res: Response) => {
  try {
    const leavetype = req.leavetype as LeaveTypes;
    const user = req.user as UserTypes;
    const {comment, startDate, endDate } = req.body;
    const leave = await Leave.create({
      comment,
      startDate,
      endDate,
      user: user._id,
      leavetype:leavetype._id,
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
    const leaves = await Leave.find({user:user._id}).populate("user").populate('leavetype')
    if (!leaves) return res.status(500).json({ msg: "You don't have leaves " });
    return res.status(200).json({ msg: leaves });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const getleaveById = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const leaves = await Leave.findOne({ user: user._id }).populate("user").populate('leavetype')
    if (!leaves) return res.status(500).json({ msg: "You dont have leave" });
    return res.status(200).json({ msg: leaves });
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

    
    const { type, comment, startDate, endDate } = req.body;
    const leave = await Leave.findById(req.params.id).populate('user')
    if(!leave) return res.status(500).json({ msg: "There is no leave" })
    const result = await Leave.findOneAndUpdate(
        {_id:leave._id},
        {$set:{type,comment,startDate,endDate}},
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
export const allleaveHistory = async (req: Request, res: Response) => {
  try {
   
    const leaves = await Leave.find().populate("user").populate('leavetype')
    if (!leaves) return res.status(500).json({ msg: " There is no leaves " });
    return res.status(200).json({ msg: leaves });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
export const adminupdateleave = async (req: Request, res: Response) => {
  try{

  
  const { type, comment, startDate, endDate } = req.body;
  const leave = await Leave.findById(req.params.id).populate('user')
  if(!leave) return res.status(500).json({ msg: "There is no leave" })
  const result = await Leave.findOneAndUpdate(
      {_id:leave._id},
      {$set:{comment,startDate,endDate}},
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
    const leaves = await Leave.findOne().populate("user").populate('leavetype')
    if (!leaves) return res.status(500).json({ msg: "You dont have leave" });
    return res.status(200).json({ msg: leaves });
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