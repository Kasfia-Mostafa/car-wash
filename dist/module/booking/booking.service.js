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
exports.bookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const carService_model_1 = require("../carService/carService.model");
const slots_model_1 = require("../slots/slots.model");
const user_model_1 = require("../users/user.model");
const createBookingIntoDB = (payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield carService_model_1.CarServiceModel.findById(payload === null || payload === void 0 ? void 0 : payload.serviceId);
    const slot = yield slots_model_1.Slots.findById(payload === null || payload === void 0 ? void 0 : payload.slotId);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
    }
    const user = yield user_model_1.User.findOne({ email: userEmail });
    const result = yield booking_model_1.BookingModel.create(Object.assign(Object.assign({}, payload), { customer: user === null || user === void 0 ? void 0 : user._id }));
    const booking = yield booking_model_1.BookingModel.findById(result === null || result === void 0 ? void 0 : result._id)
        .populate("customer")
        .populate("serviceId")
        .populate("slotId");
    return booking;
});
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.BookingModel.find()
        .populate("customer")
        .populate("serviceId")
        .populate("slotId");
    return bookings;
});
const getMyBookingFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    const userId = user === null || user === void 0 ? void 0 : user.id;
    const bookings = yield booking_model_1.BookingModel.find({ customer: userId })
        .populate("serviceId")
        .populate("slotId");
    return bookings;
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getMyBookingFromDB,
};
