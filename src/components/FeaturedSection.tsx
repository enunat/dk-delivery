import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import RestaurantCard from "./RestaurantCard";

interface FeaturedSectionProps {
  title?: string;
  subtitle?: string;
  restaurants?: {
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
  }[];
}

const FeaturedSection = ({
  title = "Top Ethiopian Eats",
  subtitle = "Discover the best traditional cuisine in your area",
  restaurants = [
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
  ],
}: FeaturedSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1); // Default to 1 for mobile
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Determine number of visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();

    try {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } catch (error) {
      console.error("Error with resize event listener:", error);
    }
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
    };

    startAutoSlide();

    // Cleanup interval on component unmount
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  // Pause auto-slide on user interaction and resume after
  const pauseAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const resumeAutoSlide = () => {
    pauseAutoSlide(); // Clear any existing interval first
    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= restaurants.length - visibleCards + 1 ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? restaurants.length - visibleCards : nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoSlide();
    resumeAutoSlide();
  };

  const handleManualNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
    pauseAutoSlide();
    resumeAutoSlide();
  };

  return (
    <section className="w-full py-4 bg-amber-50">
      <div className="px-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-600">{subtitle}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleManualNavigation("prev")}
              className="rounded-full border-gray-300 hover:bg-amber-100 h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleManualNavigation("next")}
              className="rounded-full border-gray-300 hover:bg-amber-100 h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-3"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex-shrink-0 w-full">
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
        </div>

        {/* Mobile dots indicator */}
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: restaurants.length - visibleCards + 1 }).map(
            (_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-[#7CCD7C]" : "bg-gray-300"}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
