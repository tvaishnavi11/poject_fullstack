import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
const Host = process.env.Host || "127.0.0.1";
app.listen(PORT, Host, () => {
  console.log(`Server running on port http://${Host}:${PORT}`);
});
