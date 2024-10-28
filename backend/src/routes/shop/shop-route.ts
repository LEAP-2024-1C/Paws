import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../../controllers/shop/shop-controller";

import { authentication } from "../../middlewares/authentication";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/create").post(createProduct);

export default router;
