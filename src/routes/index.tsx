import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, ShieldCheck, Lightbulb, Target, TrendingUp,
  MessageCircle, Megaphone, Handshake, ArrowRight, Bell, Globe, Sparkles,
  CheckCircle2, Menu, ArrowUpRight, User, LogOut, LayoutDashboard, Settings, MapPin, Award, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import logoMark from "@/assets/logo-mark.png";
import community from "@/assets/community.jpg";
import { AuthModal, UserProfile } from "@/components/AuthModal";
import { InteractiveFeed } from "@/components/InteractiveFeed";
import { CivicPoll } from "@/components/CivicPoll";

export const Route = createFileRoute("/")({
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
} as const;

const values = [
  { icon: Users, title: "Community First", desc: "We believe in the power of people coming together, sharing ideas and creating impact." },
  { icon: ShieldCheck, title: "Trust & Transparency", desc: "We build a space driven by honesty, respect and open communication." },
  { icon: Lightbulb, title: "Empowerment", desc: "We empower every individual to express, participate and lead positive change." },
  { icon: Target, title: "Inclusivity", desc: "Everyone has a voice here. We celebrate diversity and welcome everyone." },
  { icon: TrendingUp, title: "Growth Together", desc: "Together we learn, grow and build a better tomorrow." },
];

const features = [
  { icon: Users, title: "Connect", desc: "Find and follow people who share your interests, causes and neighborhood." },
  { icon: MessageCircle, title: "Discuss", desc: "Join meaningful conversations, structured debates and topic-based rooms." },
  { icon: Megaphone, title: "Express", desc: "Share your views and be heard fearlessly with polls, posts and voice notes." },
  { icon: Handshake, title: "Collaborate", desc: "Work together on ideas that create real, measurable impact in the real world." },
];

const highlights = [
  { icon: ShieldCheck, label: "Secure & Safe" },
  { icon: Sparkles, label: "User Friendly" },
  { icon: Bell, label: "Real-time Engagement" },
  { icon: Globe, label: "Accessible Anywhere" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <img src={logoMark} alt="ApniSabha" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
      <div className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-obsidian leading-none">
        ApniSabha
      </div>
    </a>
  );
}

function DarkBtn({ onClick, href, children, className = "" }: { onClick?: () => void; href?: string; children: React.ReactNode; className?: string }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] bg-obsidian px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-snow transition-transform hover:-translate-y-[1px] cursor-pointer ${className}`}
        style={{ boxShadow: "inset 0 0.5px 0 0 rgba(255,255,255,0.5), 0 0 0 1.5px #2c2e34, 0 4px 6px 0 rgba(0,0,0,0.14)" }}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href || "#"}
      className={`inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] bg-obsidian px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-snow transition-transform hover:-translate-y-[1px] ${className}`}
      style={{ boxShadow: "inset 0 0.5px 0 0 rgba(255,255,255,0.5), 0 0 0 1.5px #2c2e34, 0 4px 6px 0 rgba(0,0,0,0.14)" }}
    >
      {children}
    </a>
  );
}

function GhostBtn({ onClick, href, children, className = "" }: { onClick?: () => void; href?: string; children: React.ReactNode; className?: string }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] border border-cloud bg-snow px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-graphite transition-colors hover:border-iron cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href || "#"}
      className={`inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] border border-cloud bg-snow px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-graphite transition-colors hover:border-iron ${className}`}
    >
      {children}
    </a>
  );
}

interface NavProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

function Nav({ user, onOpenLogin, onOpenSignup, onLogout }: NavProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const links = [
    { label: "Values", href: "#values" },
    { label: "Features", href: "#features" },
    { label: "Live Sabhas", href: "#sabhas" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-cloud/60">
      <div className="mx-auto flex h-[68px] sm:h-[76px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[14px] font-medium text-graphite/80 transition-colors hover:text-obsidian">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right action area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-full border border-cloud bg-snow py-1 pl-1.5 pr-2.5 sm:py-1.5 sm:pl-2 sm:pr-3.5 shadow-sm hover:border-iron transition-all"
              >
                <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-ember text-[11px] sm:text-[12px] font-bold text-snow">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[12px] sm:text-[13px] font-semibold text-obsidian leading-none flex items-center gap-1">
                    {user.name} <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-fog">{user.city}</div>
                </div>
              </button>

              {/* Desktop Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-[20px] sm:rounded-[24px] border border-cloud bg-snow p-2 shadow-2xl animate-fade-in z-50">
                  <div className="px-3 py-2 border-b border-cloud mb-1">
                    <div className="text-[13px] font-semibold text-obsidian">{user.name}</div>
                    <div className="text-[11px] text-fog">{user.email}</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-[8px] bg-ember/10 px-2 py-0.5 text-[10px] font-bold text-ember">
                      <Award className="h-3 w-3" /> {user.role}
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowProfileMenu(false); toast.info("Opening Meri Sabha Dashboard..."); }}
                    className="w-full flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13px] text-graphite hover:bg-paper transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-fog" /> Meri Sabha Dashboard
                  </button>
                  <button
                    onClick={() => { setShowProfileMenu(false); toast.info("Profile settings opened."); }}
                    className="w-full flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13px] text-graphite hover:bg-paper transition-colors"
                  >
                    <Settings className="h-4 w-4 text-fog" /> Account Settings
                  </button>
                  <div className="my-1 border-t border-cloud"></div>
                  <button
                    onClick={() => { setShowProfileMenu(false); onLogout(); }}
                    className="w-full flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 text-red-500" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="hidden rounded-[14px] px-3.5 py-2 text-[14px] font-medium text-graphite transition-colors hover:bg-cloud/60 hover:text-obsidian md:inline-block cursor-pointer"
              >
                Login
              </button>
              <DarkBtn onClick={onOpenSignup} className="!py-2 !px-3.5 sm:!py-2.5 sm:!px-4 shadow-md text-[13px] sm:text-[14px]">
                <span className="whitespace-nowrap">Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </DarkBtn>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="ml-1 rounded-[10px] p-2 text-graphite hover:bg-cloud/60 md:hidden transition-colors"
            aria-label="Menu"
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Polished and Full-featured */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cloud bg-snow px-4 py-5 md:hidden overflow-hidden shadow-2xl"
          >
            {/* User card in mobile drawer */}
            {user ? (
              <div className="mb-4 rounded-[18px] bg-paper p-3.5 border border-cloud">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-ember text-[14px] font-bold text-snow">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-obsidian flex items-center gap-1">
                      {user.name} <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-[12px] text-fog">{user.city} · {user.role}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-cloud/80">
                  <button
                    onClick={() => { setShowMenu(false); toast.info("Opening Meri Sabha Dashboard..."); }}
                    className="flex items-center justify-center gap-1.5 rounded-[10px] bg-snow py-2 text-[12px] font-medium text-obsidian border border-cloud"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); onLogout(); }}
                    className="flex items-center justify-center gap-1.5 rounded-[10px] bg-red-50 py-2 text-[12px] font-medium text-red-600 border border-red-200"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => { setShowMenu(false); onOpenLogin(); }}
                  className="rounded-[12px] border border-cloud bg-paper py-2.5 text-center text-[13px] font-semibold text-graphite"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setShowMenu(false); onOpenSignup(); }}
                  className="rounded-[12px] bg-ember py-2.5 text-center text-[13px] font-semibold text-snow shadow-sm"
                >
                  Join Sabha
                </button>
              </div>
            )}

            <nav className="flex flex-col divide-y divide-cloud/60">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setShowMenu(false)}
                  className="flex items-center justify-between py-3.5 text-[15px] font-medium text-graphite hover:text-obsidian"
                >
                  <span>{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-fog" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface HeroProps {
  user: UserProfile | null;
  onOpenSignup: () => void;
}

function Hero({ user, onOpenSignup }: HeroProps) {
  const [emailInput, setEmailInput] = useState("");

  const handleJoinClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      toast.info("Aap pehle se hi logged in hain! Niche Live Sabhas explore karein.");
      const el = document.getElementById("sabhas");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      if (emailInput) {
        toast.info(`Great! Proceeding with ${emailInput}. Complete your profile:`);
      }
      onOpenSignup();
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-b from-ember/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="mx-auto grid max-w-[1200px] gap-12 sm:gap-16 px-4 sm:px-6 pb-14 sm:pb-20 pt-8 sm:pt-16 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 relative z-10">
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="inline-flex items-center gap-1.5 rounded-[10px] sm:rounded-[12px] bg-ember px-2.5 py-1 sm:px-3 sm:py-1 text-[11px] sm:text-[12px] font-bold text-snow uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" style={{ animationDuration: "8s" }} /> APNA MANCH · APNI AWAAZ
            </span>
            <span className="text-[11px] sm:text-[12px] font-medium text-fog">India's Civic Community Platform</span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="mt-4 sm:mt-6 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-obsidian sm:text-[46px] md:text-[56px] lg:text-[64px] lg:leading-[1.05]"
          >
            Where every voice<br />
            builds a <span className="italic font-normal text-iron">movement</span>.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-4 sm:mt-6 max-w-xl text-[14px] sm:text-[16px] leading-[1.6] text-steel"
          >
            ApniSabha is a digital manch where citizens and leaders connect without barriers, debate real-world issues, and collaborate on actionable community solutions.
          </motion.p>

          <motion.form
            onSubmit={handleJoinClick}
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-col sm:flex-row w-full max-w-md items-stretch sm:items-center gap-2 rounded-[18px] border border-cloud bg-snow p-2 shadow-lg">
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email or mobile number..."
                className="flex-1 bg-transparent px-3 py-2.5 text-[14px] text-graphite outline-none placeholder:text-ash"
              />
              <DarkBtn onClick={() => {}} className="!py-3 !px-5 shadow-sm justify-center">
                {user ? "Explore Sabhas" : "Join Sabha"}
                <ArrowRight className="h-4 w-4" />
              </DarkBtn>
            </div>
          </motion.form>

          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] text-fog font-medium"
          >
            {["Free forever for citizens", "No ads, 100% data privacy", "Verified civic identities"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-none" /> <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — editorial card stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-3.5 sm:gap-4"
        >
          <div className="rounded-[26px] sm:rounded-[36px] border border-cloud bg-snow p-5 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-[10px] sm:rounded-[12px] bg-ember px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-snow">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span> LIVE DISCUSSION
              </span>
              <span className="text-[11px] sm:text-[12px] font-semibold text-fog flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-ember" /> Delhi Sabha
              </span>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <img src={logoMark} alt="" className="h-10 w-10 sm:h-12 sm:w-12 rounded-[14px] sm:rounded-[16px] border border-cloud object-contain p-1.5 bg-paper flex-none" />
              <div>
                <div className="text-[15px] sm:text-[17px] font-semibold text-obsidian leading-snug">Clean Yamuna Citizen Initiative</div>
                <div className="text-[12px] sm:text-[13px] text-fog font-medium">1,284 verified voices · 12 wards active</div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5">
              {["Water Preservation", "Civic Audit", "Volunteer Squad", "Municipal Action"].map(t => (
                <span key={t} className="rounded-[10px] sm:rounded-[12px] border border-cloud bg-paper px-2.5 py-1 text-[11px] sm:text-[12px] font-medium text-graphite">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
            <div className="rounded-[22px] sm:rounded-[28px] border border-cloud bg-snow p-4 sm:p-6 shadow-md">
              <div className="text-[26px] sm:text-[32px] font-bold leading-none tracking-tight text-obsidian">50,000+</div>
              <div className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-steel">Verified citizens across India</div>
            </div>
            <div className="rounded-[22px] sm:rounded-[28px] border border-cloud bg-obsidian p-4 sm:p-6 text-snow shadow-xl">
              <div className="text-[26px] sm:text-[32px] font-bold leading-none tracking-tight text-ember">1,200+</div>
              <div className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-ash">Active ward sabhas and rooms</div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[22px] sm:rounded-[28px] border border-cloud bg-snow px-5 py-3.5 sm:px-6 sm:py-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex-none">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-obsidian leading-tight">New petition in Bengaluru</div>
                <div className="text-[11px] sm:text-[12px] text-fog">Whitefield Pothole Audit · Just now</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-iron flex-none" />
          </div>
        </motion.div>
      </div>

      {/* Logo strip / social proof */}
      <div className="mx-auto max-w-[1200px] border-y border-cloud px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-fog text-center">
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-ash w-full sm:w-auto">Active Sabhas in Metro Cities:</span>
          {["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Jaipur", "Hyderabad", "Kolkata", "Lucknow"].map(c => (
            <span key={c} className="text-[13px] sm:text-[15px] font-semibold text-graphite flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 flex-none"></span> {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section id="values" className="px-4 sm:px-6 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] rounded-[26px] sm:rounded-[36px] bg-obsidian p-6 sm:p-10 md:p-14 text-snow shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start relative z-10">
          <div>
            <span className="inline-flex items-center rounded-[10px] sm:rounded-[12px] bg-ember px-3 py-1 text-[10px] sm:text-[11px] font-bold text-snow uppercase tracking-wider">
              Brand Principles
            </span>
            <h2 className="mt-3.5 sm:mt-5 text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px] md:text-[48px]">
              Five pillars that protect every voice.
            </h2>
            <p className="mt-3.5 sm:mt-5 max-w-md text-[14px] sm:text-[16px] leading-relaxed text-ash">
              ApniSabha is built as a public democratic infrastructure. A digital sanctuary where honesty, respect, and constructive action replace toxic social algorithms.
            </p>
          </div>

          <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                custom={i} variants={fadeUp}
                className="group rounded-[20px] sm:rounded-[26px] border border-white/10 bg-slate/80 p-5 sm:p-6 transition-all hover:border-white/30 hover:bg-slate shadow-lg"
              >
                <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-[12px] sm:rounded-[14px] bg-snow/10 text-snow group-hover:bg-ember group-hover:text-snow transition-colors">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 sm:mt-5 text-[17px] sm:text-[19px] font-semibold tracking-tight text-snow">{v.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] leading-relaxed text-ash">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-4 sm:px-6 py-14 sm:py-20 md:py-28 bg-paper">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-ember">What You Can Do</span>
            <h2 className="mt-2.5 sm:mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-obsidian sm:text-[40px] md:text-[52px]">
              One manch.<br />Endless community power.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] sm:text-[16px] leading-relaxed text-steel">
            From voicing a ward issue to coordinating a city-wide civic campaign — all democratic tools live in your hands.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              custom={i} variants={fadeUp}
              className="group flex flex-col justify-between rounded-[26px] sm:rounded-[36px] border border-cloud bg-snow p-6 sm:p-8 transition-all hover:border-iron hover:shadow-xl"
            >
              <div>
                <div className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-[14px] sm:rounded-[16px] bg-paper text-obsidian group-hover:bg-obsidian group-hover:text-snow transition-colors">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-6 sm:mt-8 text-[20px] sm:text-[22px] font-semibold tracking-tight text-obsidian">{f.title}</h3>
                <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-steel">{f.desc}</p>
              </div>
              <div className="mt-6 sm:mt-8 flex items-center gap-1.5 text-[13px] font-semibold text-obsidian pt-4 border-t border-cloud">
                Explore feature <ArrowUpRight className="h-4 w-4 text-ember transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights strip */}
        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 rounded-[26px] sm:rounded-[36px] border border-cloud bg-snow p-5 sm:p-7 sm:grid-cols-2 lg:grid-cols-4 shadow-md">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-3 rounded-[18px] sm:rounded-[22px] bg-paper px-4 py-3 sm:px-5 sm:py-3.5 border border-cloud/50">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-[12px] sm:rounded-[14px] bg-snow text-obsidian border border-cloud shadow-sm flex-none">
                <h.icon className="h-4 w-4 sm:h-5 sm:w-5 text-ember" />
              </div>
              <div className="text-[14px] sm:text-[15px] font-semibold text-graphite">{h.label}</div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-3 pt-8 sm:pt-10 border-t border-cloud">
          {[
            { n: "50,000+", l: "Verified citizens building the digital manch every day" },
            { n: "1,200+", l: "Active ward sabhas across 240+ Indian cities and towns" },
            { n: "98.4%", l: "Members trust ApniSabha as a safe, unbiassed civic space" },
          ].map(s => (
            <div key={s.n} className="flex items-baseline gap-3 sm:gap-4">
              <div className="text-[38px] sm:text-[48px] font-bold leading-none tracking-[-0.03em] text-obsidian md:text-[58px]">{s.n}</div>
              <div className="text-[13px] sm:text-[14px] leading-relaxed text-steel font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-4 sm:px-6 py-14 sm:py-20 md:py-28 bg-snow border-t border-cloud">
      <div className="mx-auto grid max-w-[1200px] gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={community} alt="Community in conversation"
            width={1600} height={1200} loading="lazy"
            className="aspect-[4/3] w-full rounded-[26px] sm:rounded-[36px] border border-cloud object-cover shadow-2xl"
          />
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 rounded-[22px] sm:rounded-[28px] border border-cloud bg-obsidian p-4 sm:p-6 text-snow shadow-2xl max-w-[220px] sm:max-w-[260px] hidden sm:block">
            <div className="text-[20px] sm:text-[24px] font-bold text-ember">100% Democratic</div>
            <div className="text-[12px] sm:text-[13px] text-ash mt-1">No corporate algorithms. No echo chambers. Just community.</div>
          </div>
        </motion.div>

        <div>
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-ember">About ApniSabha</span>
          <h2 className="mt-2.5 sm:mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-obsidian sm:text-[40px] md:text-[52px]">
            A sanctuary for the people's voice.
          </h2>
          <p className="mt-4 sm:mt-5 text-[14px] sm:text-[16px] leading-[1.6] text-steel">
            ApniSabha was founded on a simple truth: real change doesn't happen in closed boardrooms; it happens when citizens talk to each other in their own neighborhoods.
          </p>

          <div className="mt-6 sm:mt-8 space-y-3">
            {[
              "Verified profiles and zero anonymity keep civic debates respectful and authentic.",
              "Dedicated ward, municipal and state-level sabhas so local problems get local focus.",
              "Multi-lingual interface — participate in Hindi, English, Marathi, Kannada, and Bengali.",
              "Civic accountability tools that connect community consensus directly to municipal authorities.",
            ].map(t => (
              <div key={t} className="flex items-start gap-3 rounded-[18px] sm:rounded-[22px] border border-cloud bg-paper px-4 py-3.5 sm:px-5 sm:py-4 transition-colors hover:border-iron/40">
                <div className="mt-0.5 grid h-5 w-5 sm:h-6 sm:w-6 flex-none place-items-center rounded-full bg-obsidian text-snow">
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
                </div>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-graphite font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CTASectionProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

function CTASection({ user, onOpenLogin, onOpenSignup }: CTASectionProps) {
  return (
    <section id="cta" className="px-4 sm:px-6 pb-16 sm:pb-24 pt-8 sm:pt-10 bg-snow">
      <div className="mx-auto max-w-[1200px] rounded-[26px] sm:rounded-[36px] border border-cloud bg-obsidian p-6 sm:p-10 md:p-16 text-snow shadow-2xl relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-ember/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.4fr_1fr] md:items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-[10px] sm:rounded-[12px] bg-ember px-3 py-1 text-[10px] sm:text-[11px] font-bold text-snow uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Join the Digital Manch
            </span>
            <h2 className="mt-3.5 sm:mt-5 text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-snow sm:text-[44px] md:text-[56px]">
              Your voice is where change begins.
            </h2>
            <p className="mt-3.5 sm:mt-5 max-w-xl text-[14px] sm:text-[16px] leading-relaxed text-ash">
              Join 50,000+ active citizens and community leaders shaping the conversation on ApniSabha. Free forever. Built for India.
            </p>
          </div>
          <div id="contact" className="flex flex-col gap-3 sm:gap-3.5">
            {user ? (
              <DarkBtn onClick={() => { toast.info("Scrolled to Active Sabhas!"); const el = document.getElementById("sabhas"); el?.scrollIntoView({ behavior: "smooth" }); }} className="justify-center !py-3.5 sm:!py-4 text-[15px] sm:text-[16px] !bg-ember hover:!bg-ember/90 shadow-lg shadow-ember/20">
                Explore Your Sabha Rooms <ArrowRight className="h-5 w-5" />
              </DarkBtn>
            ) : (
              <>
                <DarkBtn onClick={onOpenSignup} className="justify-center !py-3.5 sm:!py-4 text-[15px] sm:text-[16px] !bg-ember hover:!bg-ember/90 shadow-lg shadow-ember/20">
                  Register Your Verified Voice <ArrowRight className="h-5 w-5" />
                </DarkBtn>
                <GhostBtn onClick={onOpenLogin} className="justify-center !py-3.5 sm:!py-4 text-[15px] sm:text-[16px] !bg-slate !text-snow !border-slate hover:!bg-iron">
                  Login to Existing Account
                </GhostBtn>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cloud bg-paper">
      <div className="mx-auto grid max-w-[1200px] gap-8 sm:gap-10 px-4 sm:px-6 py-12 sm:py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3.5 sm:mt-4 max-w-xs text-[13px] sm:text-[14px] leading-relaxed text-steel">
            Apna Manch, Apni Awaaz — building a transparent, citizen-led digital public space for every neighborhood.
          </p>
          <div className="mt-5 sm:mt-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] sm:text-[12px] font-semibold text-emerald-600 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Systems 100% Operational
            </span>
          </div>
        </div>
        {[
          { title: "Platform", items: ["Live Sabhas", "Civic Pulse Polls", "Ward Audits", "Community Guidelines"] },
          { title: "Initiatives", items: ["Clean Yamuna Drive", "Pothole Free Bengaluru", "Women Transit Safety", "Govt School Tech Labs"] },
          { title: "Trust & Legal", items: ["Citizen Verification", "Data Privacy Promise", "Terms of Service", "Municipal Partnerships"] },
        ].map(col => (
          <div key={col.title}>
            <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-obsidian">{col.title}</div>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5 text-[13px] sm:text-[14px]">
              {col.items.map(i => (
                <li key={i}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); toast.info(`${i} section loading...`); }}
                    className="text-steel transition-colors hover:text-obsidian block py-0.5"
                  >
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cloud">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-6 sm:py-8 text-[12px] sm:text-[13px] text-fog sm:flex-row text-center">
          <div className="font-medium">© {new Date().getFullYear()} ApniSabha. All rights reserved. Built for democratic empowerment.</div>
          <div className="flex items-center gap-2">
            <span>Made with intention ·</span>
            <span className="font-semibold text-obsidian">Apna Manch, Apni Awaaz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from localStorage if saved
  useEffect(() => {
    const saved = localStorage.getItem("apnisabha_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem("apnisabha_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("apnisabha_user");
  };

  const openLogin = () => {
    setAuthTab("login");
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthTab("signup");
    setAuthOpen(true);
  };

  return (
    <main className="min-h-screen bg-paper text-graphite selection:bg-ember selection:text-snow">
      <Toaster position="top-right" richColors closeButton />
      
      <Nav
        user={user}
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
        onLogout={handleLogout}
      />
      <Hero
        user={user}
        onOpenSignup={openSignup}
      />
      <ValueSection />
      <FeaturesSection />
      
      {/* New Interactive Sections */}
      <InteractiveFeed
        user={user}
        onOpenAuth={openLogin}
      />
      <CivicPoll
        user={user}
        onOpenAuth={openLogin}
      />

      <AboutSection />
      <CTASection
        user={user}
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
      />
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialTab={authTab}
      />
    </main>
  );
}
