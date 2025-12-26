import { motion } from "framer-motion";
import { ArrowLeft, User, Package, CreditCard, MapPin, Heart, Settings, LogOut, ChevronRight, Gift, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Package, label: "Order History", path: "/orders", badge: "3" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: MapPin, label: "Delivery Addresses", path: "/addresses" },
  { icon: CreditCard, label: "Payment Methods", path: "/payment" },
  { icon: Gift, label: "Points & Coupons", path: "/rewards", badge: "150 pts" },
  { icon: Star, label: "My Reviews", path: "/reviews" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@email.com</p>
              <p className="text-sm text-muted-foreground mt-1">+1 234-567-8900</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-primary-foreground mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Available Points</p>
              <p className="text-3xl font-bold">1,250</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Coupons</p>
              <p className="text-xl font-bold">5 available</p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full mt-4 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
          >
            Redeem Points
          </Button>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link to={item.path}>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-sm font-semibold text-primary">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
