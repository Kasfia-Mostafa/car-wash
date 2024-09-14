"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceValidation = void 0;
const zod_1 = require("zod");
const CarServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        duration: zod_1.z.number().positive().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.carServiceValidation = {
    CarServiceValidationSchema,
};
