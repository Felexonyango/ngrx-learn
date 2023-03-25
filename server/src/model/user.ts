import mongoose, { Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types/role";
export interface Iuser extends Document {
  firstname: string;
  lastname:string
  email: string;
  password: string;
  startDate: Date;
  nextOfKin: String;
  idNumber: Number;
  bankAccountNumber: String;
  bankName: String;
  phoneNumber: Number;
  employeeIdNumber: String;
  status: Boolean;
  role: Role[];
 

  comparePassword(candidatepassword: string): Promise<boolean>;
}

export interface UserModel extends Model<Iuser> {}

const { ObjectId } = Schema.Types;

const UserSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required:true
    },
    lastname:{
      type:String,
      required:true
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
      type:Date,
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

   role: {
      type: [String],
      enum: ['user', 'admin'],
      default: 'user'
    },
    leave:[{
      type: ObjectId,
      ref:"Leave",
      require:true

    }
  ],
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
