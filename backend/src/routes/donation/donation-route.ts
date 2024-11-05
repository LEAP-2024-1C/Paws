import { Router } from "express";

import {
  createDonations,
  deleteDonationReport,
  getAllDonations,
  getSingleDonation,
  updateDonation,
} from "../../controllers/donation/donation-controller";
import { authentication, authorize } from "../../middlewares/authentication";

const router = Router();

router.route("/").get(getAllDonations);
router.route("/create").post(authentication, authorize, createDonations); //added auth, authorize
router.route("/:id").get(getSingleDonation);
router.route("/:id").delete(deleteDonationReport);
router.route("/:id").put(authentication, updateDonation);

export default router;
