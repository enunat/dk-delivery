import React, { useState, useEffect } from "react";
import Header from "./Header";
import LanguageSelector from "./LanguageSelector";
import RestaurantFilters from "./RestaurantFilters";
import FeaturedSection from "./FeaturedSection";
import RestaurantSection from "./RestaurantSection";
import BottomNavigation from "./BottomNavigation";

const Home = () => {
  const [language, setLanguage] = useState<"amharic" | "english">("english");
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [cartItems, setCartItems] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    cuisine: [],
    location: [],
    price: [],
    rating: [],
  });

  // Simulate loading user data
  useEffect(() => {
    // Check if user has already selected language
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage) {
        setLanguage(savedLanguage as "amharic" | "english");
        setShowLanguageSelector(false);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Continue with default language if localStorage is not available
    }

    // Set meta viewport for mobile
    const viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(meta);
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage: "amharic" | "english") => {
    setLanguage(selectedLanguage);
    setShowLanguageSelector(false);
    try {
      localStorage.setItem("preferredLanguage", selectedLanguage);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as "amharic" | "english");
    try {
      localStorage.setItem("preferredLanguage", newLanguage);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    // In a real app, this would trigger API calls to filter restaurants
  };

  // Add to cart handler
  const handleAddToCart = () => {
    setCartItems((prev) => prev + 1);
  };

  // Featured restaurants data with more Ethiopian foods
  const featuredRestaurants = [
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
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=70",
      name: "Merkato Spice",
      cuisineType: "Ethiopian Fusion",
      rating: 4.5,
      deliveryTime: "30-45 min",
      deliveryFee: "55 ETB",
      price: "220 ETB",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=400&q=70",
      name: "Shiro Paradise",
      cuisineType: "Vegan Ethiopian",
      rating: 4.7,
      deliveryTime: "20-35 min",
      deliveryFee: "40 ETB",
      isPromoted: true,
      discount: "20% OFF",
      price: "150 ETB",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1535400875775-0269e7a919af?w=400&q=70",
      name: "Doro Wat Express",
      cuisineType: "Ethiopian",
      rating: 4.4,
      deliveryTime: "35-50 min",
      deliveryFee: "60 ETB",
      price: "280 ETB",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
      name: "Beyaynetu Platter",
      cuisineType: "Vegetarian Ethiopian",
      rating: 4.9,
      deliveryTime: "15-25 min",
      deliveryFee: "35 ETB",
      isPromoted: true,
      discount: "25% OFF",
      price: "200 ETB",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400&q=70",
      name: "Tibs & Tej House",
      cuisineType: "Traditional Ethiopian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "55 ETB",
      discount: "10% OFF",
      price: "320 ETB",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=70",
      name: "Buna Coffee House",
      cuisineType: "Ethiopian Coffee & Snacks",
      rating: 4.8,
      deliveryTime: "10-20 min",
      deliveryFee: "30 ETB",
      price: "120 ETB",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=70",
      name: "Kitfo Special",
      cuisineType: "Traditional Ethiopian",
      rating: 4.9,
      deliveryTime: "25-35 min",
      deliveryFee: "55 ETB",
      discount: "15% OFF",
      price: "290 ETB",
    },
    {
      id: "10",
      image:
        "https://images.unsplash.com/photo-1541518763669-27fef9b49467?w=400&q=70",
      name: "Addis Tej House",
      cuisineType: "Ethiopian Drinks",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: "40 ETB",
      price: "150 ETB",
    },
    {
      id: "11",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=70",
      name: "Axum Vegetarian",
      cuisineType: "Vegan Ethiopian",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: "45 ETB",
      isPromoted: true,
      price: "180 ETB",
    },
    {
      id: "12",
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=70",
      name: "Lalibela Cuisine",
      cuisineType: "Traditional Ethiopian",
      rating: 4.8,
      deliveryTime: "30-40 min",
      deliveryFee: "60 ETB",
      discount: "20% OFF",
      price: "250 ETB",
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
      name: "Gondar Spice",
      cuisineType: "Ethiopian Fusion",
      rating: 4.5,
      deliveryTime: "25-35 min",
      deliveryFee: "50 ETB",
      price: "220 ETB",
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
      name: "Awash Valley",
      cuisineType: "Ethiopian",
      rating: 4.4,
      deliveryTime: "35-45 min",
      deliveryFee: "65 ETB",
      isPromoted: true,
      discount: "10% OFF",
      price: "270 ETB",
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70",
      name: "Abyssinia Delights",
      cuisineType: "Traditional Ethiopian",
      rating: 4.9,
      deliveryTime: "20-30 min",
      deliveryFee: "45 ETB",
      price: "230 ETB",
    },
    {
      id: "16",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=70",
      name: "Addis Coffee Roasters",
      cuisineType: "Ethiopian Coffee",
      rating: 4.8,
      deliveryTime: "15-25 min",
      deliveryFee: "35 ETB",
      discount: "15% OFF",
      price: "120 ETB",
    },
    {
      id: "17",
      image:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&q=70",
      name: "Harar Spice Market",
      cuisineType: "Ethiopian Spices",
      rating: 4.6,
      deliveryTime: "25-35 min",
      deliveryFee: "50 ETB",
      price: "180 ETB",
    },
    {
      id: "18",
      image:
        "https://images.unsplash.com/photo-1578861256457-a6a0bfb6b8a5?w=400&q=70",
      name: "Teff Bakery",
      cuisineType: "Ethiopian Bread",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: "40 ETB",
      isPromoted: true,
      discount: "20% OFF",
      price: "150 ETB",
    },
  ];

  // Regular restaurants data with more Ethiopian options and categories
  const allRestaurants = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=70",
      name: "Habesha Restaurant",
      cuisineType: "Ethiopian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "50 ETB",
      isPromoted: true,
      discount: "15% OFF",
      price: "180 ETB",
      category: "Nearby",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=300&q=70",
      name: "Yod Abyssinia",
      cuisineType: "Traditional Ethiopian",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: "60 ETB",
      discount: "10% OFF",
      price: "250 ETB",
      category: "Top Viewed",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=300&q=70",
      name: "Kategna",
      cuisineType: "Ethiopian",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "45 ETB",
      price: "200 ETB",
      category: "Nearby",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=300&q=70",
      name: "2000 Habesha",
      cuisineType: "Ethiopian Fusion",
      rating: 4.3,
      deliveryTime: "35-45 min",
      deliveryFee: "55 ETB",
      price: "220 ETB",
      category: "Best Offers",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=70",
      name: "Effoi Pizza",
      cuisineType: "Italian",
      rating: 4.6,
      deliveryTime: "25-35 min",
      deliveryFee: "65 ETB",
      isPromoted: true,
      discount: "20% OFF",
      price: "280 ETB",
      category: "Best Offers",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=70",
      name: "Addis Cuisine",
      cuisineType: "Ethiopian",
      rating: 4.4,
      deliveryTime: "30-40 min",
      deliveryFee: "50 ETB",
      price: "190 ETB",
      category: "Nearby",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=70",
      name: "Beyaynetu Platter",
      cuisineType: "Vegetarian Ethiopian",
      rating: 4.9,
      deliveryTime: "15-25 min",
      deliveryFee: "35 ETB",
      isPromoted: true,
      discount: "25% OFF",
      price: "200 ETB",
      category: "Top Viewed",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=300&q=70",
      name: "Tibs & Tej House",
      cuisineType: "Traditional Ethiopian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "55 ETB",
      discount: "10% OFF",
      price: "320 ETB",
      category: "Best Offers",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&q=70",
      name: "Buna Coffee House",
      cuisineType: "Ethiopian Coffee & Snacks",
      rating: 4.8,
      deliveryTime: "10-20 min",
      deliveryFee: "30 ETB",
      price: "120 ETB",
      category: "Top Viewed",
    },
    {
      id: "10",
      image:
        "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=300&q=70",
      name: "Enjera & Wot",
      cuisineType: "Traditional Ethiopian",
      rating: 4.6,
      deliveryTime: "25-40 min",
      deliveryFee: "45 ETB",
      discount: "15% OFF",
      price: "230 ETB",
      category: "Nearby",
    },
    {
      id: "11",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=70",
      name: "Mesob Delights",
      cuisineType: "Ethiopian",
      rating: 4.5,
      deliveryTime: "30-45 min",
      deliveryFee: "55 ETB",
      price: "210 ETB",
      category: "Best Offers",
    },
    {
      id: "12",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=70",
      name: "Addis Spice Garden",
      cuisineType: "Ethiopian Fusion",
      rating: 4.7,
      deliveryTime: "20-35 min",
      deliveryFee: "40 ETB",
      isPromoted: true,
      discount: "20% OFF",
      price: "270 ETB",
      category: "Top Viewed",
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70",
      name: "Lalibela Traditional",
      cuisineType: "Ethiopian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "50 ETB",
      price: "240 ETB",
      category: "Nearby",
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=70",
      name: "Axum Cafe",
      cuisineType: "Ethiopian Coffee",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: "35 ETB",
      discount: "10% OFF",
      price: "130 ETB",
      category: "Top Viewed",
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=300&q=70",
      name: "Harar Spice Market",
      cuisineType: "Ethiopian Spices",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "45 ETB",
      price: "180 ETB",
      category: "Best Offers",
    },
    {
      id: "16",
      image:
        "https://images.unsplash.com/photo-1578861256457-a6a0bfb6b8a5?w=300&q=70",
      name: "Teff Bakery",
      cuisineType: "Ethiopian Bread",
      rating: 4.7,
      deliveryTime: "15-25 min",
      deliveryFee: "40 ETB",
      isPromoted: true,
      discount: "15% OFF",
      price: "150 ETB",
      category: "Nearby",
    },
    {
      id: "17",
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=70",
      name: "Gondar House",
      cuisineType: "Traditional Ethiopian",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: "60 ETB",
      price: "260 ETB",
      category: "Top Viewed",
    },
    {
      id: "18",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=70",
      name: "Awash Valley",
      cuisineType: "Ethiopian",
      rating: 4.4,
      deliveryTime: "25-35 min",
      deliveryFee: "50 ETB",
      discount: "20% OFF",
      price: "220 ETB",
      category: "Best Offers",
    },
    {
      id: "19",
      image:
        "https://images.unsplash.com/photo-1541518763669-27fef9b49467?w=300&q=70",
      name: "Addis Tej House",
      cuisineType: "Ethiopian Drinks",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: "35 ETB",
      price: "140 ETB",
      category: "Nearby",
    },
    {
      id: "20",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&q=70",
      name: "Axum Vegetarian",
      cuisineType: "Vegan Ethiopian",
      rating: 4.8,
      deliveryTime: "20-30 min",
      deliveryFee: "45 ETB",
      isPromoted: true,
      discount: "10% OFF",
      price: "190 ETB",
      category: "Best Offers",
    },
  ];

  // Filter restaurants by category
  const nearbyRestaurants = allRestaurants.filter(
    (r) => r.category === "Nearby",
  );
  const topViewedRestaurants = allRestaurants.filter(
    (r) => r.category === "Top Viewed",
  );
  const bestOffersRestaurants = allRestaurants.filter(
    (r) => r.category === "Best Offers",
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-x-hidden">
      {/* Language Selector Modal */}
      <LanguageSelector
        open={showLanguageSelector}
        onOpenChange={setShowLanguageSelector}
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Header */}
      <Header
        onLanguageChange={handleLanguageChange}
        currentLanguage={language}
        cartItemCount={cartItems}
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
      />

      <main className="flex-1 pb-24">
        {/* Restaurant Filters */}
        <RestaurantFilters onFilterChange={handleFilterChange} />

        {/* Featured Section */}
        <FeaturedSection
          title={
            language === "english" ? "Top Ethiopian Eats" : "ምርጥ የኢትዮጵያ ምግቦች"
          }
          subtitle={
            language === "english"
              ? "Discover the best traditional cuisine in your area"
              : "በአካባቢዎ ያሉ ምርጥ ባህላዊ ምግቦችን ይፈልጉ"
          }
          restaurants={featuredRestaurants}
        />

        {/* Restaurant Sections */}
        <div className="space-y-2 mt-2">
          <RestaurantSection
            title={
              language === "english"
                ? "Restaurants Nearby"
                : "በአካባቢዎ ያሉ ምግብ ቤቶች"
            }
            restaurants={nearbyRestaurants}
            maxItems={6}
          />

          <RestaurantSection
            title={language === "english" ? "Most Popular" : "በጣም ታዋቂ"}
            restaurants={topViewedRestaurants}
            maxItems={6}
          />

          <RestaurantSection
            title={language === "english" ? "Best Offers" : "ምርጥ ቅናሾች"}
            restaurants={bestOffersRestaurants}
            maxItems={6}
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="home" />
    </div>
  );
};

export default Home;
