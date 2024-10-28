import { Router } from "express";
import {
  createAdoptionPost,
  getAdoptionPosts,
} from "../../controllers/adoption/adoption-controller";

const router = Router();

router.route("/").get(getAdoptionPosts);
router.route("/create").post(createAdoptionPost);

export default router;
