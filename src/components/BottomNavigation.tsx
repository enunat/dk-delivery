import React from "react";
import { Home, Search, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BottomNavigationProps {
  activeItem?: "home" | "search" | "orders" | "profile";
}

const BottomNavigation = ({ activeItem = "home" }: BottomNavigationProps) => {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={24} />,
      path: "/",
    },
    {
      id: "search",
      label: "Search",
      icon: <Search size={24} />,
      path: "/search",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Clock size={24} />,
      path: "/orders",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={24} />,
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-2 px-4 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`flex flex-col items-center justify-center w-1/4 py-1 ${activeItem === item.id ? "text-green-500" : "text-gray-500"}`}
        >
          <div className="mb-1">{item.icon}</div>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
