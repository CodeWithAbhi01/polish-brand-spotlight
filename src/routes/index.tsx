import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, ShieldCheck, Lightbulb, Target, TrendingUp,
  MessageCircle, Megaphone, Handshake, ArrowRight, Bell, Globe, Sparkles,
  CheckCircle2, Menu, ArrowUpRight, LogOut, LayoutDashboard, Settings, MapPin, Award, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import community from "@/assets/community.jpg";

import { AuthModal } from "@/components/AuthModal";
import type { UserProfile } from "@/data/types";
import { InteractiveFeed } from "@/components/InteractiveFeed";
import { CivicPoll } from "@/components/CivicPoll";
import { CivicTicker } from "@/components/CivicTicker";
import { ReportIssueModal } from "@/components/ReportIssueModal";

// Extracted Components
import { Logo } from "@/components/layout/Logo";
import { DarkBtn } from "@/components/shared/DarkBtn";
import { GhostBtn } from "@/components/shared/GhostBtn";
import { HeroSection } from "@/components/landing/HeroSection";

// New Feature Components
import { OfficialOnboardingModal } from "@/components/governance/OfficialOnboardingModal";
import { GovernanceDirectory } from "@/components/governance/GovernanceDirectory";
import { IssueTracker } from "@/components/issues/IssueTracker";
import { VolunteerBoard } from "@/components/community/VolunteerBoard";

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

export const smoothScrollToSection = (e?: React.MouseEvent, id?: string) => {
  if (e) e.preventDefault();
  if (!id || id === "#" || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const targetId = id.replace("#", "");
  const el = document.getElementById(targetId);
  if (el) {
    const yOffset = -84;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

interface NavProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onOpenReport: () => void;
  onLogout: () => void;
}

function Nav({ user, onOpenLogin, onOpenSignup, onOpenReport, onLogout }: NavProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showOfficialModal, setShowOfficialModal] = useState(false);

  const links = [
    { label: "Values", href: "#values" },
    { label: "Features", href: "#features" },
    { label: "Governance", href: "#governance" },
    { label: "Issue Tracker", href: "#tracker" },
    { label: "Live Sabhas", href: "#sabhas" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-cloud/60">
      <div className="mx-auto flex h-[68px] sm:h-[76px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Logo onClick={(e) => smoothScrollToSection(e, "top")} />
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => smoothScrollToSection(e, l.href)}
              className="text-[14px] font-medium text-graphite/80 transition-colors hover:text-obsidian"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right action area */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowOfficialModal(true)}
            className="hidden lg:flex items-center gap-1.5 rounded-[12px] bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-[12px] sm:text-[13px] font-bold text-blue-600 hover:bg-blue-500/20 transition-all shadow-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Official Portal</span>
          </button>

          <button
            onClick={onOpenReport}
            className="hidden md:flex items-center gap-1.5 rounded-[12px] bg-red-500/10 border border-red-500/20 px-3 py-2 text-[12px] sm:text-[13px] font-bold text-red-600 hover:bg-red-500/20 transition-all shadow-sm"
          >
            <Megaphone className="h-3.5 w-3.5 animate-bounce" />
            <span className="hidden sm:inline">Report Issue</span>
          </button>

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

                  <Link
                    to="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13px] text-graphite hover:bg-paper transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-fog" /> Civic Dashboard
                  </Link>
                  <button
                    onClick={() => { setShowProfileMenu(false); onOpenReport(); }}
                    className="w-full flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    <Megaphone className="h-4 w-4 text-red-500" /> Report Ward Issue
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

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="ml-1 rounded-[10px] p-2 text-graphite hover:bg-cloud/60 lg:hidden transition-colors"
            aria-label="Menu"
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      <OfficialOnboardingModal 
        isOpen={showOfficialModal} 
        onClose={() => setShowOfficialModal(false)} 
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cloud bg-snow px-4 py-5 lg:hidden overflow-hidden shadow-2xl"
          >
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
                    onClick={() => { setShowMenu(false); onOpenReport(); }}
                    className="flex items-center justify-center gap-1.5 rounded-[10px] bg-red-50 py-2 text-[12px] font-bold text-red-600 border border-red-200"
                  >
                    <Megaphone className="h-3.5 w-3.5" /> Report Issue
                  </button>
                  <a
                    href="/dashboard"
                    className="flex items-center justify-center gap-1.5 rounded-[10px] bg-snow py-2 text-[12px] font-medium text-graphite border border-cloud"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                  </a>
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
              <button
                onClick={() => { setShowMenu(false); onOpenReport(); }}
                className="flex items-center justify-between py-3.5 text-[15px] font-bold text-red-600 text-left w-full"
              >
                <span className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4" /> Report Ward Issue
                </span>
                <ArrowRight className="h-4 w-4 text-red-400" />
              </button>
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    smoothScrollToSection(e, l.href);
                    setShowMenu(false);
                  }}
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

function ValueSection() {
  return (
    <section id="values" className="px-4 sm:px-6 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] rounded-[26px] sm:rounded-[36px] bg-obsidian p-6 sm:p-10 md:p-14 text-snow shadow-2xl relative overflow-hidden">
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
              className="group flex flex-col justify-between rounded-[24px] sm:rounded-[32px] border border-cloud/80 bg-white p-6 sm:p-8 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-cloud"
            >
              <div>
                <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-[14px] sm:rounded-[16px] bg-gradient-to-br from-paper to-snow border border-cloud/60 text-obsidian shadow-sm group-hover:bg-gradient-to-br group-hover:from-obsidian group-hover:to-graphite group-hover:text-white transition-all duration-300">
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

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 rounded-[24px] sm:rounded-[32px] border border-cloud/80 bg-white p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-3 rounded-[16px] sm:rounded-[20px] bg-paper px-4 py-3 sm:px-5 sm:py-3.5 border border-cloud/50 hover:bg-snow transition-colors duration-300">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-[12px] sm:rounded-[14px] bg-snow text-obsidian border border-cloud shadow-sm flex-none">
                <h.icon className="h-4 w-4 sm:h-5 sm:w-5 text-ember" />
              </div>
              <div className="text-[14px] sm:text-[15px] font-semibold text-graphite">{h.label}</div>
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
  onOpenReport: () => void;
}

function CTASection({ user, onOpenLogin, onOpenSignup, onOpenReport }: CTASectionProps) {
  return (
    <section id="cta" className="px-4 sm:px-6 pb-16 sm:pb-24 pt-8 sm:pt-10 bg-snow">
      <div className="mx-auto max-w-[1200px] rounded-[26px] sm:rounded-[36px] border border-cloud bg-obsidian p-6 sm:p-10 md:p-16 text-snow shadow-2xl relative overflow-hidden">
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
              <>
                <DarkBtn onClick={() => { toast.info("Scrolled to Active Sabhas!"); smoothScrollToSection(undefined, "sabhas"); }} className="justify-center !py-3.5 sm:!py-4 text-[15px] sm:text-[16px] !bg-ember hover:!bg-ember/90 shadow-lg shadow-ember/20">
                  Explore Your Sabha Rooms <ArrowRight className="h-5 w-5" />
                </DarkBtn>
                <GhostBtn onClick={onOpenReport} className="justify-center !py-3.5 sm:!py-4 text-[15px] sm:text-[16px] !bg-red-600 !text-snow !border-red-600 hover:!bg-red-700">
                  <Megaphone className="h-5 w-5 animate-bounce" /> Report Local Ward Issue
                </GhostBtn>
              </>
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
          <Logo onClick={(e) => smoothScrollToSection(e, "top")} />
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
  const [authEmail, setAuthEmail] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("apnisabha_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {}
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
    setAuthEmail("");
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthTab("signup");
    setAuthEmail("");
    setAuthOpen(true);
  };

  const openSignupWithEmail = (email: string) => {
    setAuthTab("signup");
    setAuthEmail(email);
    setAuthOpen(true);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-graphite selection:bg-ember selection:text-snow">
      <Toaster position="top-right" richColors closeButton />
      
      <CivicTicker />

      <Nav
        user={user}
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
        onOpenReport={() => setReportOpen(true)}
        onLogout={handleLogout}
      />
      
      <HeroSection
        user={user}
        onOpenSignupWithEmail={openSignupWithEmail}
        onOpenReport={() => setReportOpen(true)}
      />
      
      <ValueSection />
      
      {/* ── NEW FEATURES INJECTED HERE ── */}
      <IssueTracker />
      
      <GovernanceDirectory />
      
      <VolunteerBoard />
      {/* ──────────────────────────────── */}

      <FeaturesSection />
      
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
        onOpenReport={() => setReportOpen(true)}
      />
      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialTab={authTab}
        initialEmail={authEmail}
      />

      <ReportIssueModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        user={user}
        onOpenAuth={openLogin}
      />
    </main>
  );
}
