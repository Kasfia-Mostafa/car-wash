import { z } from "zod";

const CarServiceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number().positive(),
    isDeleted: z.boolean().optional(),
  }),
});

export const carServiceValidation = {
  CarServiceValidationSchema,
};
