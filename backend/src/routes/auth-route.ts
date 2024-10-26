import { Router } from "express";
import {
  getCurrentUser,
  login,
  sendRecoverEmail,
  signup,
  verifyOtp,
  verifyPassword,
} from "../controllers/auth-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/verify-password").post(verifyPassword);
router.route("/resend-pass").post(sendRecoverEmail);
router.route("/verify-otp").post(verifyOtp);
router.route("/user").get(authentication, getCurrentUser);
router.route("/login").post(login);
router.route("/signup").post(signup);

export default router;
