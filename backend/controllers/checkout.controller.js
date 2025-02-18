// controllers/checkout.controller.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order and initiate booking
exports.createOrder = async (req, res) => {
    try {
      const { amount, doctorId, clinicId, appointmentDate, slotTime } = req.body;
  
      // Create Razorpay order
      const options = {
        amount: amount * 100, // Converting to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          doctorId,
          clinicId,
          appointmentDate,
          slotTime
        }
      };
  
      const order = await razorpay.orders.create(options);
  
      // Return Razorpay order details to the frontend for initiating the payment
      res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      });
  
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({ 
        error: "Failed to create order",
        details: error.message 
      });
    }
  };

// Verify payment and confirm booking
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature 
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Check if signatures match
    if (expectedSignature === razorpay_signature) {
      // Get order details
      const order = await razorpay.orders.fetch(razorpay_order_id);
      
      // Update appointment status in database
      // Note: Implement your database update logic here
      
      // Send confirmation email/SMS
      // Note: Implement your notification logic here

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({
      error: "Payment verification failed",
      details: error.message
    });
  }
};

// Helper function to fetch appointment details
async function getAppointmentByOrderId(orderId) {
  // Implement your database query logic here
  // This should return the appointment details associated with the order
  return null;
}

// Helper function to update appointment status
async function updateAppointmentStatus(orderId, status, paymentId) {
  // Implement your database update logic here
  // This should update the appointment status and payment details
  return null;
}