import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { loginServices } from "./login.service";
import sendResponse from "../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: result,
  });
});

export const LoginControllers = {
  loginUser,
};
