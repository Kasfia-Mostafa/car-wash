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
exports.CarServiceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const carService_service_1 = require("./carService.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Create a car service
const createCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_service_1.CarServices.createCarServiceIntoDB(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: result,
    });
}));
// Get all car services
const getAllCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_service_1.CarServices.getAllCarServiceFromDB();
    // Check if the result is empty
    if (!result || result.length === 0) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
}));
// Get a single car service
const getSingleCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield carService_service_1.CarServices.getSingleCarServiceFromDB(carId);
    // Check if the result is null
    if (!result) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
}));
// Update a car service
const updateCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield carService_service_1.CarServices.updateCarServiceIntoDB(carId, req.body);
    // Check if the result is null
    if (!result) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Car service updated successfully!",
        data: result,
    });
}));
// Delete a car service
const deleteCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield carService_service_1.CarServices.deleteCarServiceFromDB(carId);
    // Check if the result is null
    if (!result) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Car service deleted successfully!",
        data: result,
    });
}));
exports.CarServiceControllers = {
    createCarService,
    getAllCarService,
    getSingleCarService,
    updateCarService,
    deleteCarService,
};
