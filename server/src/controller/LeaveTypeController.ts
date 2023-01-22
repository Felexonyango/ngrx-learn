import { Request, Response } from "express";
import { LeaveType } from "../model/leaveTypes";

export const create = async (req: Request, res: Response) => {
  try {
    const { leavetype,numberOfDays} = req.body;
    const leaveTypes = await LeaveType.create({
        leavetype,
        numberOfDays,
      
      
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
    
    const result = await LeaveType.find({})
    if (!result) return res.status(500).json({ msg: "There is no leavetypes " });
    return res.status(200).json({ msg:'Leavetype fetched successfully',result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const getLeaveTypeById = async (req: Request, res: Response) => {
  try {
  const {id}=req.params
    const result= await LeaveType.findById(id)
    if (!result) return res.status(500).json({ msg: "There is no leavetype" });
    return res.status(200).json({ msg: "Leave type fetched succesfully",result });
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
      
      const result = await LeaveType.find({})
      if (!result) return res.status(500).json({ msg: "There is no leavetypes " });
      return res.status(200).json({ msg:'retrived leavetype by user',result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    }
  };
  

