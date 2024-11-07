import { Router } from "express";
import {
  CreateArticle,
  deleteArticlePost,
  getArticles,
  getOneArticle,
} from "../../controllers/article/article-controller";

const router = Router();

router.route("/").get(getArticles).post(CreateArticle);
router.route("/:id").get(getOneArticle).delete(deleteArticlePost);

export default router;
