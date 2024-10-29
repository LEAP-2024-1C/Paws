import { Router } from "express";
import {
  CreateArticle,
  getArticles,
} from "../../controllers/article/article-controller";

const router = Router();

router.route("/").get(getArticles);
router.route("/create").post(CreateArticle);

export default router;
