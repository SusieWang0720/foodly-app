import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Image, Paperclip, Phone, MoreVertical, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { restaurants } from "@/data/mockData";

interface Message {
  id: string;
  sender: "user" | "restaurant";
  content: string;
  timestamp: string;
}

const Chat = () => {
  const { id } = useParams();
  const restaurant = id ? restaurants.find((r) => r.id === id) : null;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "restaurant",
      content: "Hello! Welcome to our restaurant. How can we help you today?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "user",
      content: "Hi! I'd like to know if you have any gluten-free options?",
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      sender: "restaurant",
      content: "Yes, we do! We have gluten-free pizza crust and our salads are naturally gluten-free. Would you like me to recommend some dishes?",
      timestamp: "10:32 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate restaurant response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "restaurant",
        content: "Thanks for your message! Our team will respond shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  const displayName = restaurant?.name || "Support";
  const displayImage = restaurant?.image;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to={restaurant ? `/restaurant/${restaurant.id}` : "/chat"}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 flex-1">
            {displayImage ? (
              <img
                src={displayImage}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                S
              </div>
            )}
            <div>
              <h2 className="font-semibold">{displayName}</h2>
              <p className="text-xs text-foodly-green">Online</p>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`chat-bubble ${
                message.sender === "user" ? "chat-bubble-user" : "chat-bubble-other"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-[10px] mt-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t border-border/50 p-4 pb-safe">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Image className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="rounded-full shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
