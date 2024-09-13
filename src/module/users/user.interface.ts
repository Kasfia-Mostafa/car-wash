import { Model } from "mongoose";
import { Role } from "./user.constant";

// User interface defining the structure of the User document
export interface TUser {
   _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof Role;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}


export interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

// Login interface defining the structure of login payload
export interface TLogin {
  email: string;
  password: string;
}
