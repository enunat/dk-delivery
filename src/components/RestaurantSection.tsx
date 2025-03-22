import React from "react";
import HorizontalRestaurantCard from "./HorizontalRestaurantCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

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

interface RestaurantSectionProps {
  title: string;
  restaurants: Restaurant[];
  maxItems?: number;
  showViewAll?: boolean;
}

const RestaurantSection = ({
  title,
  restaurants,
  maxItems = 4,
  showViewAll = true,
}: RestaurantSectionProps) => {
  const displayedRestaurants = restaurants.slice(0, maxItems);

  return (
    <section className="w-full py-3 px-3 bg-white mb-2 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {showViewAll && restaurants.length > maxItems && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#7CCD7C] font-medium h-7 px-2 flex items-center"
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {displayedRestaurants.map((restaurant) => (
          <HorizontalRestaurantCard
            key={restaurant.id}
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
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;
