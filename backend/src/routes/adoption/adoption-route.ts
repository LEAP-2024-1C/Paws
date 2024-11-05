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
  getOwnAdoptionInquiries,
} from "../../controllers/adoption/adoption-controller";
import { authentication, authorize } from "../../middlewares/authentication";

const router = Router();

router.route("/").get(getAllAdoptionPosts);
router.route("/create").post(authentication, authorize, createAdoptionPost);
router.route("/req").get(getAdoptionInquiries);
router.route("/newreq").post(authentication, submitInquiry);
router
  .route("/:id")
  .get(getAdoptionPost)
  .patch(updateAdoptionPost)
  .put(updateAdoptionPost)
  .delete(deleteAdoptionPost);
router.route("/req/:id").patch(updateAdoptionRequest);
router.route("/req/own").get(authentication, getOwnAdoptionInquiries);
export default router;
