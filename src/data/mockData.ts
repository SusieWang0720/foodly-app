import pizzaImg from "@/assets/pizza.jpg";
import pokeImg from "@/assets/poke-bowl.jpg";
import ramenImg from "@/assets/ramen.jpg";
import tacosImg from "@/assets/tacos.jpg";
import burgerImg from "@/assets/burger.jpg";
import sushiImg from "@/assets/sushi.jpg";
import dessertImg from "@/assets/dessert.jpg";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  promo?: string;
  featured?: boolean;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: string;
  restaurantId: string;
  rating: number;
  calories?: number;
  sizes?: { name: string; price: number }[];
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Order {
  id: string;
  restaurant: string;
  restaurantImage: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "preparing" | "delivery" | "completed";
  date: string;
  deliveryAddress: string;
  estimatedTime?: string;
  driver?: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "restaurant";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const categories: Category[] = [
  { id: "1", name: "Pizza", icon: "🍕", color: "bg-red-100" },
  { id: "2", name: "Burgers", icon: "🍔", color: "bg-amber-100" },
  { id: "3", name: "Sushi", icon: "🍣", color: "bg-orange-100" },
  { id: "4", name: "Asian", icon: "🍜", color: "bg-yellow-100" },
  { id: "5", name: "Mexican", icon: "🌮", color: "bg-green-100" },
  { id: "6", name: "Healthy", icon: "🥗", color: "bg-emerald-100" },
  { id: "7", name: "Desserts", icon: "🍰", color: "bg-pink-100" },
  { id: "8", name: "Drinks", icon: "🥤", color: "bg-blue-100" },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Napoli Pizzeria",
    image: pizzaImg,
    cuisine: "Italian • Pizza",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    distance: "1.2 km",
    promo: "20% OFF",
    featured: true,
  },
  {
    id: "2",
    name: "Tokyo Ramen House",
    image: ramenImg,
    cuisine: "Japanese • Ramen",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    distance: "2.1 km",
    featured: true,
  },
  {
    id: "3",
    name: "Burger Station",
    image: burgerImg,
    cuisine: "American • Burgers",
    rating: 4.6,
    deliveryTime: "15-25 min",
    deliveryFee: "Free",
    distance: "0.8 km",
    promo: "Buy 1 Get 1",
  },
  {
    id: "4",
    name: "Sakura Sushi",
    image: sushiImg,
    cuisine: "Japanese • Sushi",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: "$3.99",
    distance: "3.2 km",
  },
  {
    id: "5",
    name: "El Mexicano",
    image: tacosImg,
    cuisine: "Mexican • Tacos",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "$1.99",
    distance: "1.8 km",
    promo: "15% OFF",
  },
  {
    id: "6",
    name: "Aloha Poke",
    image: pokeImg,
    cuisine: "Hawaiian • Healthy",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    distance: "1.5 km",
    featured: true,
  },
];

export const dishes: Dish[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves, and extra virgin olive oil on a crispy crust",
    price: 14.99,
    image: pizzaImg,
    restaurant: "Napoli Pizzeria",
    restaurantId: "1",
    rating: 4.9,
    calories: 850,
    sizes: [
      { name: "Small (10\")", price: 14.99 },
      { name: "Medium (12\")", price: 18.99 },
      { name: "Large (14\")", price: 22.99 },
    ],
    popular: true,
  },
  {
    id: "2",
    name: "Tonkotsu Ramen",
    description: "Rich pork bone broth, chashu, soft-boiled egg, nori, and green onions",
    price: 16.99,
    image: ramenImg,
    restaurant: "Tokyo Ramen House",
    restaurantId: "2",
    rating: 4.9,
    calories: 720,
    popular: true,
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    description: "Angus beef patty, cheddar cheese, lettuce, tomato, pickles, and special sauce",
    price: 12.99,
    image: burgerImg,
    restaurant: "Burger Station",
    restaurantId: "3",
    rating: 4.7,
    calories: 680,
    sizes: [
      { name: "Single", price: 12.99 },
      { name: "Double", price: 16.99 },
    ],
    popular: true,
  },
  {
    id: "4",
    name: "Salmon Poke Bowl",
    description: "Fresh salmon, avocado, edamame, rice, seaweed salad, and sesame dressing",
    price: 15.99,
    image: pokeImg,
    restaurant: "Aloha Poke",
    restaurantId: "6",
    rating: 4.8,
    calories: 520,
    popular: true,
  },
  {
    id: "5",
    name: "Street Tacos",
    description: "Three tacos with grilled chicken, fresh cilantro, onions, and salsa verde",
    price: 11.99,
    image: tacosImg,
    restaurant: "El Mexicano",
    restaurantId: "5",
    rating: 4.6,
    calories: 450,
  },
  {
    id: "6",
    name: "Sushi Deluxe Platter",
    description: "Chef's selection of 12 pieces nigiri and 6 pieces maki rolls",
    price: 28.99,
    image: sushiImg,
    restaurant: "Sakura Sushi",
    restaurantId: "4",
    rating: 4.8,
    calories: 580,
  },
  {
    id: "7",
    name: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie with vanilla ice cream, chocolate sauce, and walnuts",
    price: 8.99,
    image: dessertImg,
    restaurant: "Sweet Delights",
    restaurantId: "7",
    rating: 4.9,
    calories: 650,
  },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    restaurant: "Tokyo Ramen House",
    restaurantImage: ramenImg,
    items: [
      { name: "Tonkotsu Ramen", quantity: 2, price: 16.99 },
      { name: "Gyoza (6 pcs)", quantity: 1, price: 7.99 },
    ],
    total: 41.97,
    status: "delivery",
    date: "Dec 26, 2024",
    deliveryAddress: "123 Main Street, Apt 4B",
    estimatedTime: "15 min",
    driver: {
      name: "John D.",
      phone: "+1 234-567-8900",
      avatar: "JD",
    },
  },
  {
    id: "ORD-002",
    restaurant: "Napoli Pizzeria",
    restaurantImage: pizzaImg,
    items: [
      { name: "Margherita Pizza (Large)", quantity: 1, price: 22.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
    ],
    total: 28.98,
    status: "preparing",
    date: "Dec 26, 2024",
    deliveryAddress: "123 Main Street, Apt 4B",
    estimatedTime: "25 min",
  },
  {
    id: "ORD-003",
    restaurant: "Burger Station",
    restaurantImage: burgerImg,
    items: [
      { name: "Classic Cheeseburger", quantity: 2, price: 12.99 },
      { name: "Fries (Large)", quantity: 1, price: 4.99 },
    ],
    total: 30.97,
    status: "completed",
    date: "Dec 25, 2024",
    deliveryAddress: "123 Main Street, Apt 4B",
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order On The Way!",
    message: "Your order from Tokyo Ramen House is being delivered. ETA: 15 min",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "🎉 Flash Sale!",
    message: "Get 30% off on all sushi orders. Valid until midnight!",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Order Confirmed",
    message: "Napoli Pizzeria has started preparing your order",
    timestamp: "30 min ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "New Feature Available",
    message: "You can now track your delivery driver in real-time!",
    timestamp: "1 day ago",
    read: true,
  },
];

export const promos = [
  {
    id: "1",
    title: "Free Delivery",
    subtitle: "On orders over $25",
    code: "FREEDEL",
    color: "from-primary to-accent",
  },
  {
    id: "2",
    title: "20% OFF",
    subtitle: "First order discount",
    code: "WELCOME20",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "3",
    title: "Buy 1 Get 1",
    subtitle: "On selected items",
    code: "BOGO2024",
    color: "from-violet-500 to-purple-500",
  },
];
