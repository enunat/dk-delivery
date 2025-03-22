import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Clock, DollarSign, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface HorizontalRestaurantCardProps {
  image: string;
  name: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  isPromoted?: boolean;
  discount?: string;
  price?: string;
}

const HorizontalRestaurantCard = ({
  image = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=70",
  name = "Habesha Restaurant",
  cuisineType = "Ethiopian",
  rating = 4.7,
  deliveryTime = "25-35 min",
  deliveryFee = "50 ETB",
  isPromoted = false,
  discount = "",
  price = "200 ETB",
}: HorizontalRestaurantCardProps) => {
  return (
    <Card className="w-full overflow-hidden transition-all duration-200 hover:shadow-md bg-white flex h-24">
      <div className="relative h-full w-24 flex-shrink-0 overflow-hidden">
        <img
          src={image}
          alt={`${name} restaurant`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {discount && (
          <Badge className="absolute top-1 left-1 bg-[#7CCD7C] text-white text-xs px-1 py-0">
            {discount}
          </Badge>
        )}
      </div>

      <CardContent className="p-2 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-1">
            <h3 className="text-sm font-semibold line-clamp-1">{name}</h3>
            <p className="text-xs text-gray-500 line-clamp-1">{cuisineType}</p>
          </div>
          <div className="flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-gray-500" />
            <span>{deliveryFee}</span>
          </div>
          <div className="flex gap-1">
            {isPromoted && (
              <Badge
                variant="outline"
                className="text-xs h-5 border-amber-500 text-amber-500 px-1"
              >
                Ad
              </Badge>
            )}
            <Button
              size="sm"
              className="bg-[#7CCD7C] hover:bg-[#6BBE6B] text-white rounded-full h-5 w-5 p-0"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorizontalRestaurantCard;
