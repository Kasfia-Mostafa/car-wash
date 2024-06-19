import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;