import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { CarServices } from "./carService.service";
import sendResponse from "../../utils/sendResponse";

const createCarService = catchAsync(async (req, res) => {
  const result = await CarServices.createCarServiceIntoDB(req.body);
  // console.log(result)
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Service created successfully",
    data: result,
  });
});

const getAllCarService = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarServiceFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

const getSingleCarService = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getSingleCarServiceFromDB(carId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const updateCarService = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.updateCarServiceIntoDB(carId, req.body);

  res.status(200).json({
    success: true,
    message: "Car service updated successfully!",
    data: result,
  });
});

export const CarServiceControllers = {
  createCarService,
  getAllCarService,
  getSingleCarService,
  updateCarService,
};
