import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import AppError from "../../Errors/AppError";
import { CarServiceModel } from "../carService/carService.model";
import { Slots } from "../slots/slots.model";
import { User } from "../users/user.model";

// Create a new booking in the database
const createBookingIntoDB = async (payload: TBooking, userEmail: string) => {

  const service = await CarServiceModel.findById(payload?.serviceId);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const slot = await Slots.findById(payload?.slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Find the user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Create the booking
  const result = await BookingModel.create({
    ...payload,
    customer: user._id,
  });

  // Populate the created booking details
  const booking = await BookingModel.findById(result._id)
    .populate("customer")
    .populate("serviceId")
    .populate("slotId");

  return booking;
};

const getAllBookingFromDB = async () => {
  const bookings = await BookingModel.find()
    .populate("customer")
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};

const getMyBookingFromDB = async (userEmail: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.error("User not found for email:", userEmail);
      throw new Error("User not found");
    }

    const userId = user._id;
    console.log("User ID:", userId); // Debugging line

    // Find bookings for the user and populate service and slot details
    const bookings = await BookingModel.find({ customer: userId })
      .populate("serviceId")
      .populate("slotId");

    console.log("Bookings found for user:", bookings); // Debugging line
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Unable to fetch bookings");
  }
};



export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
