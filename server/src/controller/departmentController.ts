import { Request, Response } from "express";
import { Department } from "../model/department";
import { Department as DepartmentTypes } from "../types";
import mongoose from "mongoose";

// const { ObjectId } = mongoose.Types;

export const create = async (req: Request, res: Response) => {
  try {
 
    const { department } = req.body;
    const depart = await Department.create({
    department
     
    });
    await depart.save();
    return res.status(200).json({ msg: "created department", depart});
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while creating department" });
  }
};

export const departments = async (req: Request, res: Response) => {
    try {

      const department = await Department.find({})
      if (!department) return res.status(500).json({ msg: "There is no department " });
      return res.status(200).json({ msg: department });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    }
  };