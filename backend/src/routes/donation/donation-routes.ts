import { Router } from "express";
import {
  createDonations,
  getAllDonations,
} from "../../controllers/donation-controller";

const router = Router();

router.route("/get").get(getAllDonations);
router.route("/create").post(createDonations);

export default router;
