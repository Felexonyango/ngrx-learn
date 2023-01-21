import { Request, Response } from "express";
import { Menu } from "../model/menu";
import { User as UserTypes } from "../types";
import { User } from "../model/user";

export const getAllMenus = async (req: Request, res: Response) => {
  try {
   
    let result = await Menu.find({}).exec()
    
    
    return res.status(200).json({msg:"Menu successfully fetched all menus",result})
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
