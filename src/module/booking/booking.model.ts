import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface"; // Importing your type

const BookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User", 
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service", 
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slots", 
      required: true,
    },
    vehicleType: {
      type: String,
      enum: [
        "car",
        "motorcycle",
        "truck",
        "SUV",
        "van",
        "bus",
        "electricVehicle",
        "hybridVehicle",
        "bicycle",
        "tractor",
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, 
  },
);

export const BookingModel = model<TBooking>("Booking", BookingSchema);
