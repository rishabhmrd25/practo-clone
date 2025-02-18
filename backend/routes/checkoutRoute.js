// routes/checkoutRoute.js
const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/checkout.controller.js");

const router = express.Router();

// Route for creating new appointment booking
router.post("/booking", createOrder);

// Route for verifying Razorpay payment
router.post("/verify", verifyPayment);

module.exports = router;