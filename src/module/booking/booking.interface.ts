import { Schema } from "mongoose";

export type TBooking = {
  customer?: Schema.Types.ObjectId; 
  serviceId: Schema.Types.ObjectId; 
  slotId: Schema.Types.ObjectId;
  vehicleType:
    | "car"
    | "motorcycle"
    | "truck"
    | "SUV"
    | "van"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor"; 
  vehicleBrand: string; 
  vehicleModel: string; 
  manufacturingYear: number; 
  registrationPlate: string; 
};
