/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  if (!req.user || !req.user.email) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "User not authenticated",
      data: null,
    });
  }

  const result = await bookingServices.createBookingIntoDB(
    req.body,
    req.user.email
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await bookingServices.getAllBookingFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res, next) => {
  const userEmail = req.user?.email;

  console.log("User Email:", userEmail);

  if (!userEmail) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "User not authenticated",
      data: null,
    });
  }

  // Fetch bookings for the authenticated user
  const result = await bookingServices.getMyBookingFromDB(userEmail);
  // console.log("Bookings Result:", result);

  // Check if the result is an array and has a length
  if (!Array.isArray(result) || result.length === 0) {
    // console.log("No bookings found for the user.");
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
  }

  // Send response with the user bookings
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
