"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidation = exports.createSlotValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema for TSlot
exports.createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string().nonempty({ message: "Service ID is required" }),
        date: zod_1.z.string().nonempty({ message: "Date is required" }),
        startTime: zod_1.z.string().nonempty({ message: "Start time is required" }),
        endTime: zod_1.z.string().nonempty({ message: "End time is required" }),
        isBooked: zod_1.z.enum(["available", "booked", "canceled"]).optional().default("available"),
    }),
});
exports.SlotValidation = {
    createSlotValidationSchema: exports.createSlotValidationSchema,
};
