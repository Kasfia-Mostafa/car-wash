import { Router } from "express";
import { slotController } from "./slots.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../users/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { SlotValidation } from "./slots.validation";

const router = Router();

router.post("/",
  auth(Role.admin),
  validateRequest(SlotValidation.createSlotValidationSchema),
  slotController.createSlot);

router.get("/availability", slotController.getAvailableSlots);

export const slotRoutes = router;
