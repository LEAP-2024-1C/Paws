import { Router } from "express";
import {
  createPetProfile,
  getAllPetsInfo,
} from "../../controllers/pets/pets-controller";

const router = Router();

router.route("/all").get(getAllPetsInfo);
router.route("/create").post(createPetProfile);

export default router;
