import mongoose,{ Schema, model, Document, Model } from "mongoose";
const { ObjectId } = Schema.Types;

export interface IMenu extends Document {
  name: string;
  url: string;
  role: [string];
  icon:string,
}

export interface MenuModel extends Model<IMenu> {}

const menuSchema = new Schema(
  {
    name: String,
    url: String,
    role: [String],
    icon:String
    


 
   
  },

  {
    timestamps: true,
  }
);

export const Menu = mongoose.model<IMenu, MenuModel>("Menu", menuSchema);

