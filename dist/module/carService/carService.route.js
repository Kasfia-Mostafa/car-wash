"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const carService_validation_1 = require("./carService.validation");
const carService_controller_1 = require("./carService.controller");
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(user_constant_1.Role.admin), (0, validateRequest_1.default)(carService_validation_1.carServiceValidation.CarServiceValidationSchema), carService_controller_1.CarServiceControllers.createCarService);
router.get("/", carService_controller_1.CarServiceControllers.getAllCarService);
router.get("/:carId", carService_controller_1.CarServiceControllers.getSingleCarService);
router.put("/:carId", (0, validateRequest_1.default)(carService_validation_1.carServiceValidation.CarServiceValidationSchema), carService_controller_1.CarServiceControllers.updateCarService);
exports.CarServiceRoutes = router;
