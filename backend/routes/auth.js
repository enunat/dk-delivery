import express from "express";
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user profile
router.get("/profile", protect, getUserProfile);

// Update user profile
router.put("/profile", protect, updateUserProfile);

export default router;
