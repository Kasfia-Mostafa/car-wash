import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import AppError from "../../Errors/AppError";
import { CarServiceModel } from "../carService/carService.model";
import { Slots } from "../slots/slots.model";
import { User } from "../users/user.model";

const createBookingIntoDB = async (payload: TBooking, userEmail: string) => {
  const service = await CarServiceModel.findById(payload?.serviceId);
  const slot = await Slots.findById(payload?.slotId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  const user = await User.findOne({ email: userEmail });

  const result = await BookingModel.create({
    ...payload,
    customer: user?._id,
  });

  const booking = await BookingModel.findById(result?._id)
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
  const user = await User.findOne({ email: userEmail });
  const userId = user?.id;

  const bookings = await BookingModel.find({ customer: userId })
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
