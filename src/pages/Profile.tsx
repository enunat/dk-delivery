import React from "react";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Heart,
  Gift,
  MapPin,
} from "lucide-react";

const Profile = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+251 91 234 5678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    addresses: [
      {
        id: "addr1",
        title: "Home",
        address: "Bole Road, Addis Ababa",
        isDefault: true,
      },
      {
        id: "addr2",
        title: "Work",
        address: "Kazanchis, Addis Ababa",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: "pm1",
        type: "telebirr",
        name: "TeleBirr",
        details: "**** 5678",
        isDefault: true,
      },
      {
        id: "pm2",
        type: "card",
        name: "Visa Card",
        details: "**** 1234",
        isDefault: false,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-x-hidden">
      {/* Header */}
      <Header
        onLanguageChange={() => {}}
        currentLanguage="english"
        cartItemCount={0}
        userName={user.name}
        userAvatar={user.avatar}
      />

      <main className="flex-1 pb-24">
        {/* Profile Header */}
        <div className="bg-[#7CCD7C] p-6 flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-white text-[#7CCD7C] text-xl">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-white/80">{user.email}</p>
          <p className="text-white/80">{user.phone}</p>
          <Button
            variant="outline"
            className="mt-4 bg-white text-[#7CCD7C] hover:bg-white/90"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile Content */}
        <div className="p-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    <li className="flex items-center p-4">
                      <User className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Personal Information</span>
                    </li>
                    <li className="flex items-center p-4">
                      <Heart className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Favorites</span>
                    </li>
                    <li className="flex items-center p-4">
                      <Gift className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Loyalty Points</span>
                    </li>
                    <li className="flex items-center p-4">
                      <Settings className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Settings</span>
                    </li>
                    <li className="flex items-center p-4 text-red-500">
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4">
              {user.addresses.map((address) => (
                <Card key={address.id} className="mb-3">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{address.title}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-[#7CCD7C]/20 text-[#7CCD7C] px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-start mt-2">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <p className="text-sm text-gray-600">
                            {address.address}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button className="w-full bg-[#7CCD7C] hover:bg-[#6BBE6B]">
                Add New Address
              </Button>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              {user.paymentMethods.map((method) => (
                <Card key={method.id} className="mb-3">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{method.name}</h3>
                          {method.isDefault && (
                            <span className="text-xs bg-[#7CCD7C]/20 text-[#7CCD7C] px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-sm text-gray-600">
                            {method.details}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button className="w-full bg-[#7CCD7C] hover:bg-[#6BBE6B]">
                Add Payment Method
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="profile" />
    </div>
  );
};

export default Profile;
