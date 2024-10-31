import { Router } from "express";
import {
  createAdoptionPost,
  getAdoptionInquiries,
  getAllAdoptionPosts,
  getAdoptionPost,
  submitInquiry,
  deleteAdoptionPost,
  updateAdoptionPost,
} from "../../controllers/adoption/adoption-controller";

const router = Router();

router.route("/").get(getAllAdoptionPosts);
router.route("/create").post(createAdoptionPost);
router.route("/req").get(getAdoptionInquiries);
router.route("/newreq").post(submitInquiry);
router
  .route("/:id")
  .get(getAdoptionPost)
  .patch(updateAdoptionPost)
  .delete(deleteAdoptionPost);

export default router;
