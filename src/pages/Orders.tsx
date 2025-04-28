import React, { useState } from "react";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const Orders = () => {
  // Sample order data
  const activeOrders = [
    {
      id: "ORD-001",
      restaurant: "Habesha Kitfo House",
      items: ["Special Kitfo", "Injera (2)", "Tej (1)"],
      total: "350 ETB",
      status: "preparing",
      estimatedDelivery: "25-35 min",
      address: "Bole Road, Addis Ababa",
      date: "Today, 12:30 PM",
    },
    {
      id: "ORD-002",
      restaurant: "Addis Ababa Injera",
      items: ["Beyaynetu Platter", "Shiro", "Coffee"],
      total: "280 ETB",
      status: "on the way",
      estimatedDelivery: "10-15 min",
      address: "Kazanchis, Addis Ababa",
      date: "Today, 1:45 PM",
    },
  ];

  const pastOrders = [
    {
      id: "ORD-003",
      restaurant: "Merkato Spice",
      items: ["Doro Wat", "Injera (3)"],
      total: "320 ETB",
      status: "delivered",
      address: "Piassa, Addis Ababa",
      date: "Yesterday, 7:30 PM",
    },
    {
      id: "ORD-004",
      restaurant: "Shiro Paradise",
      items: ["Shiro", "Misir Wat", "Salad"],
      total: "250 ETB",
      status: "delivered",
      address: "Bole, Addis Ababa",
      date: "Oct 15, 1:20 PM",
    },
    {
      id: "ORD-005",
      restaurant: "Doro Wat Express",
      items: ["Special Doro Wat", "Injera (2)"],
      total: "300 ETB",
      status: "delivered",
      address: "Kazanchis, Addis Ababa",
      date: "Oct 12, 8:15 PM",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-amber-500";
      case "on the way":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-x-hidden">
      {/* Header */}
      <Header
        onLanguageChange={() => {}}
        currentLanguage="english"
        cartItemCount={0}
        userName="Guest User"
      />

      <main className="flex-1 pb-24 px-4 pt-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="past">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500">No active orders</p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id} className="w-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{order.restaurant}</h3>
                        <Badge
                          className={`${getStatusColor(order.status)} text-white`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {order.items.join(", ")}
                      </p>
                      <p className="font-medium">{order.total}</p>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {order.estimatedDelivery}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500">No order history</p>
              </div>
            ) : (
              pastOrders.map((order) => (
                <Card key={order.id} className="w-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{order.restaurant}</h3>
                        <span className="text-xs text-gray-500">
                          {order.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {order.items.join(", ")}
                      </p>
                      <p className="font-medium">{order.total}</p>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <Badge
                        className={`${getStatusColor(order.status)} text-white`}
                      >
                        {order.status}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeItem="orders" />
    </div>
  );
};

export default Orders;
