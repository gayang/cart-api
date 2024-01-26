import mongoose, { Types } from "mongoose";

//model
import { Order } from "../models/order";
import { OrderProduct } from "../models/order-product";

//type
import { TOrderBodySchema } from "../types/order";
import { TProduct } from "../types/product";

//constant
import { PAYMENT_STATUS } from "../constants/order";

//find All order
async function findAll(limit: number, page: number, sort: string) {
  return await Order.find()
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate({
      path: "products",
      select: {
        _id: 1,
        name: 1,
        price: 1,
      },
    })
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
}

//find by id
async function findById(orderId: string | Types.ObjectId) {
  return await Order.findById(orderId)
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate({
      path: "products",
      select: {
        _id: 1,
        name: 1,
        price: 1,
      },
    });
}

async function createOne(
  products: string[] | Types.ObjectId[],
  userId: string | Types.ObjectId,
  orderBody: TOrderBodySchema
) {
  var order = new Order({
    user: userId,
    products: products,
    total: orderBody.total,
    payment: orderBody.payment,
    shipping: orderBody.shipping,
  });
  await order.save();
  return order;
}

async function filterOrderByStatus(
  limit: number,
  page: number,
  sort: string,
  status: (typeof PAYMENT_STATUS)[number]
) {
  const orders = await Order.find({
    "payment.status": status,
  })
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate({
      path: "products",
      select: {
        _id: 1,
        name: 1,
        price: 1,
      },
    })
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
  return orders;
}

async function createOrderProduct(
  product: TProduct,
  orderId: string | Types.ObjectId,
  userId: string | Types.ObjectId,
  quantity: number
) {
  var orderProduct = new OrderProduct({
    user: userId,
    order: orderId,
    product: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    images: product.images,
    quantity: quantity,
  });
  await orderProduct.save();
  return orderProduct;
}

export default {
  createOne,
  findAll,
  findById,
  filterOrderByStatus,
  createOrderProduct,
};
