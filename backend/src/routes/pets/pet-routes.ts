import { Router } from "express";
import {
  createPetProfile,
  getAllPetsInfo,
} from "../../controllers/pets/pets-controller";
import { authentication, authorize } from "../../middlewares/authentication";
import {
  createCategory,
  getAllCategory,
} from "../../controllers/pets/category-controller";

const router = Router();

router.route("/").get(getAllPetsInfo);
router.route("/").post(
  // authentication, authorize,
  createPetProfile
);

export default router;
