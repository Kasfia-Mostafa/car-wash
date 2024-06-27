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
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isServiceExist = yield carService_model_1.CarServiceModel.findById(payload === null || payload === void 0 ? void 0 : payload.service);
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found!");
    }
    if (isServiceExist.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is deleted!");
    }
    const startTime = payload === null || payload === void 0 ? void 0 : payload.startTime;
    const endTime = payload === null || payload === void 0 ? void 0 : payload.endTime;
    const serviceDuration = isServiceExist === null || isServiceExist === void 0 ? void 0 : isServiceExist.duration;
    const timeSlots = (0, slots_utils_1.TimeSlots)(startTime, endTime, serviceDuration);
    const createdSlot = [];
    for (const slot of timeSlots) {
        const slotPayload = {
            service: payload === null || payload === void 0 ? void 0 : payload.service,
            date: payload === null || payload === void 0 ? void 0 : payload.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: payload === null || payload === void 0 ? void 0 : payload.isBooked,
        };
        const result = yield slots_model_1.Slots.create(slotPayload);
        createdSlot.push(result);
    }
    return createdSlot;
});
const getAvailableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = query;
    const queryObj = { isBooked: "available" };
    if (date) {
        queryObj.date = date;
    }
    if (serviceId) {
        queryObj.service = serviceId;
    }
    const slots = yield slots_model_1.Slots.find(queryObj).populate("service");
    return slots;
});
exports.slotServices = {
    createSlotIntoDB,
    getAvailableSlots,
};
