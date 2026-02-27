const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ Send Order Confirmation Email
router.post("/send-confirmation", async (req, res) => {
  try {
    const { orderId, userEmail, userName, items, total } = req.body;

    // 🔴 Validation
    if (!orderId || !userEmail || !items || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your gmail
        pass: process.env.EMAIL_PASSWORD, // app password
      },
    });

    // ✅ Create Items HTML
    const itemsHtml = items
      .map(
        (item) =>
          `<li>${item.name} (Qty: ${item.quantity}) - ₹ ${
            item.price * item.quantity
          }</li>`,
      )
      .join("");

    // ✅ Mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <h2>Hello ${userName},</h2>
        <p>Thank you for your order!</p>

        <h3>Order ID: ${orderId}</h3>

        <ul>
          ${itemsHtml}
        </ul>

        <h3>Total Amount: ₹ ${total}</h3>

        <p>Your order will be delivered soon 🚚</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

module.exports = router;
