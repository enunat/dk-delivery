import axios from "axios";

// Define the base URL for API requests
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Restaurant API calls
export const restaurantApi = {
  // Get all restaurants with optional filters
  getRestaurants: async (filters = {}) => {
    try {
      const response = await api.get("/restaurants", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  },

  // Get featured restaurants
  getFeaturedRestaurants: async () => {
    try {
      const response = await api.get("/restaurants/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured restaurants:", error);
      throw error;
    }
  },

  // Get restaurant by ID
  getRestaurantById: async (id: string) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching restaurant with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api;
