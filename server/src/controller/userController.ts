import { Request, Response } from "express";
import {User}  from "../model/user"


export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    let user = await User.findById(id);

    if (!user)
      return res.status(404).json({ error: { message: "User not found" } });

    if (user.id !== id) {
      return res
        .status(402)
        .json({ error: { message: "Ops user id mismatch" } });
    }

  
      user = await User.findOneAndUpdate(
        { _id: id },
        { name, email },
        { new: true, runValidators: true }
      );
    }

catch(err){
  console.log(err)
}
}
