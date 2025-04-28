import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  getFeaturedRestaurants,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Get all restaurants
router.get("/", getRestaurants);

// Get featured restaurants
router.get("/featured", getFeaturedRestaurants);

// Get restaurant by ID
router.get("/:id", getRestaurantById);

export default router;
