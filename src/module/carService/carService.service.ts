import { CarService } from "./carService.interface";
import { CarServiceModel } from "./carService.model";

const createCarServiceIntoDB = async (payload: CarService) => {
  const result = await CarServiceModel.create(payload);
  // console.log(result);
  return result;
};

const getAllCarServiceFromDB = async () => {
  const result = await CarServiceModel.find();
  return result;
};

const getSingleCarServiceFromDB = async (id: string) => {
  const result = await CarServiceModel.findById(id);
  return result;
};

const updateCarServiceIntoDB = async (_id: string, payload: CarService) => {
  const updatedCarService = await CarServiceModel.findByIdAndUpdate(
    { _id },
    payload,
    { new: true } 
  );
  return updatedCarService;
};

const deleteCarServiceFromDB = async (id: string) => {
  const deletedCarService = await CarServiceModel.findByIdAndDelete(id);
  return deletedCarService;
};

export const CarServices = {
  createCarServiceIntoDB,
  getAllCarServiceFromDB,
  getSingleCarServiceFromDB,
  updateCarServiceIntoDB,
  deleteCarServiceFromDB, 
};
