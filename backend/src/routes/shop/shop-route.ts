import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../../controllers/shop/shop-controller";

import { authentication } from "../../middlewares/authentication";

const router = Router();

router.route("/all").get(authentication, getAllProducts);
router.route("/create").post(authentication, createProduct);

export default router;
