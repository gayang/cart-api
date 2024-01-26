import { z } from "zod";
import { USERROLES } from "../constants/roles";

export const UserSchema = z.strictObject({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  firstName: z
    .string({
      required_error: "FirstName is required",
    })
    .min(2)
    .max(50),
  lastName: z
    .string({
      required_error: "LastName is required",
    })
    .min(2)
    .max(50),
  role: z.enum(USERROLES),
  avatar: z.string().optional(),
  phoneNumber: z.string().optional(),
});
