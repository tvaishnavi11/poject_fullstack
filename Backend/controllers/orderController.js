import transporter from "../config/mailer.js";

export const sendOrderConfirmation = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body); // ✅ Debug log

    const { orderId, userEmail, userName, items, total } = req.body;

    // ✅ Only check truly required fields
    if (!orderId || !userEmail) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ✅ Safe defaults
    const safeUserName = userName || "Customer";
    const safeItems = Array.isArray(items) ? items : [];
    const safeTotal = total || 0;

    // ✅ Create item list safely
    const itemList =
      safeItems.length > 0
        ? safeItems
            .map(
              (item) =>
                `${item.name} - Qty: ${item.quantity} - ₹${
                  item.price * item.quantity
                }`,
            )
            .join("\n")
        : "No items found";

    // ✅ Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Order Confirmation - ${orderId}`,
      text: `
Hello ${safeUserName},

Thank you for your order!

Order ID: ${orderId}

Items:
${itemList}

Total: ₹${safeTotal}

We will deliver your order soon.

Thank you for shopping with us!
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Email failed",
      error: error.message,
    });
  }
};
