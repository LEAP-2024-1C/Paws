import { Router } from "express";

import {
  createDonations,
  deleteDonationReport,
  getAllDonations,
  getSingleDonation,
  updateDonation,
} from "../../controllers/donation/donation-controller";
import { authentication, authorize } from "../../middlewares/authentication";
import {
  createTransaction,
  getTransactionData,
} from "../../controllers/donation/donation-trans-controller";

const router = Router();

router.route("/").get(getAllDonations);
router.route("/create").post(authentication, authorize, createDonations);

router.route("/transaction").post(createTransaction);
router.route("/transaction/:id").get(getTransactionData);
router.route("/:id").get(getSingleDonation);
router.route("/:id").delete(deleteDonationReport);
router.route("/:id").put(authentication, updateDonation);

export default router;
