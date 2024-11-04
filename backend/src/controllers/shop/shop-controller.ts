import { Request, Response } from "express";

import Product from "../../models/product.model";
import Category from "../../models/category.model";
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({})
      .populate("category", "name")
      .sort({ createdAt: -1 });
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
    const { name, price, description, imageUrl, category, quantity } = req.body;

    if (!name || !description || !category || price <= 0 || !imageUrl) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
      quantity: quantity || 0,
    });

    console.log("Created product:", product);
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
