import Order from "../models/Order.js";
import User from "../models/User.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      restaurant,
      items,
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      discount,
      total,
    } = req.body;

    // Create new order
    const order = await Order.create({
      user: req.user._id,
      restaurant,
      items,
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      discount: discount || "0 ETB",
      total,
      estimatedDeliveryTime: "30-45 min", // Default estimate
    });

    // Add loyalty points to user (1 point per 10 ETB spent)
    const totalInETB = parseInt(total.split(" ")[0]);
    const pointsToAdd = Math.floor(totalInETB / 10);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { loyaltyPoints: pointsToAdd },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("restaurant", "name image");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant", "name image cuisineType")
      .populate("driver", "name phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the user or if user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only admin or restaurant owner can update order status
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.orderStatus = orderStatus;

    // If order is delivered, set actual delivery time
    if (orderStatus === "delivered") {
      order.actualDeliveryTime = Date.now();
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Can only cancel if order is pending or confirmed
    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        message:
          "Cannot cancel order that is already being prepared or out for delivery",
      });
    }

    order.orderStatus = "cancelled";
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
