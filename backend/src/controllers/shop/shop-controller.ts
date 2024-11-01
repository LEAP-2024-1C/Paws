import { Request, Response } from "express";

import Product from "../../models/product.model";
import Category from "../../models/category.model";
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: "Get all products success", product });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: "Get all categories success", categories });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ message: "Failed to get categories", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("Received product data:", req.body);

    const { name, price, description, imageUrl, category, quantity, size } =
      req.body;
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
      quantity,
      size,
    });

    console.log("Created product:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: "Couldn't create product" });
  }
};
