import { Request, Response } from "express";
import { LeaveType } from "../model/leaveTypes";
import { User as UserTypes } from "../types";

// const { ObjectId } = mongoose.Types;

export const create = async (req: Request, res: Response) => {
  try {
    const { leavetype,numberOfDays} = req.body;
    const leaveTypes = await LeaveType.create({
        leavetype,
      
      
    });
    await leaveTypes.save();
    return res.status(200).json({ msg: "created", leaveTypes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while creating LeaveTypes" });
  }
};

export const getLeaveTypes= async (req: Request, res: Response) => {
  try {
    
    const leaveTypes = await LeaveType.find({})
    if (!leaveTypes) return res.status(500).json({ msg: "There is no leavetypes " });
    return res.status(200).json({ msg: leaveTypes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const getLeaveTypeById = async (req: Request, res: Response) => {
  try {
  const {id}=req.params
    const leavetypes= await LeaveType.findById(id)
    if (!leavetypes) return res.status(500).json({ msg: "There is no leavetype" });
    return res.status(200).json({ msg: leavetypes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
export const deleteLeaveType = async (req: Request, res: Response) => {
  const leaveTypesType = await LeaveType.findById(req.params.id)
  if (!leaveTypesType) return res.status(500).json({ msg: "There is no LeaveType" });
   await LeaveType.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "succesfully deleted" });
};
export const updateLeaveTypesTypes = async (req: Request, res: Response) => {
    try{

    
        const { leavetype} = req.body;
    const leave= await LeaveType.findById(req.params.id)
    if(!leave) return res.status(500).json({ msg: "There is no LeaveType" })
    const result = await LeaveType.findOneAndUpdate(
        {_id:leave._id},
        {$set:{leavetype}},
         { returnOriginal: false }
        )
        if(result){
            return res.status(200).json({msg:'LeaveType updated succesfully',result})
        }
    }
    catch(err){
        console.log(err)    }

};

//user route
export const getLeaveTypesUser= async (req: Request, res: Response) => {
    try {
      
      const leaveTypes = await LeaveType.find({})
      if (!leaveTypes) return res.status(500).json({ msg: "There is no leavetypes " });
      return res.status(200).json({ msg: leaveTypes });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    }
  };
  

