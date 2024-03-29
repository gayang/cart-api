import express from "express";
import {
  createOrder,
  findAllOrder,
  findOrderById,
} from "../controllers/orderController";
import { validateParams } from "../middlewares/paramsValidate";
import { authenticate } from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidate";
import { OrderBodySchema } from "../schemas/orderBodySchema";

const router = express.Router();

router.get("/",
  //authenticate,
  findAllOrder);

router.get("/:orderId",
  //authenticate,
  validateParams,
  findOrderById);

router.post("/",
  //authenticate,
  validateSchema(OrderBodySchema),
  createOrder);

export default router;
