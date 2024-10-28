import { Router } from "express";
import { authentication } from "../../middlewares/authentication";
import { createSos, getAllSos } from "../../controllers/sos/sos-controller";
const router = Router();

router.route("/sos").get(authentication, getAllSos);
router.route("/sos").post(authentication, createSos);

export default router;
