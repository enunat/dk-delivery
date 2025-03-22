import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Filter, ChevronDown, X } from "lucide-react";

interface FilterOption {
  id: string;
  name: string;
  type: "cuisine" | "location" | "price" | "rating";
}

interface RestaurantFiltersProps {
  onFilterChange?: (selectedFilters: Record<string, string[]>) => void;
}

const RestaurantFilters = ({
  onFilterChange = () => {},
}: RestaurantFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    cuisine: [],
    location: [],
    price: [],
    rating: [],
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({
    cuisine: null,
    location: null,
    price: null,
    rating: null,
  });

  const filterOptions: FilterOption[] = [
    { id: "ethiopian", name: "Ethiopian", type: "cuisine" },
    { id: "injera", name: "Injera", type: "cuisine" },
    { id: "tibs", name: "Tibs", type: "cuisine" },
    { id: "shiro", name: "Shiro", type: "cuisine" },
    { id: "doro-wat", name: "Doro Wat", type: "cuisine" },
    { id: "international", name: "International", type: "cuisine" },
    { id: "italian", name: "Italian", type: "cuisine" },
    { id: "chinese", name: "Chinese", type: "cuisine" },
    { id: "indian", name: "Indian", type: "cuisine" },

    { id: "addis-ababa", name: "Addis Ababa", type: "location" },
    { id: "bole", name: "Bole", type: "location" },
    { id: "piassa", name: "Piassa", type: "location" },
    { id: "kazanchis", name: "Kazanchis", type: "location" },
    { id: "nearby", name: "Nearby", type: "location" },

    { id: "$", name: "$", type: "price" },
    { id: "$", name: "$", type: "price" },
    { id: "$$", name: "$$", type: "price" },
    { id: "$$", name: "$$", type: "price" },

    { id: "4+", name: "4+ Stars", type: "rating" },
    { id: "3+", name: "3+ Stars", type: "rating" },
    { id: "2+", name: "2+ Stars", type: "rating" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        const element = dropdownRefs.current[activeDropdown];
        if (element && !element.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (type: string) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
    }
  };

  const toggleFilter = (filter: FilterOption) => {
    const newSelectedFilters = { ...selectedFilters };
    const filterType = filter.type;
    const filterId = filter.id;

    if (newSelectedFilters[filterType].includes(filterId)) {
      newSelectedFilters[filterType] = newSelectedFilters[filterType].filter(
        (id) => id !== filterId,
      );
    } else {
      newSelectedFilters[filterType] = [
        ...newSelectedFilters[filterType],
        filterId,
      ];
    }

    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({
      cuisine: [],
      location: [],
      price: [],
      rating: [],
    });
    onFilterChange({
      cuisine: [],
      location: [],
      price: [],
      rating: [],
    });
  };

  const getSelectedCount = (type: string): number => {
    return selectedFilters[type]?.length || 0;
  };

  const renderFilterDropdown = (type: string, label: string) => {
    const options = filterOptions.filter((option) => option.type === type);
    const count = getSelectedCount(type);

    return (
      <div className="relative" ref={(el) => (dropdownRefs.current[type] = el)}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-white h-8 px-2 text-xs"
          onClick={() => toggleDropdown(type)}
        >
          {label}
          {count > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 text-xs">
              {count}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>

        {activeDropdown === type && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-[200px] overflow-y-auto">
            <div className="p-2">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
                  onClick={() => toggleFilter(option)}
                >
                  <div
                    className={`w-4 h-4 border rounded-sm mr-2 flex items-center justify-center ${selectedFilters[type].includes(option.id) ? "bg-[#7CCD7C] border-[#7CCD7C]" : "border-gray-300"}`}
                  >
                    {selectedFilters[type].includes(option.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-3 h-3"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span>{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 py-2 px-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium">Filters</h3>
        {Object.values(selectedFilters).some(
          (filters) => filters.length > 0,
        ) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-gray-500 h-7 px-2"
          >
            Clear all
          </Button>
        )}
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-2 pb-2 overflow-x-auto hide-scrollbar">
          {renderFilterDropdown("cuisine", "Cuisine")}
          {renderFilterDropdown("location", "Location")}
          {renderFilterDropdown("price", "Price")}
          {renderFilterDropdown("rating", "Rating")}
        </div>

        {/* Selected filters as badges */}
        {Object.values(selectedFilters).some(
          (filters) => filters.length > 0,
        ) && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(selectedFilters).flatMap(([type, ids]) =>
              ids.map((id) => {
                const option = filterOptions.find((opt) => opt.id === id);
                return option ? (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer text-xs py-1 px-2"
                    onClick={() => toggleFilter(option)}
                  >
                    {option.name}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ) : null;
              }),
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RestaurantFilters;
