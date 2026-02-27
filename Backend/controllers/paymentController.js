import Razorpay from "razorpay";
import crypto from "crypto";

// ✅ Create Order
export const createPaymentOrder = async (req, res) => {
  try {
    // Razorpay instance inside function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment Verified ✅" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature ❌" });
    }
  } catch (error) {
    console.log("Verify Error:", error);
    res.status(500).json({ error: error.message });
  }
};
