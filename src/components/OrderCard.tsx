import { motion } from "framer-motion";
import { Clock, MapPin, Phone, ChefHat, Truck } from "lucide-react";
import { Order } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  pending: {
    label: "Pending Payment",
    class: "status-pending",
    icon: Clock,
  },
  preparing: {
    label: "Preparing",
    class: "status-preparing",
    icon: ChefHat,
  },
  delivery: {
    label: "On the Way",
    class: "status-delivery",
    icon: Truck,
  },
  completed: {
    label: "Delivered",
    class: "status-completed",
    icon: MapPin,
  },
};

const OrderCard = ({ order }: OrderCardProps) => {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 shadow-soft"
    >
      <div className="flex items-start gap-3 mb-4">
        <img
          src={order.restaurantImage}
          alt={order.restaurant}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-foreground">{order.restaurant}</h3>
          <p className="text-sm text-muted-foreground">{order.date}</p>
          <span className={`status-badge ${status.class} mt-2`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {status.label}
          </span>
        </div>
        <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.quantity}x {item.name}
            </span>
            <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {order.status === "delivery" && order.driver && (
        <div className="bg-secondary/50 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {order.driver.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{order.driver.name}</p>
              <p className="text-sm text-muted-foreground">Your delivery driver</p>
            </div>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
          {order.estimatedTime && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Arriving in {order.estimatedTime}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {order.status === "completed" ? (
          <>
            <Button variant="outline" className="flex-1">
              Reorder
            </Button>
            <Button variant="secondary" className="flex-1">
              Leave Review
            </Button>
          </>
        ) : (
          <Link to={`/orders/${order.id}`} className="flex-1">
            <Button className="w-full">Track Order</Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
