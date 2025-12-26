import { motion } from "framer-motion";
import { promos } from "@/data/mockData";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const PromoCarousel = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast({
      title: "Code copied!",
      description: `Use ${code} at checkout`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-4 pb-2">
        {promos.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex-shrink-0 w-64 rounded-2xl bg-gradient-to-r ${promo.color} p-4 text-primary-foreground relative overflow-hidden`}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
              <p className="text-sm opacity-90 mb-3">{promo.subtitle}</p>
              <button
                onClick={() => handleCopy(promo.code, promo.id)}
                className="flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-primary-foreground/30 transition-colors"
              >
                {copiedId === promo.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {promo.code}
                  </>
                )}
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-foreground/10 rounded-full" />
            <div className="absolute -right-8 -top-8 w-20 h-20 bg-primary-foreground/10 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
