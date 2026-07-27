import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MapPin, CheckCircle2, ShieldCheck, ArrowUpRight, Bell, Heart } from "lucide-react";
import { toast } from "sonner";

interface TickerItem {
  id: string;
  user: string;
  city: string;
  action: string;
  timeAgo: string;
  category: string;
  badge: "PETITION SIGNED" | "WARD RESOLVED" | "NEW SABHA" | "MUNICIPAL REPLY";
  color: string;
}

const tickerItems: TickerItem[] = [
  {
    id: "tick-1",
    user: "Ananya Iyer",
    city: "Bengaluru",
    action: "submitted geo-tagged road evidence to BBMP Ward 42",
    timeAgo: "Just now",
    category: "Civic & Roads",
    badge: "PETITION SIGNED",
    color: "bg-amber-500",
  },
  {
    id: "tick-2",
    user: "Municipal Commissioner Office",
    city: "Pune",
    action: "assigned maintenance crew for 38 reported dark spots",
    timeAgo: "1m ago",
    category: "Women Safety",
    badge: "MUNICIPAL REPLY",
    color: "bg-purple-600",
  },
  {
    id: "tick-3",
    user: "Rohan Verma & 24 others",
    city: "Delhi",
    action: "joined the Clean Yamuna Sunday Volunteer Squad",
    timeAgo: "3m ago",
    category: "Water & Green",
    badge: "NEW SABHA",
    color: "bg-emerald-600",
  },
  {
    id: "tick-4",
    user: "Meera Rathore",
    city: "Jaipur",
    action: "confirmed solar streetlight installation in Sector 7",
    timeAgo: "5m ago",
    category: "Civic & Roads",
    badge: "WARD RESOLVED",
    color: "bg-blue-600",
  },
  {
    id: "tick-5",
    user: "Dr. Vikram Kulkarni",
    city: "Mumbai",
    action: "donated 12 laptops for municipal school weekend AI labs",
    timeAgo: "8m ago",
    category: "Education",
    badge: "NEW SABHA",
    color: "bg-emerald-600",
  },
];

export function CivicTicker() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = tickerItems[index];
  const isLiked = likedIds.includes(current.id);

  const handleLike = () => {
    if (isLiked) {
      setLikedIds((prev) => prev.filter((id) => id !== current.id));
      toast.info("Support removed.");
    } else {
      setLikedIds((prev) => [...prev, current.id]);
      toast.success(`Aapne ${current.user} ke civic effort ko appreciate kiya! ❤️`);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden border-b border-cloud bg-obsidian py-2.5 sm:py-3 px-4 sm:px-6 text-snow shadow-md transition-all selection:bg-ember selection:text-snow"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 text-[12px] sm:text-[13px]">
        {/* Left Indicator */}
        <div className="flex items-center gap-2 flex-none">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold tracking-wider uppercase text-[10px] sm:text-[11px] text-ember flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> LIVE CIVIC IMPACT
          </span>
          <span className="text-cloud/40 hidden md:inline">|</span>
        </div>

        {/* Center Animated Activity Item */}
        <div className="flex-1 overflow-hidden min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 truncate"
            >
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-snow ${current.color} flex-none`}>
                {current.badge}
              </span>
              <span className="font-semibold text-snow flex items-center gap-1 truncate">
                {current.user}
                <ShieldCheck className="h-3 w-3 text-blue-400 flex-none hidden sm:inline" />
              </span>
              <span className="text-ash truncate">
                {current.action} <span className="text-fog">({current.city})</span>
              </span>
              <span className="text-[11px] text-fog/70 flex-none hidden lg:inline">· {current.timeAgo}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-none">
          <button
            onClick={handleLike}
            title="Appreciate this action"
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
              isLiked ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white/10 text-snow hover:bg-white/20"
            }`}
          >
            <Heart className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{isLiked ? "Supported" : "Appreciate"}</span>
          </button>

          <button
            onClick={() => {
              toast.info("Scrolled to Live Sabhas Feed!");
              const el = document.getElementById("sabhas");
              if (el) {
                const yOffset = -84;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold text-ember hover:underline cursor-pointer"
          >
            <span>View All</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
