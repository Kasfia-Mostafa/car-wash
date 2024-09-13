import { ObjectId } from "mongoose";

export type SlotStatus = "available" | "booked" | "canceled";

export type TSlot = {
  service: ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: SlotStatus;
};

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export type QueryParams = {
  date?: string;
  serviceId?: string;
};
