import { Request, Response, NextFunction } from "express";
import {  JWT_SECRET_KEY } from "../config/index"
import { User as UserType} from  "../types/user"
import {Role } from "../types/role"

import {User,Iuser}from "../model/user";

import passport from "passport";
import jwt from "jsonwebtoken";


export const sendResponseToken = ({user,res,statusCode,}: {
  user: UserType | Iuser
  statusCode: number;
  res: Response;
}) => {
  const payload = {
  user_id: user._id,
  role:user.role


};

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: 36000
  });

  // remove password from response
 
  res.status(statusCode).json({ data: { user, token }, success: true });
};


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("login", { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendResponseToken({ user, res, statusCode: 200 });
 
  })(req, res, next);
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("signUp", { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendResponseToken({ user, res, statusCode: 201 });
  })(req, res, next);
};



export const changePassword = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserType;
    const { newPassword, oldPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(402).json({
        message: "New Password and Confirm New Password does not match",
      });
    }

    const foundUser = await User.findById(user._id).select("+password");

    if (!foundUser) return res.status(404).json({ message: "User not found " });
   
    const isPasswordCorrect = await foundUser.comparePassword(oldPassword);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Old password is incorrect" });

    foundUser.password = newPassword;
    await foundUser.save();

    sendResponseToken({ user: foundUser, res, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error in updating password." });
  }
};
