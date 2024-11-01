import { Router } from "express";
import {
  createAdoptionPost,
  getAdoptionInquiries,
  getAllAdoptionPosts,
  getAdoptionPost,
  submitInquiry,
  deleteAdoptionPost,
  updateAdoptionPost,
  updateAdoptionRequest,
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
router.route("/req/:id").patch(updateAdoptionRequest);

export default router;
