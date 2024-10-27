import { Request, Response } from "express";
import Petcategory from "../../models/pets/petCategory.model";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategories = await Petcategory.find({});
    res.status(200).json({ message: "Succeed", category: allCategories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    const newCategory = await Petcategory.create({
      name,
      description,
    });
    res.status(201).json({
      message: "Created pet category successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
