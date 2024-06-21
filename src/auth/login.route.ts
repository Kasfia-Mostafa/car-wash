import express from "express";

import validateRequest from "../middleware/validateRequest";
import { LoginControllers } from "./login.controller";
import { LoginValidation } from "./login.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(LoginValidation.loginValidationSchema),
  LoginControllers.loginUser
);

export const LoginRoutes = router;
