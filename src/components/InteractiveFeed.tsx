import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ThumbsUp, Share2, Users, MapPin, Sparkles, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "./AuthModal";

interface FeedItem {
  id: string;
  category: "Civic & Roads" | "Water & Green" | "Women Safety" | "Education" | "All";
  title: string;
  desc: string;
  sabha: string;
  author: string;
  authorRole: string;
  timeAgo: string;
  upvotes: number;
  comments: number;
  participants: number;
  status: "LIVE DISCUSSION" | "PETITION FILED" | "MUNICIPAL RESPONSE" | "ACTION IN PROGRESS";
  badgeColor: string;
}

const initialTopics: FeedItem[] = [
  {
    id: "top-1",
    category: "Water & Green",
    title: "Clean Yamuna Floodplain & Biodiversity Revival Project",
    desc: "We are organizing a 500-citizen volunteer clean-up drive this Sunday at ITO Ghat. Municipal waste disposal trucks have been coordinated. Join the volunteer squad now!",
    sabha: "Delhi Sabha",
    author: "Rohan Verma",
    authorRole: "Environmental Lead",
    timeAgo: "15 mins ago",
    upvotes: 342,
    comments: 84,
    participants: 1280,
    status: "LIVE DISCUSSION",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "top-2",
    category: "Civic & Roads",
    title: "Whitefield & Outer Ring Road Pothole Audit Dashboard",
    desc: "Citizens have geo-tagged 142 hazardous potholes across Sector 3 and 4. The joint petition has been formally submitted to BBMP with visual evidence.",
    sabha: "Bengaluru Sabha",
    author: "Ananya Iyer",
    authorRole: "Ward Committee Member",
    timeAgo: "1 hour ago",
    upvotes: 521,
    comments: 156,
    participants: 2450,
    status: "PETITION FILED",
    badgeColor: "bg-amber-500",
  },
  {
    id: "top-3",
    category: "Women Safety",
    title: "24/7 Safe Night Shelters & Women E-Rickshaw Network Pilot",
    desc: "Discussing the feasibility of CCTV-surveilled transit waiting zones and dedicated women-driven e-rickshaws outside major metro stations after 10 PM.",
    sabha: "Mumbai Sabha",
    author: "Pooja Deshmukh",
    authorRole: "Safety Advocate",
    timeAgo: "3 hours ago",
    upvotes: 689,
    comments: 210,
    participants: 3100,
    status: "MUNICIPAL RESPONSE",
    badgeColor: "bg-purple-500",
  },
  {
    id: "top-4",
    category: "Education",
    title: "Free Weekend AI & Robotics Labs in Municipal Schools",
    desc: "Tech professionals in Pune are partnering with local municipal schools to donate refurbished laptops and teach coding every Saturday. Seeking 20 mentor volunteers.",
    sabha: "Pune Sabha",
    author: "Vikram Kulkarni",
    authorRole: "Youth Mentor",
    timeAgo: "5 hours ago",
    upvotes: 412,
    comments: 67,
    participants: 940,
    status: "ACTION IN PROGRESS",
    badgeColor: "bg-blue-500",
  },
  {
    id: "top-5",
    category: "Civic & Roads",
    title: "Smart Streetlighting Audit & Dark Spot Removal in North Zone",
    desc: "We identified 38 non-functional LED streetlights along pedestrian pathways. Electricity department has committed to replacing bulbs within 48 hours.",
    sabha: "Jaipur Sabha",
    author: "Meera Rathore",
    authorRole: "Civic Coordinator",
    timeAgo: "8 hours ago",
    upvotes: 278,
    comments: 42,
    participants: 620,
    status: "LIVE DISCUSSION",
    badgeColor: "bg-emerald-500",
  },
];

const categories = ["All", "Civic & Roads", "Water & Green", "Women Safety", "Education"] as const;

interface InteractiveFeedProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export function InteractiveFeed({ user, onOpenAuth }: InteractiveFeedProps) {
  const [selectedCat, setSelectedCat] = useState<typeof categories[number]>("All");
  const [topics, setTopics] = useState<FeedItem[]>(initialTopics);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const filteredTopics = selectedCat === "All" ? topics : topics.filter(t => t.category === selectedCat);

  const handleUpvote = (id: string, title: string) => {
    if (!user) {
      toast.error("Upvote karne ke liye kripya pehle Login karein!");
      onOpenAuth();
      return;
    }
    if (upvotedIds.includes(id)) {
      setUpvotedIds(prev => prev.filter(i => i !== id));
      setTopics(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes - 1 } : t));
      toast.info("Upvote removed.");
    } else {
      setUpvotedIds(prev => [...prev, id]);
      setTopics(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
      toast.success("Aapne is civic mudde ko support (upvote) kiya!");
    }
  };

  const handleJoinDiscussion = (id: string, title: string) => {
    if (!user) {
      toast.error("Sabha discussion me bhag lene ke liye Login / Register karein!");
      onOpenAuth();
      return;
    }
    if (joinedIds.includes(id)) {
      toast.info("Aap pehle se hi is discussion me shamil hain.");
    } else {
      setJoinedIds(prev => [...prev, id]);
      setTopics(prev => prev.map(t => t.id === id ? { ...t, participants: t.participants + 1 } : t));
      toast.success(`Badhai ho! Aap '${title.slice(0, 30)}...' sabha discussion me shamil ho chuke hain.`);
    }
  };

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Discussion link clipboard me copy ho gaya hai! Apne dosto ke saath share karein.");
  };

  return (
    <section id="sabhas" className="px-6 py-20 sm:py-28 bg-paper">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-[10px] bg-ember/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ember">
                <Sparkles className="h-3 w-3" /> LIVE SABHA FEED
              </span>
              <span className="text-[12px] font-medium text-fog">Real-time Citizen Action</span>
            </div>
            <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] text-obsidian sm:text-[48px]">
              Active discussions shaping our cities.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-steel">
            Filter by civic category, support verified citizen initiatives, and join real-world working groups in your neighborhood.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-cloud pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-[14px] px-4 py-2.5 text-[13px] font-medium transition-all ${
                selectedCat === cat
                  ? "bg-obsidian text-snow shadow-md scale-[1.02]"
                  : "bg-snow text-graphite border border-cloud hover:border-iron"
              }`}
            >
              {cat === "All" ? "🔥 All Live Sabhas" : cat}
            </button>
          ))}
        </div>

        {/* Feed Cards Grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((item, idx) => {
              const isUpvoted = upvotedIds.includes(item.id);
              const isJoined = joinedIds.includes(item.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={item.id}
                  className="group flex flex-col justify-between rounded-[32px] border border-cloud bg-snow p-7 transition-all hover:border-iron/40 hover:shadow-xl"
                >
                  <div>
                    {/* Top strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-snow ${item.badgeColor}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                          {item.status}
                        </span>
                        <span className="rounded-[8px] bg-paper px-2 py-0.5 text-[11px] font-medium text-graphite border border-cloud">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-fog">
                        <MapPin className="h-3.5 w-3.5 text-ember" /> {item.sabha}
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="mt-4 text-[20px] font-semibold leading-[1.3] tracking-tight text-obsidian group-hover:text-ember transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-steel line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Author info & Actions footer */}
                  <div className="mt-6 pt-5 border-t border-cloud flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-obsidian text-[12px] font-bold text-snow">
                        {item.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[13px] font-semibold text-obsidian">
                          {item.author} <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <div className="text-[11px] text-fog">{item.authorRole} · {item.timeAgo}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(item.id, item.title)}
                        className={`flex items-center gap-1.5 rounded-[12px] px-3 py-2 text-[12px] font-medium transition-all ${
                          isUpvoted
                            ? "bg-ember text-snow shadow-sm"
                            : "bg-paper text-graphite border border-cloud hover:bg-cloud"
                        }`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${isUpvoted ? "fill-current" : ""}`} />
                        <span>{item.upvotes}</span>
                      </button>

                      {/* Comments / Join button */}
                      <button
                        onClick={() => handleJoinDiscussion(item.id, item.title)}
                        className={`flex items-center gap-1.5 rounded-[12px] px-3.5 py-2 text-[12px] font-medium transition-all ${
                          isJoined
                            ? "bg-emerald-600 text-snow shadow-sm"
                            : "bg-obsidian text-snow hover:bg-graphite"
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Joined ({item.participants})</span>
                          </>
                        ) : (
                          <>
                            <Users className="h-3.5 w-3.5" />
                            <span>Join Sabha</span>
                          </>
                        )}
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(item.title)}
                        title="Share discussion"
                        className="rounded-[12px] border border-cloud bg-paper p-2 text-fog hover:text-obsidian hover:bg-cloud transition-colors"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
