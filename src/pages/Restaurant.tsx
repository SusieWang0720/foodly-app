import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin, Heart, Share2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurants, dishes } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import CartSheet from "@/components/CartSheet";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Restaurant = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantDishes = dishes.filter((d) => d.restaurantId === id);
  const { addItem, totalItems } = useCart();

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Restaurant not found</p>
      </div>
    );
  }

  const handleAddToCart = (dish: typeof dishes[0]) => {
    addItem(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="secondary" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 shadow-medium"
        >
          {restaurant.promo && (
            <span className="badge-promo mb-2 inline-block">{restaurant.promo}</span>
          )}
          <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-muted-foreground mb-4">{restaurant.cuisine}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-foodly-gold fill-foodly-gold" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-muted-foreground">(200+ reviews)</span>
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
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1">
              View Reviews
            </Button>
            <Link to={`/chat/${restaurant.id}`} className="flex-1">
              <Button className="w-full">Chat with Restaurant</Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <div className="space-y-4">
          {restaurantDishes.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No dishes available from this restaurant yet
            </p>
          ) : (
            restaurantDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 bg-card rounded-2xl p-4 shadow-soft"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">{dish.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">
                        ${dish.price.toFixed(2)}
                      </span>
                      {dish.calories && (
                        <span className="text-xs text-muted-foreground">
                          {dish.calories} cal
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(dish)}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {totalItems > 0 && <CartSheet />}
    </div>
  );
};

export default Restaurant;
