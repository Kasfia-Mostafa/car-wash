"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const user_constant_1 = require("../users/user.constant");
const router = (0, express_1.Router)();
router.post("/bookings", (0, auth_1.auth)(user_constant_1.Role.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createBooking), booking_controller_1.bookingController.createBooking);
router.get("/bookings", (0, auth_1.auth)(user_constant_1.Role.admin), booking_controller_1.bookingController.getAllBookings);
router.get("/my-bookings", (0, auth_1.auth)(user_constant_1.Role.user), booking_controller_1.bookingController.getMyBookings);
exports.BookingRoutes = router;
