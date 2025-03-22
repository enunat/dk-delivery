import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChevronDown,
  Search,
  MapPin,
  Eye,
  Tag,
  ShoppingBag,
} from "lucide-react";
import { Input } from "./ui/input";

interface Restaurant {
  id: string;
  image: string;
  name: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  isPromoted?: boolean;
  discount?: string;
  price?: string;
  category?: string;
}

interface RestaurantGridProps {
  restaurants?: Restaurant[];
  title?: string;
  showSorting?: boolean;
  showSearch?: boolean;
}

const RestaurantGrid = ({
  restaurants = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70",
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
        "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=400&q=70",
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
        "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=400&q=70",
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
        "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=400&q=70",
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
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70",
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
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
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
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
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
        "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400&q=70",
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
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=70",
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
        "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=70",
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
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=70",
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
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
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
  ],
  title = "Restaurants Near You",
  showSorting = true,
  showSearch = true,
}: RestaurantGridProps) => {
  const [sortOption, setSortOption] = useState("recommended");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [visibleCount, setVisibleCount] = useState(4); // Show fewer items initially on mobile
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Apply initial sorting and filtering
  useEffect(() => {
    filterAndSortRestaurants(searchQuery, sortOption, activeCategory);
  }, [restaurants, searchQuery, sortOption, activeCategory]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter and sort restaurants
  const filterAndSortRestaurants = (
    query: string,
    sortBy: string,
    category: string | null,
  ) => {
    let results = [...restaurants];

    // Apply category filter if selected
    if (category) {
      results = results.filter(
        (restaurant) => restaurant.category === category,
      );
    }

    // Apply search filter if query exists
    if (query.trim() !== "") {
      const lowerCaseQuery = query.toLowerCase();
      results = results.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(lowerCaseQuery) ||
          restaurant.cuisineType.toLowerCase().includes(lowerCaseQuery),
      );
    }

    // Apply sorting
    try {
      switch (sortBy) {
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "delivery-time":
          results.sort((a, b) => {
            const aTime = parseInt(a.deliveryTime.split("-")[0]);
            const bTime = parseInt(b.deliveryTime.split("-")[0]);
            return aTime - bTime;
          });
          break;
        case "delivery-fee":
          results.sort((a, b) => {
            const aFee = parseInt(a.deliveryFee.split(" ")[0]);
            const bFee = parseInt(b.deliveryFee.split(" ")[0]);
            return aFee - bFee;
          });
          break;
        default:
          // Default is recommended (promoted first)
          results = results.sort((a, b) => {
            if (a.isPromoted && !b.isPromoted) return -1;
            if (!a.isPromoted && b.isPromoted) return 1;
            return 0;
          });
      }

      setFilteredRestaurants(results);
      // Reset visible count when search results change
      setVisibleCount(Math.min(4, results.length));
    } catch (error) {
      console.error("Error sorting restaurants:", error);
      setFilteredRestaurants(results); // Fallback to filtered but unsorted
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredRestaurants.length));
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  // Get unique categories from restaurants
  const categories = ["Nearby", "Top Viewed", "Best Offers"];

  return (
    <div className="w-full bg-gray-50 px-3 py-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>

        {showSorting && (
          <div>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="delivery-time">Fastest Delivery</SelectItem>
                <SelectItem value="delivery-fee">
                  Lowest Delivery Fee
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Category filters */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <Button
            variant={activeCategory === "Nearby" ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 whitespace-nowrap ${activeCategory === "Nearby" ? "bg-[#7CCD7C] hover:bg-[#6BBE6B]" : "border-gray-300 hover:bg-gray-100"}`}
            onClick={() => handleCategoryClick("Nearby")}
          >
            <MapPin className="h-3 w-3" />
            <span>Nearby</span>
          </Button>
          <Button
            variant={activeCategory === "Top Viewed" ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 whitespace-nowrap ${activeCategory === "Top Viewed" ? "bg-[#7CCD7C] hover:bg-[#6BBE6B]" : "border-gray-300 hover:bg-gray-100"}`}
            onClick={() => handleCategoryClick("Top Viewed")}
          >
            <Eye className="h-3 w-3" />
            <span>Top Viewed</span>
          </Button>
          <Button
            variant={activeCategory === "Best Offers" ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 whitespace-nowrap ${activeCategory === "Best Offers" ? "bg-[#7CCD7C] hover:bg-[#6BBE6B]" : "border-gray-300 hover:bg-gray-100"}`}
            onClick={() => handleCategoryClick("Best Offers")}
          >
            <Tag className="h-3 w-3" />
            <span>Best Offers</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 whitespace-nowrap border-gray-300 hover:bg-gray-100"
          >
            <ShoppingBag className="h-3 w-3" />
            <span>More</span>
          </Button>
        </div>
      </div>

      {/* Search input */}
      {showSearch && (
        <div className="mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="pl-10 w-full h-9 text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}

      {visibleRestaurants.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
          <p className="text-base font-medium text-gray-700">
            No restaurants found
          </p>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {visibleRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex justify-center">
              <RestaurantCard
                image={restaurant.image}
                name={restaurant.name}
                cuisineType={restaurant.cuisineType}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                deliveryFee={restaurant.deliveryFee}
                isPromoted={restaurant.isPromoted}
                discount={restaurant.discount}
                price={restaurant.price}
              />
            </div>
          ))}
        </div>
      )}

      {visibleCount < filteredRestaurants.length && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#7CCD7C] hover:bg-[#6BBE6B] text-white border-none"
            onClick={loadMore}
          >
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantGrid;
