import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isPromoted: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["Nearby", "Top Viewed", "Best Offers"],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: {
    street: String,
    city: String,
    region: String,
    postalCode: String,
  },
  menu: [
    {
      name: String,
      description: String,
      price: String,
      image: String,
      category: String,
      isVegetarian: Boolean,
      isSpicy: Boolean,
    },
  ],
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index for location-based queries
RestaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
