import { Router } from "express";
import { authentication } from "../../middlewares/authentication";
import {
  createSos,
  getAllSos,
  getAllSOSReports,
  updateSOSStatus,
} from "../../controllers/sos/sos-controller";
const router = Router();

router.route("/").get(getAllSos);
router.route("/create").post(createSos);
router.get("/reports", getAllSOSReports);
router.patch("/reports/:id/status", updateSOSStatus);

export default router;
