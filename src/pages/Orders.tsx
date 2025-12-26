import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Clock, CheckCircle2, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/OrderCard";
import { sampleOrders } from "@/data/mockData";

const Orders = () => {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const activeOrders = sampleOrders.filter(
    (o) => o.status !== "completed"
  );
  const completedOrders = sampleOrders.filter(
    (o) => o.status === "completed"
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Orders</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === "active" ? "default" : "secondary"}
              onClick={() => setActiveTab("active")}
              className="flex-1"
            >
              <Truck className="w-4 h-4 mr-2" />
              Active ({activeOrders.length})
            </Button>
            <Button
              variant={activeTab === "completed" ? "default" : "secondary"}
              onClick={() => setActiveTab("completed")}
              className="flex-1"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed ({completedOrders.length})
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {activeTab === "active" ? (
          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No active orders</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  When you place an order, it will appear here
                </p>
                <Link to="/">
                  <Button>Browse Restaurants</Button>
                </Link>
              </div>
            ) : (
              activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No completed orders</h3>
                <p className="text-muted-foreground text-sm">
                  Your completed orders will appear here
                </p>
              </div>
            ) : (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
