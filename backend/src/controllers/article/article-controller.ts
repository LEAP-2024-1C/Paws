import Article from "../../models/article.model";
import { Request, Response } from "express";

export const CreateArticle = async (req: Request, res: Response) => {
  try {
    const { title, description, images, category } = req.body;

    const postArticle = await Article.create({
      title,
      description,
      images,
      category,
    });
    res.status(201).json({
      message: "Posted article successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error to post article", error });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({});
    res
      .status(200)
      .json({ message: "Get all articles successfully", articles });
  } catch (error) {
    console.log("Failed to get articles", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// export const deleteArticle = async (req: Request, res: Response) => {
//   const { id } = req.body;

//   try {
//     const findArticle = await Article.find({});
//     findArticle.splice(1);
//     const deleteProductCard = await findArticle.save();
//     res.status(200).json({
//       message: "successfully deleted card",
//       deleteArticle,
//     });
//     console.log("deleted article", deleteArticle);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "failed to delete article" });
//   }
// };
