"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceValidation = void 0;
const zod_1 = require("zod");
const CarServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        duration: zod_1.z.number().positive(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.carServiceValidation = {
    CarServiceValidationSchema,
};
