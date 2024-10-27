import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../../controllers/pets/category-controller";

const router = Router();

router.route("/get").get(getAllCategory);
router.route("/create").post(createCategory);

export default router;
