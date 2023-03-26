import { Request, Response } from "express";
import { User } from "../model/user";
import { Leave } from "../model/leave";

export const getAllUsers = async (req: Request, res: Response) => {
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
    console.log(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate('leave')
      .populate("department");

      console.log(`Found user: ${user}`);
      
    if (!user) return res.status(404).json({ message: " User not found" });
    res.status(200).json({ result:"successfully retrived user ",  user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove({ _id: id });
    if (user) res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
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
};
