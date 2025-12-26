import { motion } from "framer-motion";
import { ArrowLeft, Globe, Bell, CreditCard, MapPin, Shield, ChevronRight, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Settings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);

  const settingGroups = [
    {
      title: "Account",
      items: [
        { icon: MapPin, label: "Delivery Addresses", path: "/addresses" },
        { icon: CreditCard, label: "Payment Methods", path: "/payment" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Globe, label: "Language", value: "English" },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: Shield, label: "Privacy Settings", path: "/privacy" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Notifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            NOTIFICATIONS
          </h2>
          <div className="bg-card rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">Push Notifications</span>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">Email Notifications</span>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">Promotional Notifications</span>
              </div>
              <Switch
                checked={promoNotifications}
                onCheckedChange={setPromoNotifications}
              />
            </div>
          </div>
        </motion.section>

        {/* Other Settings */}
        {settingGroups.map((group, groupIndex) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + groupIndex * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
              {group.title.toUpperCase()}
            </h2>
            <div className="bg-card rounded-2xl overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;
                
                const content = (
                  <div
                    className={`flex items-center justify-between p-4 ${
                      !isLast ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-muted-foreground">{item.value}</span>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                );

                return item.path ? (
                  <Link key={item.label} to={item.path}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* App Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground pt-4"
        >
          <p>Foodly v1.0.0</p>
          <p className="mt-1">Made with ❤️</p>
        </motion.section>
      </main>
    </div>
  );
};

export default Settings;
