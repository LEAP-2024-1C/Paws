import { Router } from "express";
import {
  createadoptionPosts,
  getAdoptionInquiries,
  getadoptionPostss,
  getSingleadoptionPosts,
  submitInquiry,
} from "../../controllers/adoption/adoption-controller";

const router = Router();

router.route("/").get(getadoptionPostss);
router.route("/create").post(createadoptionPosts);
router.route("/req").get(getAdoptionInquiries);
router.route("/newreq").post(submitInquiry);
router.route("/:id").get(getSingleadoptionPosts);

export default router;
