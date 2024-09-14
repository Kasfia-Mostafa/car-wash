import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { CarServices } from "./carService.service";
import sendResponse from "../../utils/sendResponse";

// Create a car service
const createCarService = catchAsync(async (req, res) => {
  const result = await CarServices.createCarServiceIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Service created successfully",
    data: result,
  });
});

// Get all car services
const getAllCarService = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarServiceFromDB();

  // Check if the result is empty
  if (!result || result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

// Get a single car service
const getSingleCarService = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getSingleCarServiceFromDB(carId);

  // Check if the result is null
  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

// Update a car service
const updateCarService = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.updateCarServiceIntoDB(carId, req.body);

  // Check if the result is null
  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: "Car service updated successfully!",
    data: result,
  });
});

// Delete a car service
const deleteCarService = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.deleteCarServiceFromDB(carId);

  // Check if the result is null
  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: "Car service deleted successfully!",
    data: result,
  });
});

export const CarServiceControllers = {
  createCarService,
  getAllCarService,
  getSingleCarService,
  updateCarService,
  deleteCarService,
};
