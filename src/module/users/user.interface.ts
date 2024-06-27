import { Model } from "mongoose";
import { Role } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof Role;
  address: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export interface TLogin {
  email: string;
  password: string;
}
