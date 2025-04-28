import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Get all orders for a user
router.get("/", protect, getUserOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Update order status (admin only)
router.put("/:id/status", protect, updateOrderStatus);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);

export default router;
