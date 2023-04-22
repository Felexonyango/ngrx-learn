import { NextFunction, Request, Response } from "express";
import { Leave, Status } from "../model/leave";
import { User as UserTypes } from "../types/user";
import { User } from "../model/user";
import { LeaveType } from "../model/leaveTypes";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.leavetype) {
      return res.status(404).json({ message: "Leavetype field is required" });
    }

    const leavetyp = await LeaveType.findById(req.body.leavetype);
    if (!leavetyp) {
      return res.status(404).json({ message: "Leavetype is invalid" });
    }
    const user = req.user as UserTypes;
    const { comment, startDate, endDate } = req.body;
    const leave = await Leave.create({
      comment,
      startDate,
      endDate,
      status: Status.PENDING,
      user: user._id,
      leavetype: leavetyp._id,
    });
    const result = await leave.save();
    if (result) {
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $push: { leave: leave._id },
      });
      if (updatedUser) {
        await updatedUser
          .populate({
            path: "leave",
            model: "Leave",
            populate: { path: "leavetype", model: "LeaveType" },
          })
          .execPopulate();
      }
    }

    return res.status(200).json({ msg: "Succesfully created leave", leave });
  } catch (err) {
    res.status(500).json({ msg: "Error while creating leave" });
  }
  next();
};

export const userleaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserTypes;
    const result = await Leave.find({})
      .where("user")
      .equals(user._id)
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });

    //.populate('leavetype')
    if (!result) return res.status(400).json({ msg: "You don't have leaves " });
    return res
      .status(200)
      .json({ msg: "Successfully retrieved  users leaves", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
  next();
};

export const getleaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await Leave.findById(id)
      .populate("user", "-password")
      .populate("leavetype");
    if (!result) return res.status(400).json({ msg: "You don't have leave" });
    return res
      .status(200)
      .json({ msg: "successfully fetched leave By Id", result });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
export const deleteleave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(400).json({ msg: "There is no leave" });
    await Leave.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "succesfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  next();
};
export const updateleave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { leavetype, comment, startDate, endDate } = req.body;
    const leave = await Leave.findById(req.params.id).populate(
      "user",
      "-password"
    );
    if (!leave) return res.status(500).json({ msg: "There is no leave" });
    const result = await Leave.findOneAndUpdate(
      { _id: leave._id },
      { $set: { leavetype, comment, startDate, endDate } },
      { returnOriginal: false }
    );
    if (result) {
      return res.status(200).json({ msg: "leave updated succesfully", result });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
  next();
};

export const leaveHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Leave.find({})
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });

    if (!result) return res.status(400).json({ msg: " There is no leaves " });
    return res.status(200).json({
      msg: "successfully retrieved all leave history by admin",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
  next();
};

export const approveLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id)
      .populate("user", "-password")
      .populate("leavetype");
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    leave.status = Status.APPROVED;
    const result = await leave.save();

    return res.status(200).json({ msg: "Leave request approved", result });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  next();
};

export const Approvedleaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Leave.find({ status: Status.APPROVED })
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });

    if (!result) return res.status(500).json({ msg: " There is no leaves " });
    return res.status(200).json({
      msg: "successfully retrieved all approved leaves",
      result,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};

export const ApprovedleavesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserTypes;
    const result = await Leave.find({ user: user._id, status: Status.APPROVED })
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });

    if (!result) return res.status(500).json({ msg: " There is no leaves " });
    return res.status(200).json({
      msg: "successfully retrieved user's approved leaves",
      result,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};

export const getApprovedLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const status = Status.APPROVED;
    const result = await Leave.findById(id, { status })
      .populate("user", "-password")
      .populate("leavetype");

    if (!result) {
      return res.status(404).json({ msg: "No  such leave exist in database" });
    }
    return res
      .status(200)
      .json({ msg: "Succesfully retrived approved leave by Id", result });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
export const deleteApprovedLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await Leave.findById(id, {
      status: Status.APPROVED,
    }).populate("user", "-password");

    if (result) {
      return res.status(404).json({ msg: "No approved leave  available" });
    }
    await Leave.findByIdAndDelete(id);
    return res.status(200).json({ msg: "successfully deleted approved leave" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
export const updateApprovedLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { leavetype, comment, startDate, endDate } = req.body;
    const { id } = req.params;

    const leave = await Leave.findById(id, { status: Status.APPROVED })
      .populate("user", "-password")
      .populate("leavetype");
    if (!leave)
      return res.status(500).json({ msg: "There is no leave approved" });
    const result = await Leave.findOneAndUpdate(
      { _id: leave._id },
      { $set: { leavetype, comment, startDate, endDate } },
      { returnOriginal: false }
    );
    if (result) {
      return res.status(200).json({ msg: "leave updated succesfully", result });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};

// pending leaves

export const PendinLeavesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserTypes;
    const result = await Leave.find({ user: user._id, status: Status.PENDING })
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });

    if (!result) {
      return res.status(404).json({ msg: "There are no leaves approved " });
    }
    return res
      .status(200)
      .json({ msg: "Succesfully retrived  user's pending leaves", result });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};

export const PendinLeaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Leave.find({ status: Status.PENDING })
      .populate("user", "-password")
      .populate("leavetype")
      .sort({ createdAt: -1 });
    if (!result) {
      return res.status(404).json({ msg: "There are no leaves approved " });
    }
    return res
      .status(200)
      .json({ msg: "Succesfully retrived  all pending leaves", result });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};

export const getPendingLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const status = Status.PENDING;
    const result = await Leave.findById(id, { status })
      .populate("user", "-password")
      .populate("leavetype");

    if (!result) {
      return res.status(404).json({ msg: "No  such leave exist in database" });
    }
    return res
      .status(200)
      .json({ msg: "Successfully retrieved pending leave by Id", result });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
export const deletePendingLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await Leave.findById(id, {
      status: Status.PENDING,
    }).populate("user", "-password");

    if (result) {
      return res.status(404).json({ msg: "No Pending  leave  available" });
    }
    await Leave.findByIdAndDelete(id);
    return res.status(200).json({ msg: "successfully deleted approved leave" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
export const updatePendingLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { leavetype, comment, startDate, endDate } = req.body;
    const { id } = req.params;

    const leave = await Leave.findById(id, { status: Status.PENDING })
      .populate("user", "-password")
      .populate("leavetype");
    if (!leave)
      return res.status(500).json({ msg: "There is no pending leave" });
    const result = await Leave.findOneAndUpdate(
      { _id: leave._id },
      { $set: { leavetype, comment, startDate, endDate } },
      { returnOriginal: false }
    );
    if (result) {
      return res.status(200).json({ msg: "leave updated succesfully", result });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  next();
};
