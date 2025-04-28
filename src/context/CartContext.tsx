import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  restaurantId: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  notes?: string;
  options?: {
    name: string;
    value: string;
    price: string;
  }[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => string;
  getItemCount: () => number;
  getRestaurantId: () => string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dk_delivery_cart";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  // Add item to cart
  const addItem = (item: CartItem) => {
    setItems((currentItems) => {
      // Check if we're adding from a different restaurant
      const currentRestaurantId = getRestaurantId();
      if (
        currentRestaurantId &&
        currentRestaurantId !== item.restaurantId &&
        currentItems.length > 0
      ) {
        // Ask user if they want to clear cart
        if (
          window.confirm(
            "Your cart contains items from a different restaurant. Would you like to clear your cart and add this item?",
          )
        ) {
          return [{ ...item }];
        } else {
          return currentItems;
        }
      }

      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...currentItems, { ...item }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    const total = items.reduce((sum, item) => {
      // Extract numeric value from price string (e.g., "250 ETB" -> 250)
      const itemPrice = parseFloat(item.price.split(" ")[0]);

      // Add option prices if any
      const optionsPrice =
        item.options?.reduce((optSum, opt) => {
          const optPrice = parseFloat(opt.price.split(" ")[0]);
          return optSum + (isNaN(optPrice) ? 0 : optPrice);
        }, 0) || 0;

      return (
        sum +
        ((isNaN(itemPrice) ? 0 : itemPrice) + optionsPrice) * item.quantity
      );
    }, 0);

    return `${total.toFixed(0)} ETB`;
  };

  // Get item count
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Get restaurant ID (to ensure all items are from same restaurant)
  const getRestaurantId = () => {
    return items.length > 0 ? items[0].restaurantId : null;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        getRestaurantId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
