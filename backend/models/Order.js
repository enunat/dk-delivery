import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: String,
        required: true,
      },
      notes: String,
      options: [
        {
          name: String,
          value: String,
          price: String,
        },
      ],
    },
  ],
  deliveryAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: String,
    postalCode: String,
    notes: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  paymentMethod: {
    type: String,
    enum: ["telebirr", "card", "cash"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ],
    default: "pending",
  },
  subtotal: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    default: "0 ETB",
  },
  total: {
    type: String,
    required: true,
  },
  estimatedDeliveryTime: {
    type: String,
  },
  actualDeliveryTime: Date,
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

// Update the updatedAt field on save
OrderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
