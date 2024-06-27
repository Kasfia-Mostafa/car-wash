"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        // customer: z.string({ message: 'Customer id is required!' }),
        serviceId: zod_1.z.string({ message: "Service id is required!" }),
        slotId: zod_1.z.string({ message: "Slot id is required!" }),
        vehicleType: zod_1.z.enum([
            "car",
            "truck",
            "SUV",
            "van",
            "motorcycle",
            "bus",
            "electricVehicle",
            "hybridVehicle",
            "bicycle",
            "tractor",
        ], { message: "Vehicle type is required!" }),
        vehicleBrand: zod_1.z.string({ message: "Vehicle brand is required!" }),
        vehicleModel: zod_1.z.string({ message: "Vehicle model is required!" }),
        manufacturingYear: zod_1.z.number().min(1886).max(new Date().getFullYear()),
        registrationPlate: zod_1.z.string({ message: "Registration plate is required!" }),
    }),
});
exports.bookingValidation = {
    createBooking,
};
