import { z } from "zod";

const createBooking = z.object({
  body: z.object({
    // customer: z.string({ message: 'Customer id is required!' }),
    serviceId: z.string({ message: "Service id is required!" }),
    slotId: z.string({ message: "Slot id is required!" }),
    vehicleType: z.enum(
      [
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
      ],
      { message: "Vehicle type is required!" },
    ),
    vehicleBrand: z.string({ message: "Vehicle brand is required!" }),
    vehicleModel: z.string({ message: "Vehicle model is required!" }),
    manufacturingYear: z.number().min(1886).max(new Date().getFullYear()),
    registrationPlate: z.string({ message: "Registration plate is required!" }),
  }),
});

export const bookingValidation = {
  createBooking,
};
