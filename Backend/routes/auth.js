import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.json({ message: "Signup API Working" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login API Working" });
});

export default router;
