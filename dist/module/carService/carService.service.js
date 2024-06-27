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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const carService_model_1 = require("./carService.model");
const createCarServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_model_1.CarServiceModel.create(payload);
    console.log(result);
    return result;
});
const getAllCarServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_model_1.CarServiceModel.find();
    return result;
});
const getSingleCarServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_model_1.CarServiceModel.findById(id);
    return result;
});
const updateCarServiceIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCarService = yield carService_model_1.CarServiceModel.findByIdAndUpdate({ _id }, payload);
    return updatedCarService;
});
exports.CarServices = {
    createCarServiceIntoDB,
    getAllCarServiceFromDB,
    getSingleCarServiceFromDB,
    updateCarServiceIntoDB,
};
