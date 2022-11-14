import { Request, Response } from "express";
import {User}  from "../model/user"


export const getAllUsers = async (req: Request, res: Response) => {
  const data =await User.find({})
  res.status(200).json({data: data});

};

export const getUserById = async (req: Request, res: Response) => {
  const {id} = req.params;   
  const user = await User.findById(id);
  res.status(200).json({data: user});

}

export const deleteUserById = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await User.findByIdAndRemove(id);
  if(user) res.status(200).json({message:"User deleted successfully"})



}

export const UpdateUser =async(req: Request, res: Response)=>{
  const {id} = req.params;

  const user = await User.findByIdAndUpdate(id, req.body);
  if(user) res.status(200).json({message:"User updated successfully", user});

 
}
