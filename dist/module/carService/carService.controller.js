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
const createCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_service_1.CarServices.createCarServiceIntoDB(req.body);
    // console.log(result)
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: result,
    });
}));
const getAllCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_service_1.CarServices.getAllCarServiceFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
}));
const getSingleCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield carService_service_1.CarServices.getSingleCarServiceFromDB(carId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    });
}));
const updateCarService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield carService_service_1.CarServices.updateCarServiceIntoDB(carId, req.body);
    res.status(200).json({
        success: true,
        message: "Car service updated successfully!",
        data: result,
    });
}));
exports.CarServiceControllers = {
    createCarService,
    getAllCarService,
    getSingleCarService,
    updateCarService,
};
