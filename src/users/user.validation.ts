import { z } from "zod";
import { Role } from "./user.constant";

// Define the Zod schema for TUser
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .max(20, { message: "Password cant not be more then 20 characters" })
      .optional(),
    phone: z.string(),
    role: z.nativeEnum(Role).default(Role.admin),
    address: z.string(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
