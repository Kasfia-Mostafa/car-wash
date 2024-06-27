import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { CarServiceModel } from "../carService/carService.model";
import { TimeSlots } from "./slots.utils";
import { TSlot } from "./slots.interface";
import { Slots } from "./slots.model";

const createSlotIntoDB = async (payload: TSlot) => {
  const isServiceExist = await CarServiceModel.findById(payload?.service);

  if (!isServiceExist) {
    throw new AppError
    (httpStatus.NOT_FOUND, "Service not found!");
  }
  if (isServiceExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is deleted!");
  }

  const startTime = payload?.startTime;
  const endTime = payload?.endTime;
  const serviceDuration = isServiceExist?.duration; 

  const timeSlots = TimeSlots(startTime, endTime, serviceDuration);

  
  const createdSlot = [];
  for (const slot of timeSlots) {
    const slotPayload: TSlot = {
      service: payload?.service,
      date: payload?.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: payload?.isBooked,
    };

 
    const result = await Slots.create(slotPayload);
    createdSlot.push(result);
  }

  return createdSlot;
};

const getAvailableSlots = async (query: Record<string, unknown>) => {
  const { date, serviceId } = query;

  const queryObj: Record<string, unknown> = { isBooked: "available" };

  if (date) {
    queryObj.date = date;
  }

  if (serviceId) {
    queryObj.service = serviceId;
  }

  const slots = await Slots.find(queryObj).populate("service");

  return slots;
};

export const slotServices = {
  createSlotIntoDB,
  getAvailableSlots,
};
