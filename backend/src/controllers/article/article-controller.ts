import { errorMonitor } from "nodemailer/lib/xoauth2";
import Article from "../../models/article/article.model";
import { Request, Response } from "express";

export const CreateArticle = async (req: Request, res: Response) => {
  try {
    const { title, text, images, category } = req.body;

    const postArticle = await Article.create({
      title,
      text,
      images,
      category,
    });
    res.status(201).json({
      message: "Posted article successfully",
      postArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error to post article", error });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({}).populate("category");
    res
      .status(200)
      .json({ message: "Get all articles successfully", articles });
  } catch (error) {
    console.log("Failed to get articles", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getOneArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id).populate("category");
    res.status(200).json({ message: "Get one article successfully", article });
  } catch (error) {
    console.log("Failed to get article data", error);
  }
};

export const deleteArticlePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletePost = await Article.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Deleted articles post successfully", Article });
  } catch (error) {
    console.log("Failed to delete articles post", error);
    res.status(500).json({ message: "Articles post delete error", error });
  }
};
