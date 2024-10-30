import { Router } from "express";
import {
  createDonations,
  getAllDonations,
<<<<<<< HEAD:backend/src/routes/donation/donation-route.ts
  getSingleDonation,
=======
>>>>>>> 8131707 (edit):backend/src/routes/donation/donation-routes.ts
} from "../../controllers/donation/donation-controller";

const router = Router();

router.route("/").get(getAllDonations);
router.route("/create").post(createDonations);
router.route("/:id").get(getSingleDonation);
export default router;
