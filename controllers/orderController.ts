import { Request, Response, NextFunction } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//services
import OrderService from "../services/orderService";
import CartService from "../services/cartService";

//type
import { TOrderBodySchema } from "../types/order";
import { IAuthorizationRequest } from "../types/authorization";

//constant
import { PAYMENT_STATUS } from "../constants/order";

//find all order
export async function findAllOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || "created_at: -1";
  const status = req.query.status as (typeof PAYMENT_STATUS)[number];
  try {
    let orders;
    if (status) {
      // demo api route localhost:8080/api/v1/orders?status=Paid&page=1&limit=10&sort=-1
      orders = await OrderService.filterOrderByStatus(
        Number(limit),
        Number(page),
        sort.toLocaleString(),
        status
      );
    } else {
      orders = await OrderService.findAll(
        Number(limit),
        Number(page),
        sort.toLocaleString()
      );
    }
    res.json(orders);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//find single order
export async function findOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = req.params.orderId;
    const order = await OrderService.findById(orderId);
    if (!order) {
      next(ApiError.resourceNotFound("Order not found!."));
      return;
    }
    res.json(order);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//Post /orders
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const orderBody: TOrderBodySchema = req.body;
    const carts = await CartService.findCartItemsByUserIdAndItemIds(
      user._id,
      orderBody.cart
    );
    if (!carts?.length) {
      return next(ApiError.badRequest("Invalid cart ids."));
    }
    const productIds = carts.map((cart) => cart.product._id);
    // create
    const order = await OrderService.createOne(productIds, user._id, orderBody);
    // delete from cart if order is created
    await CartService.deleteCartItemsByUserIdAndItemIds(
      user._id,
      orderBody.cart
    );
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error: any) {
    next(ApiError.internal("Internal server error"));
  }
}
