import { Request, Response } from "express";

import Shop from "../../models/product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't get shops" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const product = await Shop.create({ name, price, description, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't create product" });
  }
};
