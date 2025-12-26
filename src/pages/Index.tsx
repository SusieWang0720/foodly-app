import { motion } from "framer-motion";
import { MapPin, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import RestaurantCard from "@/components/RestaurantCard";
import DishCard from "@/components/DishCard";
import PromoCarousel from "@/components/PromoCarousel";
import CartSheet from "@/components/CartSheet";
import { restaurants, dishes } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  const { totalItems } = useCart();
  const featuredRestaurants = restaurants.filter((r) => r.featured);
  const popularDishes = dishes.filter((d) => d.popular);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Deliver to</p>
              <button className="flex items-center gap-1 font-semibold text-sm">
                123 Main Street
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              Craving something
              <br />
              <span className="gradient-text">delicious?</span>
            </h1>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Order from the best restaurants near you
            </p>
            <Button variant="hero" size="lg" className="w-fit">
              Order Now
            </Button>
          </div>
        </motion.section>

        {/* Search */}
        <SearchBar />

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Categories</h2>
            <Link to="/explore" className="text-sm text-primary font-medium">
              See all
            </Link>
          </div>
          <CategoryGrid />
        </section>

        {/* Promotions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">🎉 Special Offers</h2>
          </div>
          <PromoCarousel />
        </section>

        {/* Featured Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Featured Restaurants</h2>
            <Link to="/explore" className="text-sm text-primary font-medium">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                featured
              />
            ))}
          </div>
        </section>

        {/* Popular Dishes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">🔥 Popular Right Now</h2>
            <Link to="/explore" className="text-sm text-primary font-medium">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </section>

        {/* All Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">All Restaurants</h2>
          </div>
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Sheet */}
      {totalItems > 0 && <CartSheet />}
    </div>
  );
};

export default Index;
