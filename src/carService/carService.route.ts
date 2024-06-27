import express from "express";
import validateRequest from "../middleware/validateRequest";
import { carServiceValidation } from "./carService.validation";
import { CarServiceControllers } from "./carService.controller";
import { auth } from "../middleware/auth";
import { Role } from "../users/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(Role.admin),
  validateRequest(carServiceValidation.CarServiceValidationSchema),
  CarServiceControllers.createCarService
);
router.get("/", CarServiceControllers.getAllCarService);

router.get(
  "/:carId",
  CarServiceControllers.getSingleCarService
);

router.put(
  "/:carId",
  validateRequest(carServiceValidation.CarServiceValidationSchema),
  CarServiceControllers.updateCarService
);

export const CarServiceRoutes = router;
