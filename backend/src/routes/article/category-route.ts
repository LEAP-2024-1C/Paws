import { Router } from "express";
import {
  createArticleCat,
  getArticleCat,
} from "../../controllers/article/category-controller";

const router = Router();

router.route("/all").get(getArticleCat);
router.route("/create").post(createArticleCat);

export default router;
