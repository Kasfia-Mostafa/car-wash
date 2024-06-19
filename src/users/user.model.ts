import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { Role } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
