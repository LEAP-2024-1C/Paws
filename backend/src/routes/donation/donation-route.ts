import { Router } from "express";

import {
  createDonations,
  getAllDonations,
  getSingleDonation,
} from "../../controllers/donation/donation-controller";

const router = Router();

router.route("/").get(getAllDonations);
router.route("/create").post(createDonations);
router.route("/:id").get(getSingleDonation);

export default router;
