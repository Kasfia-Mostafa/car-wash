import { z } from "zod";

// Define the Zod schema for TSlot
export const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().nonempty({ message: "Service ID is required" }),
    date: z.string().nonempty({ message: "Date is required" }),
    startTime: z.string().nonempty({ message: "Start time is required" }),
    endTime: z.string().nonempty({ message: "End time is required" }),
    isBooked: z.enum(["available", "booked", "canceled"]).optional().default("available"),
  }),
});

export const SlotValidation = {
  createSlotValidationSchema,
};
