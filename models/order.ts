import mongoose from "mongoose";
import { TOrderSchema } from "../types/order";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order";
// import { OrderAddress } from "./order-address";

const Schema = mongoose.Schema;

const OrderSchema = new Schema<TOrderSchema>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  shipping: {
    address: String,
    method: String,
    cost: Number,
  },
  payment: {
    method: {
      type: String,
      enum: PAYMENT_METHOD,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUS,
    },
  },
  total: Number,
});

//TODO:: Separate order data
// Relation
// OrderSchema.set("toJSON", { virtuals: true });
// OrderSchema.set("toObject", { virtuals: true });

// OrderSchema.virtual("orderAddresses", {
//   ref: "OrderAddress",
//   localField: "_id",
//   foreignField: "order",
// });
// OrderSchema.virtual("orderProducts", {
//   ref: "OrderProduct",
//   localField: "_id",
//   foreignField: "order",
// });

export const Order = mongoose.model("Order", OrderSchema);

//test data for order
// {
//     "cart": [
//       "65522c19b3c09c92f1c51083",
//     ],
//     "shipping": {
//       "address": "123 Main Street, Helsinki, Uusimaa, Finland",
//       "method": "Express",
//       "cost": 50
//     },
//     "payment": {
//       "method": "Credit Card",
//       "status": "Paid"
//     },
//     "total": 2450,
//     "created_at": "2023-11-10T09:59:13Z",
//     "updated_at": "2023-11-10T09:59:13Z"
//   }
