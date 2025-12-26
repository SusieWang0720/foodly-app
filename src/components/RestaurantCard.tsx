import { motion } from "framer-motion";
import { Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/data/mockData";

interface RestaurantCardProps {
  restaurant: Restaurant;
  featured?: boolean;
}

const RestaurantCard = ({ restaurant, featured }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`restaurant-card overflow-hidden ${
          featured ? "col-span-2 md:col-span-1" : ""
        }`}
      >
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-40 object-cover"
          />
          {restaurant.promo && (
            <span className="badge-promo absolute top-3 left-3">
              {restaurant.promo}
            </span>
          )}
          {restaurant.featured && (
            <span className="absolute top-3 right-3 bg-foodly-gold/90 text-foreground text-xs font-semibold px-2 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-foreground mb-1">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-foodly-gold fill-foodly-gold" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50">
            <span
              className={`text-sm font-medium ${
                restaurant.deliveryFee === "Free"
                  ? "text-foodly-green"
                  : "text-muted-foreground"
              }`}
            >
              {restaurant.deliveryFee === "Free"
                ? "🎉 Free Delivery"
                : `Delivery ${restaurant.deliveryFee}`}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RestaurantCard;
