import express from "express";
import {
  signup,
  login,
  verifyAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyAccount);
router.post("/forgot-password", forgotPassword);
router.post("/reset/:token", resetPassword);

export default router;
