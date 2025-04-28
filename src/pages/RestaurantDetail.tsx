import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Star,
  Clock,
  DollarSign,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Info,
  MapPin,
  Phone,
} from "lucide-react";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("menu");
  const [cartItems, setCartItems] = useState(0);

  // Sample restaurant data
  const restaurant = {
    id: "1",
    name: "Habesha Kitfo House",
    image:
      "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    cuisineType: "Traditional Ethiopian",
    rating: 4.8,
    reviewCount: 245,
    deliveryTime: "20-30 min",
    deliveryFee: "45 ETB",
    minOrder: "100 ETB",
    address: "Bole Road, Addis Ababa",
    phone: "+251 91 234 5678",
    openingHours: "10:00 AM - 10:00 PM",
    isOpen: true,
    description:
      "Authentic Ethiopian cuisine featuring traditional kitfo, tibs, and injera dishes prepared with fresh local ingredients.",
  };

  // Sample menu categories and items
  const menuCategories = [
    {
      id: "cat1",
      name: "Popular Items",
      items: [
        {
          id: "item1",
          name: "Special Kitfo",
          description:
            "Fresh minced beef seasoned with mitmita and niter kibbeh",
          price: "220 ETB",
          image:
            "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=400&q=70",
          isPopular: true,
        },
        {
          id: "item2",
          name: "Beyaynetu Platter",
          description: "Colorful vegetarian combination served with injera",
          price: "180 ETB",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
          isPopular: true,
        },
      ],
    },
    {
      id: "cat2",
      name: "Main Dishes",
      items: [
        {
          id: "item3",
          name: "Doro Wat",
          description: "Spicy chicken stew served with boiled egg and injera",
          price: "250 ETB",
          image:
            "https://images.unsplash.com/photo-1535400875775-0269e7a919af?w=400&q=70",
        },
        {
          id: "item4",
          name: "Tibs",
          description: "Sautéed beef with vegetables and Ethiopian spices",
          price: "200 ETB",
          image:
            "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400&q=70",
        },
      ],
    },
    {
      id: "cat3",
      name: "Sides",
      items: [
        {
          id: "item5",
          name: "Injera (2 pieces)",
          description: "Traditional Ethiopian sourdough flatbread",
          price: "30 ETB",
        },
        {
          id: "item6",
          name: "Ayib",
          description: "Fresh Ethiopian cottage cheese",
          price: "45 ETB",
        },
      ],
    },
    {
      id: "cat4",
      name: "Beverages",
      items: [
        {
          id: "item7",
          name: "Ethiopian Coffee",
          description: "Traditional coffee ceremony in a cup",
          price: "60 ETB",
          image:
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=70",
        },
        {
          id: "item8",
          name: "Tej",
          description: "Ethiopian honey wine",
          price: "80 ETB",
        },
      ],
    },
  ];

  // Add to cart handler
  const handleAddToCart = () => {
    setCartItems((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-x-hidden">
      {/* Header */}
      <Header
        onLanguageChange={() => {}}
        currentLanguage="english"
        cartItemCount={cartItems}
        userName="Guest User"
      />

      {/* Restaurant Cover Image */}
      <div className="relative h-48 w-full">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 shadow-md"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 shadow-md"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-gray-500">{restaurant.cuisineType}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-xs text-gray-500">
              ({restaurant.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>{restaurant.deliveryFee}</span>
          </div>
          <Badge className={restaurant.isOpen ? "bg-green-500" : "bg-red-500"}>
            {restaurant.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 mt-3">{restaurant.description}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <Tabs
          defaultValue="menu"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <main className="flex-1 pb-24">
        {activeTab === "menu" && (
          <div className="p-4 space-y-6">
            {menuCategories.map((category) => (
              <div key={category.id} className="space-y-3">
                <h2 className="text-lg font-bold">{category.name}</h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="flex-1 p-3">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{item.name}</h3>
                              <span className="font-medium">{item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                            {item.isPopular && (
                              <Badge className="mt-2 bg-[#7CCD7C]">
                                Popular
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              className="mt-2 bg-[#7CCD7C] hover:bg-[#6BBE6B]"
                              onClick={handleAddToCart}
                            >
                              Add to Cart
                            </Button>
                          </div>
                          {item.image && (
                            <div className="w-24 h-24">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="p-4">
            <p className="text-center text-gray-500 py-8">
              Reviews coming soon
            </p>
          </div>
        )}

        {activeTab === "info" && (
          <div className="p-4 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-sm text-gray-600">
                      {restaurant.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Opening Hours</h3>
                    <p className="text-sm text-gray-600">
                      {restaurant.openingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-sm text-gray-600">{restaurant.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Additional Info</h3>
                    <p className="text-sm text-gray-600">
                      Minimum order: {restaurant.minOrder}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="home" />
    </div>
  );
};

export default RestaurantDetail;
