import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { log } from "console";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

console.log("This is serevereereer");


// Placing user order for frontend
const placeOrder = async (req, res) => {
  console.log("Hitted place order");
  const frontend_url = "https://vegix-full-stack-frontend.onrender.com";
  try {
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `${req.body.userId}_${Date.now()}`,
    });

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayKey: process.env.RAZORPAY_API_KEY, // Send Razorpay Key to frontend
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creating order" });
  }
};

const verifyOrder = async (req, res) => {
  console.log("verifyOrder function called");
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,  userId, items, amount, address, newOrderId } = req.body;

    if (!userId) {
      console.error("User ID is missing!");
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    console.log("Received Razorpay Order ID:", razorpay_order_id);
    console.log("Received Razorpay Payment ID:", razorpay_payment_id);
    console.log("Received Razorpay Signature:", razorpay_signature);
    console.log("Received User ID:", userId);
    console.log("Received Items:", items);
    console.log("Received Amount:", amount);
    console.log("Received Address:", address);
    console.log("Received New Order ID:", newOrderId);
    // Generate the expected signature using the key secret
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = shasum.digest("hex");

    console.log("Expected Signature:", expectedSignature);
    console.log("Comparing expected and received signatures...");


    // Compare the generated signature with the received signature
    if (expectedSignature === razorpay_signature) {
      console.log("Signatures match. Proceeding to save order.");
      // Save the order to the database
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
        paymentId: razorpay_payment_id,
        status: "Paid",
      });
      await newOrder.save();
      console.log("Order saved successfully:", newOrder);

      // Clear the user's cart data
      await orderModel.findByIdAndUpdate(
        newOrderId, // Use correct method to find by ID
        { status: "Paid", paymentId: razorpay_payment_id },
        {new: true}
      );

      res.json({ success: true, message: "Payment verified and order saved successfully" });
    } else {
      res.json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in payment verification" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
