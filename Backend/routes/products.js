import express from "express";

const router = express.Router();

// Get Products
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1500 },
  ]);
});

// Add Product
router.post("/", (req, res) => {
  const newProduct = req.body;
  res.status(201).json({
    message: "Product Created Successfully",
    product: newProduct,
  });
});

export default router;
