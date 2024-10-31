import { Router } from "express";
import {
  createArticleCat,
  getArticleCat,
} from "../../controllers/article/category-controller";

const router = Router();

router.route("/").get(getArticleCat).post(createArticleCat);

export default router;
