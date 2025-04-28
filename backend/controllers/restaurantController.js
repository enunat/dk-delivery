// Mock data for now - will be replaced with database calls
const restaurants = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=400&q=70",
    name: "Habesha Kitfo House",
    cuisineType: "Traditional Ethiopian",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "45 ETB",
    isPromoted: true,
    discount: "15% OFF",
    price: "250 ETB",
    category: "Nearby",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=400&q=70",
    name: "Addis Ababa Injera",
    cuisineType: "Ethiopian",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: "50 ETB",
    discount: "10% OFF",
    price: "180 ETB",
    category: "Top Viewed",
  },
  // More restaurants would be here
];

// Get all restaurants with optional filtering
export const getRestaurants = (req, res) => {
  try {
    const { category, search } = req.query;

    let filteredRestaurants = [...restaurants];

    // Apply category filter if provided
    if (category) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.category === category,
      );
    }

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchLower) ||
          restaurant.cuisineType.toLowerCase().includes(searchLower),
      );
    }

    res.status(200).json(filteredRestaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurant by ID
export const getRestaurantById = (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured restaurants
export const getFeaturedRestaurants = (req, res) => {
  try {
    // For now, just return restaurants marked as promoted
    const featured = restaurants.filter((r) => r.isPromoted);
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
