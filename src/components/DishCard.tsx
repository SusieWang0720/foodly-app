import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dish } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

interface DishCardProps {
  dish: Dish;
  compact?: boolean;
}

const DishCard = ({ dish, compact }: DishCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart`,
    });
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="food-card flex gap-3 p-3 cursor-pointer"
      >
        <img
          src={dish.image}
          alt={dish.name}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{dish.name}</h4>
          <p className="text-sm text-muted-foreground truncate">{dish.restaurant}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-primary">${dish.price.toFixed(2)}</span>
            <Button
              size="icon"
              variant="soft"
              className="h-8 w-8 rounded-full"
              onClick={handleAddToCart}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="food-card overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-36 object-cover"
        />
        {dish.popular && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
            🔥 Popular
          </span>
        )}
        <Button
          size="icon"
          className="absolute bottom-2 right-2 h-9 w-9 rounded-full shadow-lg"
          onClick={handleAddToCart}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
          {dish.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
          {dish.restaurant}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">${dish.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-foodly-gold fill-foodly-gold" />
            <span className="text-xs font-medium">{dish.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
