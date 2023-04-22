import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import { Leave } from "../model/leave";

export const getAllUsers = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await User.find({})
      .populate("department")
      .populate("leaves")
      .sort({ createdAt: -1 });

    if (!result) return res.status(404).json({ message: " Users not found" });

    return res
      .status(200)
      .json({ message: "succesfully retrived user", result });
  } catch (err) {
    res.status(500).json({ error: err });
    
  }
  next()
};

export const getUserById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;

    const result = await User.findById(id)
      .populate('leave')
      .populate("department");
      
    if (!result) return res.status(404).json({ message: " User not found" });
    res.status(200).json({ msg:"successfully retrived user ",result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
  next()
};

export const deleteUserById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove({ _id: id });
    if (user) res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
  next()
};

export const UpdateUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error in updating user product" });
  }
  next()
};
