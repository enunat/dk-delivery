import api from "./api";

// Types
export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  notes?: string;
  options?: {
    name: string;
    value: string;
    price: string;
  }[];
}

export interface DeliveryAddress {
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
  notes?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface Order {
  _id: string;
  user: string;
  restaurant: {
    _id: string;
    name: string;
    image: string;
  };
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: "telebirr" | "card" | "cash";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  subtotal: string;
  deliveryFee: string;
  discount: string;
  total: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: Date;
  driver?: {
    _id: string;
    name: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderData {
  restaurant: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: "telebirr" | "card" | "cash";
  subtotal: string;
  deliveryFee: string;
  discount?: string;
  total: string;
}

// Order service
export const orderService = {
  // Create a new order
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get all orders for the current user
  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
      throw error;
    }
  },
};

export default orderService;
