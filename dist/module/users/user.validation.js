"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
// Define the Zod schema for TUser
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({
            invalid_type_error: "Password must be string",
        })
            .max(20, { message: "Password cant not be more then 20 characters" })
            .optional(),
        phone: zod_1.z.string(),
        role: zod_1.z.nativeEnum(user_constant_1.Role).default(user_constant_1.Role.admin),
        address: zod_1.z.string(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
exports.UserValidation = {
    createUserValidationSchema: exports.createUserValidationSchema, loginValidationSchema
};
