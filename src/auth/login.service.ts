import httpStatus from "http-status";
import { TLogin } from "./login.interface";
import AppError from "../Errors/AppError";
import { User } from "../users/user.model";
import jwt from 'jsonwebtoken';
import config from "../app/config";

const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cannot find the user!');
  }

  // Ensure the user object has a password
  if (!user.password) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Password is missing in the user record!');
  }

  // Checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }
  
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,

  );

  return {
    user,
    accessToken,
  };
};


export const loginServices = {
  loginUser,
  // changePassword,
  // refreshToken,
};
