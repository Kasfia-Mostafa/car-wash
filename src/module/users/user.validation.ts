import { z } from "zod";
import { Role } from "./user.constant";

// Define the Zod schema for TUser
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .max(20, { message: "Password cannot be more than 20 characters" })
      .optional(),
    phone: z.string().nonempty({ message: "Phone number is required" }),
    role: z.nativeEnum(Role).default(Role.admin),
    address: z.object({
      street: z.string().nonempty({ message: "Street is required" }),
      city: z.string().nonempty({ message: "City is required" }),
      state: z.string().nonempty({ message: "State is required" }),
      postalCode: z.string().nonempty({ message: "Postal code is required" }),
      country: z.string().nonempty({ message: "Country is required" }),
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
};
