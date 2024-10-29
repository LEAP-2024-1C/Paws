import ArticleCat from "../../models/article/articleCat.model";
import { Request, Response } from "express";

export const getArticleCat = async (req: Request, res: Response) => {
  try {
    const getArticlesCat = await ArticleCat.find({});
    res
      .status(200)
      .json({ message: "Get articles category successfully", getArticleCat });
  } catch (error) {
    console.log("Failed to get all artciles category", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const createArticleCat = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log("article category model", ArticleCat);
    const createCategory = await ArticleCat.create({ name });
    res.status(201).json({ message: "Created article category successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error to create article category", error });
  }
};
