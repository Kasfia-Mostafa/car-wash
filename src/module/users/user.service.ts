import httpStatus from "http-status";
import { TLogin, TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../Errors/AppError";
import config from "../../app/config";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  const createdUser = await User.create(payload);
  return createdUser;
};

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistsByCustomEmail(payload?.email);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong password!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  user.password = "";

  return {
    accessToken,
    user,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
