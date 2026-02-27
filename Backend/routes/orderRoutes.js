import express from "express";
import { sendOrderConfirmation } from "../controllers/orderController.js";

const router = express.Router();

router.post("/send-confirmation", sendOrderConfirmation);

export default router;
