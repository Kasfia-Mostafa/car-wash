import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { User } from "../module/users/user.model";
import config from "../app/config";
import { Role } from "../module/users/user.constant";
import AppError from "../Errors/AppError";

export const auth = (...requiredRoles: (keyof typeof Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith("Bearer ")) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const token = accessToken.split(" ")[1];

    // if the token is sent from the client
    if (!token) {
      throw new AppError(401, "You are not authorized to access this!");
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verifiedToken as JwtPayload;

    const user = await User.isUserExistsByCustomEmail(email);

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }
    next();
  });
};
