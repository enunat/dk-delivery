import React, { useState } from "react";
import Header from "../components/Header";
import RestaurantGrid from "../components/RestaurantGrid";
import BottomNavigation from "../components/BottomNavigation";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-x-hidden">
      {/* Header */}
      <Header
        onLanguageChange={() => {}}
        currentLanguage="english"
        cartItemCount={0}
        userName="Guest User"
      />

      <main className="flex-1 pb-24">
        {/* Restaurant Grid with search functionality */}
        <RestaurantGrid
          title="Search Results"
          showSorting={true}
          showSearch={true}
        />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="search" />
    </div>
  );
};

export default Search;
