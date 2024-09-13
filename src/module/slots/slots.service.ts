import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { CarServiceModel } from "../carService/carService.model";
import { TimeSlots } from "./slots.utils";
import { QueryParams, TSlot } from "./slots.interface";
import { Slots } from "./slots.model";
import mongoose from "mongoose";

const createSlotIntoDB = async (payload: TSlot) => {
  try {
    // Check if the service exists
    const isServiceExist = await CarServiceModel.findById(payload?.service);

    if (!isServiceExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Service not found!");
    }

    if (isServiceExist.isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, "Service is deleted!");
    }

    const { startTime, endTime } = payload;
    const serviceDuration = isServiceExist?.duration;

    // Generate time slots based on the service duration
    const timeSlots = TimeSlots(startTime, endTime, serviceDuration);

    // Prepare slot payloads for batch insertion with proper formatting
    const slotPayloads = timeSlots.map((slot) => ({
      service: payload?.service,
      date: payload?.date
        ? new Date(payload.date).toISOString().split("T")[0]
        : null,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: payload?.isBooked || "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Batch insert all slots at once
    const createdSlots = await Slots.insertMany(slotPayloads);

    return createdSlots;
  } catch (error) {
    // Narrow down the error type
    if (error instanceof Error) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    } else {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred."
      );
    }
  }
};

const getAvailableSlots = async (query: QueryParams) => {
  const { date, serviceId } = query;

  const queryObj: Record<string, unknown> = { isBooked: "available" };

  if (date) {
    // Ensure date is a valid string
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      // Check if valid date
      queryObj.date = parsedDate.toISOString().split("T")[0]; 
    } else {
      throw new Error("Invalid date format");
    }
  }

  if (serviceId) {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new Error("Invalid serviceId");
    }
    queryObj.service = serviceId;
  }

  try {
    const slots = await Slots.find(queryObj).populate("service");
    return slots;
  } catch (error) {
    // Type assertion to handle error
    if (error instanceof Error) {
      throw new Error(`Error fetching available slots: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const slotServices = {
  createSlotIntoDB,
  getAvailableSlots,
};
