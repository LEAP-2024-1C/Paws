import { Router } from "express";
import { authentication } from "../../middlewares/authentication";
import { createSos, getAllSos } from "../../controllers/sos/sos-controller";
const router = Router();

router.route("/").get(getAllSos);
router.route("/create").post(createSos);

export default router;
