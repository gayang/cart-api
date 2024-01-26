// types
import mongoose, { Types } from "mongoose";

//model
import { Product } from "../models/product";

//type
import { TProduct, TProductSchema } from "../types/product";

async function findAll(
  perPage: number,
  pageNo: number,
  sorting: string,
  categoryId: string,
  minPrice: number,
  maxPrice: number
) {
  let query: any = {};
  if (categoryId) {
    query.category = categoryId;
  }
  query.price = { $gte: minPrice, $lte: maxPrice };

  const products = await Product.find(query)
    .populate("category")
    .populate("sizes")
    .limit(perPage)
    .skip(perPage * (pageNo - 1))
    .sort(sorting);
  return products;
}

async function findById(productId: string | Types.ObjectId) {
  return await Product.findById(productId);
}

async function createOne(product: TProductSchema) {
  const newProduct = new Product(product);
  return await newProduct.save();
}

async function updateProduct(
  productId: string | Types.ObjectId,
  product: TProductSchema
) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  });
  return updatedProduct;
}

async function deleteProduct(productId: string | Types.ObjectId) {
  return await Product.findByIdAndDelete(productId);
}

async function searchProduct(
  perPage: number,
  pageNo: number,
  sorting: string,
  regex: any
) {
  const products = await Product.find({
    name: { $in: regex },
  })
    .populate("category")
    .populate("sizes")
    .limit(perPage)
    .skip(perPage * (pageNo - 1))
    .sort(sorting);
  return products;
}

export default {
  findById,
  findAll,
  createOne,
  updateProduct,
  deleteProduct,
  searchProduct,
};
