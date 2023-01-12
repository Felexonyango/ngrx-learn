import mongoose, { Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types/role";
export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;

  startDate: String;
  nextOfKin: String;
  idNumber: Number;
  kraPin: String;
  bankAccountNumber: String;
  bankName: String;
  phoneNumber: Number;
  employeeIdNumber: String;
  status: Boolean;
  taxRegNO: String;
  swiftCode: String;
  branchName: String;
  bankCode: String;
  role: Role;

  comparePassword(candidatepassword: string): Promise<boolean>;
}

export interface UserModel extends Model<Iuser> {}

const { ObjectId } = Schema.Types;

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    department: {
      type: ObjectId,
      ref: "Department"
    },

    nextOfKin: {
      type: String,
    },
  

    idNumber: {
      type: Number,
      required: true,
    },

    kraPin: {
      type: String,
      required: true,
    },

    bankAccountNumber: {
      type: String,
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    employeeIdNumber: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
    },

    taxRegNO: {
      type: String,
      required: true,
    },
    swiftCode: {
      type: String,
      required: true,
    },

    branchName: {
      type: String,
      required: true,
    },

    bankCode: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<Iuser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = async function (
  candidatepassword: string
): Promise<boolean> {
  const user = <Iuser>this;
  return await bcrypt.compare(candidatepassword, user.password);
};

export const User = mongoose.model<Iuser, UserModel>("User", UserSchema);
