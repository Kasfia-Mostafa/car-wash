import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { slotServices } from "./slots.service";

const createSlot = catchAsync(async (req, res) => {
  const result = await slotServices.createSlotIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});


const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await slotServices.getAvailableSlots(req?.query);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
};
