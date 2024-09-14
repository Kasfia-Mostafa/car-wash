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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../module/users/user.model");
const config_1 = __importDefault(require("../app/config"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            throw new AppError_1.default(401, "Authorization token missing or malformed");
        }
        const token = authorizationHeader.split(" ")[1];
        // console.log("Received Token:", token);
        let verifiedToken = null;
        try {
            verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (error) {
            throw new AppError_1.default(401, "Invalid or expired token");
        }
        const { email } = verifiedToken;
        const user = yield user_model_1.User.isUserExistsByCustomEmail(email);
        if (!user) {
            throw new AppError_1.default(401, "User associated with this token not found");
        }
        // Set req.user with the user's details including role
        req.user = { id: user._id, email: user.email, role: user.role };
        if (!requiredRoles.includes(user.role)) {
            throw new AppError_1.default(403, "You do not have permission to access this resource");
        }
        next();
    }));
};
exports.auth = auth;
