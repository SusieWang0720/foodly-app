import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryGrid from "@/components/CategoryGrid";
import RestaurantCard from "@/components/RestaurantCard";
import DishCard from "@/components/DishCard";
import CartSheet from "@/components/CartSheet";
import { restaurants, dishes, categories } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">("restaurants");
  const { totalItems } = useCart();

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDishes = dishes.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-xl font-bold">Explore</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 rounded-2xl bg-card"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <CategoryGrid
            selectedId={selectedCategory || undefined}
            onSelect={(id) =>
              setSelectedCategory(selectedCategory === id ? null : id)
            }
          />
        </section>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "restaurants" ? "default" : "secondary"}
            onClick={() => setActiveTab("restaurants")}
            className="flex-1"
          >
            Restaurants ({filteredRestaurants.length})
          </Button>
          <Button
            variant={activeTab === "dishes" ? "default" : "secondary"}
            onClick={() => setActiveTab("dishes")}
            className="flex-1"
          >
            Dishes ({filteredDishes.length})
          </Button>
        </div>

        {/* Results */}
        {activeTab === "restaurants" ? (
          <section className="space-y-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No restaurants found</p>
              </div>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            )}
          </section>
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDishes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No dishes found</p>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))
            )}
          </section>
        )}
      </main>

      {totalItems > 0 && <CartSheet />}
    </div>
  );
};

export default Explore;
