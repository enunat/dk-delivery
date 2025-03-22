import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
  cartItemCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  onLanguageChange = () => {},
  currentLanguage = "English",
  cartItemCount = 0,
  userName = "Guest User",
  userAvatar = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-1 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <span className="text-lg font-bold text-[#7CCD7C]">DK</span>
            <span className="text-lg font-bold">-Delivery</span>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-1">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange("english")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange("amharic")}>
                አማርኛ (Amharic)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7CCD7C] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-[#7CCD7C] text-white text-xs">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search - Always visible on mobile */}
      <div className="px-4 pb-2">
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
    </header>
  );
};

export default Header;
