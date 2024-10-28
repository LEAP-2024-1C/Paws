import { Request, Response } from "express";

import Product from "../../models/product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't get shops" });
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
