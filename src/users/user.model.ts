import { Schema, model } from "mongoose";
import {  TUserDocument, UserModel } from "./user.interface";
import { Role } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../app/config";

const userSchema = new Schema<TUserDocument, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as TUserDocument;
  if (!user.isModified("password")) {
    return next();
  }

  user.password = await bcryptjs.hash(user.password, Number(config.bcrypt_salt_round));
  next();
});

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUserDocument, UserModel>("User", userSchema);
