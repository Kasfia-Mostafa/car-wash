import { ObjectId } from "mongoose";

export type SlotStatus = "available" | "booked" | "canceled";

export type TSlot = {
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked?: SlotStatus;
};

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}
