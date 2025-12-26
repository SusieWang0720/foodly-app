import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

interface CategoryGridProps {
  onSelect?: (categoryId: string) => void;
  selectedId?: string;
}

const CategoryGrid = ({ onSelect, selectedId }: CategoryGridProps) => {
  return (
    <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-3 pb-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect?.(category.id)}
            className={`category-card flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px] ${
              selectedId === category.id
                ? "ring-2 ring-primary bg-primary/5"
                : ""
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center text-2xl`}
            >
              {category.icon}
            </div>
            <span className="text-xs font-medium text-foreground">
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
