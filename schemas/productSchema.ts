import mongoose from "mongoose";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .positive(),
  description: z.string({
    required_error: "Description is required",
  }),
  category: z
    .string({
      required_error: "Category is required",
    })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid category ID",
    }),
  stock: z.number({
    required_error: "Stock is required",
  }),
  sizes: z.array(
    z.string({
      required_error: "Size is required",
    })
  ),
  images: z.array(z.string().optional())

});

export const requestSchema = z.object({
  body: ProductSchema,
});
