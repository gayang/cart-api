import { NextFunction, Request, Response } from "express";

// services
import ProductService from "../services/productService";
import productService from "../services/productService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TProductSchema } from "../types/product";

export async function findAllProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const perPage = req.query.perPage;// || 12;
    const pageNo = req.query.perPage || 1;
    const sorting = req.query.pageNo || "-_id";
    const categoryId = req.query.categoryId || "";
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || 9999999;

    const products = await ProductService.findAll(
      Number(perPage),
      Number(pageNo),
      sorting.toString(),
      categoryId.toString(),
      Number(minPrice),
      Number(maxPrice)
    );
    res.json(products);
  } catch (error) {
    console.log(error)
    next(ApiError.internal("Internal server error"));
  }
}

export async function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId;
    const product = await ProductService.findById(productId);
    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }
    res.json(product);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newProduct: TProductSchema = req.body;
    const product = await ProductService.createOne(newProduct);
    res.status(201).json(product);
  } catch (error: any) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId;
    const updateProductData: TProductSchema = req.body;
    const product = await ProductService.findById(productId);
    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }
    const updatedProduct = await ProductService.updateProduct(
      productId,
      updateProductData
    );
    res.json(updatedProduct);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId;
    const product = await ProductService.findById(productId);
    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }
    await ProductService.deleteProduct(productId);
    res.status(204).send("Product deleted successfully");
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function searchProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const perPage = req.query.perPage || 12;
    const pageNo = req.query.perPage || 1;
    const sorting = req.query.pageNo || "-_id";
    let regex = [new RegExp("", "i")];
    if (req.query.title) {
      var search = String(req.query.title).split(" ");
      regex = search.map((value: string) => new RegExp(value, "i"));
    }
    const products = await productService.searchProduct(
      Number(perPage),
      Number(pageNo),
      sorting.toString(),
      regex
    );
    res.json(products);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
