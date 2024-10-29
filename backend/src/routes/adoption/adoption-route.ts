import { Router } from "express";
import {
  createAdoptionPost,
  getAdoptionInquiries,
  getAdoptionPosts,
  submitInquiry,
} from "../../controllers/adoption/adoption-controller";

const router = Router();

router.route("/").get(getAdoptionPosts);
router.route("/create").post(createAdoptionPost);
router.route("/req").get(getAdoptionInquiries);
router.route("/newreq").post(submitInquiry);

export default router;
