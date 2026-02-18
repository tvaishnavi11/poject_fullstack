import Order from "../models/Order.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Order Received 🛒",
      `<h2>New Order</h2>
       <p>Total: ₹${order.totalAmount}</p>
       <p>Order ID: ${order._id}</p>`,
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
