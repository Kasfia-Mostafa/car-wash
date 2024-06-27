import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { bookingValidation } from "./booking.validation";
import { Role } from "../users/user.constant";

const router = Router();

router.post(
  "/bookings",
  auth(Role.user),
  validateRequest(bookingValidation.createBooking),
  bookingController.createBooking
);
router.get("/bookings", auth(Role.admin), bookingController.getAllBookings);

router.get("/my-bookings", auth(Role.user), bookingController.getMyBookings);

export const BookingRoutes = router;
