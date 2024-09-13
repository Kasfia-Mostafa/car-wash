import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../module/users/user.model";
import config from "../app/config";
import AppError from "../Errors/AppError";
import catchAsync from "../utils/catchAsync";
import { Role } from "../module/users/user.constant";

export const auth = (...requiredRoles: (keyof typeof Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Authorization token missing or malformed");
    }

    const token = authorizationHeader.split(" ")[1];
    // console.log("Received Token:", token);

    let verifiedToken: JwtPayload | null = null;
    try {
      verifiedToken = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (error) {
      throw new AppError(401, "Invalid or expired token");
    }

    const { email } = verifiedToken;
    
    const user = await User.isUserExistsByCustomEmail(email);
    if (!user) {
      throw new AppError(401, "User associated with this token not found");
    }

    // Set req.user with the user's details including role
    req.user = { id: user._id, email: user.email, role: user.role }; 

    if (!requiredRoles.includes(user.role)) {
      throw new AppError(403, "You do not have permission to access this resource");
    }

    next();
  });
};
