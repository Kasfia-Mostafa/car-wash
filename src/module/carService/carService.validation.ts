import { z } from "zod";

const CarServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().positive().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const carServiceValidation = {
  CarServiceValidationSchema,
};
