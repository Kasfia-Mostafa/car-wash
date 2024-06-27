import { Model, Document } from "mongoose";
import { Role } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof Role;
  address: string;
}

// Extending the Document interface to include TUser fields
export interface TUserDocument extends TUser, Document {}

export interface UserModel extends Model<TUserDocument> {
  isUserExistsByCustomEmail(email: string): Promise<TUserDocument | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}

export type TLogin = {
  email: string;
  password: string;
};
