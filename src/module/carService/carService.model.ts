import { Schema, model } from "mongoose";
import { CarService } from "./carService.interface";

const CarServiceSchema = new Schema<CarService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const CarServiceModel = model<CarService>("Service", CarServiceSchema);
