import { Router } from "express";

import {
  addDonationComment,
  createDonations,
  deleteDonationReport,
  getAllDonations,
  getSingleDonation,
  updateDonation,
} from "../../controllers/donation/donation-controller";

const router = Router();

router.route("/").get(getAllDonations);
router.route("/create").post(createDonations);
router.route("/:id").get(getSingleDonation);
router.route("/:id").delete(deleteDonationReport);
router.route("/:id").patch(updateDonation);
router.route("/comment/:id").post(addDonationComment);

export default router;
