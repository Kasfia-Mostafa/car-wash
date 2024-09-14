"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const carService_model_1 = require("../carService/carService.model");
const slots_utils_1 = require("./slots.utils");
const slots_model_1 = require("./slots.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the service exists
        const isServiceExist = yield carService_model_1.CarServiceModel.findById(payload === null || payload === void 0 ? void 0 : payload.service);
        if (!isServiceExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found!");
        }
        if (isServiceExist.isDeleted) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is deleted!");
        }
        const { startTime, endTime } = payload;
        // Generate time slots based on startTime and endTime
        const timeSlots = (0, slots_utils_1.TimeSlots)(startTime, endTime);
        // Prepare slot payloads
        const slotPayloads = timeSlots.map((slot) => ({
            service: payload === null || payload === void 0 ? void 0 : payload.service,
            date: (payload === null || payload === void 0 ? void 0 : payload.date)
                ? new Date(payload.date).toISOString().split("T")[0]
                : null,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: (payload === null || payload === void 0 ? void 0 : payload.isBooked) || "available",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }));
        // Batch insert all slots
        const createdSlots = yield slots_model_1.Slots.insertMany(slotPayloads);
        return createdSlots;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
        }
        else {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "An unexpected error occurred.");
        }
    }
});
const getAvailableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = query;
    const queryObj = { isBooked: "available" };
    if (date) {
        // Ensure date is a valid string
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            // Check if valid date
            queryObj.date = parsedDate.toISOString().split("T")[0];
        }
        else {
            throw new Error("Invalid date format");
        }
    }
    if (serviceId) {
        if (!mongoose_1.default.Types.ObjectId.isValid(serviceId)) {
            throw new Error("Invalid serviceId");
        }
        queryObj.service = serviceId;
    }
    try {
        const slots = yield slots_model_1.Slots.find(queryObj).populate("service");
        return slots;
    }
    catch (error) {
        // Type assertion to handle error
        if (error instanceof Error) {
            throw new Error(`Error fetching available slots: ${error.message}`);
        }
        else {
            throw new Error("An unexpected error occurred.");
        }
    }
});
exports.slotServices = {
    createSlotIntoDB,
    getAvailableSlots,
};
