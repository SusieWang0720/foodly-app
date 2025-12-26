import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { restaurants } from "@/data/mockData";

const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = restaurants.slice(0, 4).map((r, i) => ({
    restaurant: r,
    lastMessage: [
      "Thanks for your order!",
      "Your food is on the way",
      "How can we help you?",
      "See you again soon!",
    ][i],
    timestamp: ["2 min ago", "1 hour ago", "Yesterday", "2 days ago"][i],
    unread: i === 0 || i === 1,
  }));

  const filteredConversations = conversations.filter((c) =>
    c.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-xl font-bold">Messages</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 rounded-2xl bg-card"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No conversations yet</h3>
            <p className="text-muted-foreground text-sm">
              Start chatting with restaurants when you place an order
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conv, index) => (
              <Link key={conv.restaurant.id} to={`/chat/${conv.restaurant.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                    conv.unread ? "bg-primary/5" : "hover:bg-secondary"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conv.restaurant.image}
                      alt={conv.restaurant.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {conv.unread && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold truncate ${conv.unread ? "text-foreground" : ""}`}>
                        {conv.restaurant.name}
                      </h3>
                      <span className={`text-xs ${conv.unread ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conv.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatList;
