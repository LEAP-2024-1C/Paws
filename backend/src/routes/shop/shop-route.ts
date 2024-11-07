import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getAllCategories,
  getProductById,
  deleteProduct,
} from "../../controllers/shop/shop-controller";

import { authentication } from "../../middlewares/authentication";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/create").post(createProduct);
router.route("/categories").get(getAllCategories);
router.route("/:id").get(getProductById).delete(deleteProduct);
export default router;
