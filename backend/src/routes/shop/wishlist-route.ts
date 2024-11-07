import { Router } from "express";
import {
  addToWishList,
  deleteFromWishList,
  getWishlistData,
} from "../../controllers/shop/wishlist-controller";
import { authentication } from "../../middlewares/authentication";

const router = Router();

router.route("/get").get(authentication, getWishlistData);
router.route("/add").post(authentication, addToWishList);
router.route("/delete").delete(authentication, deleteFromWishList);

export default router;
