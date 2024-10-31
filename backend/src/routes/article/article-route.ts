import { Router } from "express";
import {
  CreateArticle,
  getArticles,
  getOneArticle,
} from "../../controllers/article/article-controller";

const router = Router();

router.route("/").get(getArticles).post(CreateArticle);
router.route("/:id").get(getOneArticle);

export default router;
