import React from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Clock, DollarSign, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface RestaurantCardProps {
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

const RestaurantCard = ({
  image = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  name = "Habesha Restaurant",
  cuisineType = "Ethiopian",
  rating = 4.7,
  deliveryTime = "25-35 min",
  deliveryFee = "50 ETB",
  isPromoted = false,
  discount = "",
  price = "200 ETB",
}: RestaurantCardProps) => {
  return (
    <Card className="w-full max-w-[350px] overflow-hidden transition-all duration-200 hover:shadow-lg bg-white">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={`${name} restaurant`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isPromoted && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
            Promoted
          </Badge>
        )}
        {discount && (
          <Badge className="absolute top-2 left-2 bg-[#7CCD7C] text-white">
            {discount}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 shadow-md"
          aria-label="Add to favorites"
        >
          <Heart className="h-4 w-4 text-red-500" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-500">{cuisineType}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        {price && (
          <div className="mt-2 text-sm font-medium text-gray-900">{price}</div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{deliveryTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>{deliveryFee}</span>
        </div>
        <Button
          size="sm"
          className="ml-auto bg-[#7CCD7C] hover:bg-[#6BBE6B] text-white rounded-full h-8 w-8 p-0"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
