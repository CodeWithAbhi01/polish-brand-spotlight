import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Loader2, Mic } from "lucide-react";
import { toast } from "sonner";
import type { UserProfile } from "@/data/types";
import logoMark from "@/assets/logo-mark.png";
import civicTownhall from "@/assets/civic-townhall.jpg";
import communityVolunteers from "@/assets/community-volunteers.jpg";
import govtCitizenCollaboration from "@/assets/govt-citizen-collaboration.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
} as const;

interface HeroProps {
  user: UserProfile | null;
  onOpenSignupWithEmail: (email: string) => void;
  onOpenReport: () => void;
}

const VoiceWave = () => (
  <div className="flex items-center gap-1 h-5 mx-2">
    {[0.2, 0.5, 1, 0.6, 0.3].map((scale, i) => (
      <motion.div
        key={i}
        animate={{ scaleY: [scale, 1.2, scale] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
        className="w-[3px] h-full rounded-full bg-ember origin-bottom"
      />
    ))}
  </div>
);

export function HeroSection({ user, onOpenSignupWithEmail, onOpenReport }: HeroProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const smoothScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -84;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleJoinClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      toast.info("You are already logged in! Explore active Sabhas below.");
      smoothScrollToSection("sabhas");
    } else {
      if (!emailInput.trim()) {
        toast.error("Please enter your email or phone number first!");
        return;
      }

      // Realistic Contact Verification Simulation
      setIsVerifying(true);
      toast.info("Verifying mobile/email with National Civic Citizen Registry...");

      setTimeout(() => {
        setIsVerifying(false);
        toast.success(`Congratulations! '${emailInput}' is pre-verified for ward access. Welcome to the movement.`);
        onOpenSignupWithEmail(emailInput);
      }, 1000);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Enhanced Animated gradient orbs */}
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ember/10 to-transparent blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>

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
            className="mt-5 sm:mt-6 text-[38px] font-bold leading-[1.1] tracking-[-0.04em] text-obsidian sm:text-[48px] md:text-[60px] lg:text-[72px] lg:leading-[1.05]"
          >
            Where every voice<br />
            builds a <span className="italic font-normal bg-gradient-to-r from-ember via-orange-500 to-ember bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmerSlide_4s_ease-in-out_infinite]">movement</span>.
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
            <div className="flex flex-col sm:flex-row w-full max-w-md items-stretch sm:items-center gap-2 rounded-[20px] border border-white/40 bg-white/40 backdrop-blur-xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email or mobile number..."
                disabled={isVerifying}
                className="flex-1 bg-transparent px-4 py-3 text-[15px] font-medium text-obsidian outline-none placeholder:text-fog disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-obsidian px-6 py-3.5 text-[14px] font-bold text-snow transition-all hover:bg-ember hover:shadow-lg hover:shadow-ember/20 disabled:opacity-50 hover:-translate-y-0.5 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-ember" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>{user ? "Explore Sabhas" : "Verify & Join"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
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

        {/* Right — Perfectly aligned editorial card stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-5 w-full max-w-[480px] mx-auto lg:ml-auto lg:mt-4"
        >
          {/* Main Card */}
          <div className="group rounded-[32px] border border-cloud bg-white/80 backdrop-blur-xl p-7 sm:p-8 shadow-[0_16px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(255,90,0,0.08)] transition-all duration-300 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ember/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Header part with Voice wave and Live text */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-cloud/60 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/10 px-3 py-1.5 text-[11px] font-bold text-ember uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse"></span> LIVE
                </span>
                <VoiceWave />
              </div>
              <span className="text-[12px] font-semibold text-fog flex items-center gap-1 bg-paper px-3 py-1.5 rounded-full border border-cloud">
                <MapPin className="h-3.5 w-3.5 text-obsidian" /> Delhi Sabha
              </span>
            </div>
            <div className="flex items-center gap-4">
              <img src={logoMark} alt="" className="h-12 w-12 sm:h-14 sm:w-14 rounded-[12px] border border-cloud/60 object-contain p-2 bg-paper flex-none shadow-sm" />
              <div>
                <div className="text-[16px] sm:text-[18px] font-bold text-obsidian tracking-tight">Clean Yamuna Citizen Initiative</div>
                <div className="text-[12px] sm:text-[13px] text-steel font-medium mt-0.5">1,284 verified voices · 12 wards active</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5 relative z-10">
              {["Water Preservation", "Civic Audit", "Volunteer Squad", "Municipal Action"].map(t => (
                <span key={t} className="rounded-full border border-cloud bg-snow px-3 py-1.5 text-[12px] font-medium text-graphite hover:border-obsidian/20 hover:bg-paper transition-colors cursor-default shadow-sm">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="group rounded-[28px] border border-cloud bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white flex flex-col justify-center">
              <div className="text-[34px] sm:text-[42px] font-black leading-none tracking-tight text-obsidian">
                <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>50k+</motion.span>
              </div>
              <div className="mt-2 text-[13px] font-medium text-steel leading-snug">Citizens engaged nationwide</div>
            </div>
            <div className="group rounded-[28px] border border-cloud bg-obsidian text-snow p-6 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ember/20 rounded-full blur-2xl group-hover:bg-ember/30 transition-colors duration-500 pointer-events-none"></div>
              <div className="text-[34px] sm:text-[42px] font-black leading-none tracking-tight">
                <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>92%</motion.span>
              </div>
              <div className="mt-2 text-[13px] font-medium text-snow/80 leading-snug relative z-10">Issues routed to officials</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trusted By Government & Civic Bodies */}
      <div className="mx-auto max-w-[1200px] border-t border-cloud mt-6 sm:mt-10 px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="text-center mb-8">
          <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-ash mb-2">
            Trusted Infrastructure
          </p>
          <p className="text-[13px] sm:text-[14px] text-steel max-w-lg mx-auto">
            Built on open civic data standards used by municipal bodies across India
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Digital India */}
          <div className="group flex flex-col items-center gap-3 rounded-[20px] border border-cloud bg-snow p-5 sm:p-6 hover:shadow-lg hover:border-ember/20 transition-all hover:-translate-y-1 cursor-default">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-inner">
                <span className="text-white text-[10px] font-black">DI</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[14px] sm:text-[15px] font-bold text-obsidian">Digital India</div>
              <div className="text-[11px] text-fog mt-0.5">Open Data Platform</div>
            </div>
          </div>

          {/* Swachh Bharat */}
          <div className="group flex flex-col items-center gap-3 rounded-[20px] border border-cloud bg-snow p-5 sm:p-6 hover:shadow-lg hover:border-emerald-300/40 transition-all hover:-translate-y-1 cursor-default">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
              <svg className="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 12l3 3 5-5"/></svg>
            </div>
            <div className="text-center">
              <div className="text-[14px] sm:text-[15px] font-bold text-obsidian">Swachh Bharat</div>
              <div className="text-[11px] text-fog mt-0.5">Urban Mission Data</div>
            </div>
          </div>

          {/* SMART Cities */}
          <div className="group flex flex-col items-center gap-3 rounded-[20px] border border-cloud bg-snow p-5 sm:p-6 hover:shadow-lg hover:border-indigo-300/40 transition-all hover:-translate-y-1 cursor-default">
            <div className="w-14 h-14 rounded-[14px] bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
              <svg className="w-7 h-7 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
            </div>
            <div className="text-center">
              <div className="text-[14px] sm:text-[15px] font-bold text-obsidian">SMART Cities</div>
              <div className="text-[11px] text-fog mt-0.5">Mission Integration</div>
            </div>
          </div>

          {/* NIC */}
          <div className="group flex flex-col items-center gap-3 rounded-[20px] border border-cloud bg-snow p-5 sm:p-6 hover:shadow-lg hover:border-slate/20 transition-all hover:-translate-y-1 cursor-default">
            <div className="w-14 h-14 rounded-[14px] bg-obsidian flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-snow text-[13px] font-black tracking-tight">NIC</span>
            </div>
            <div className="text-center">
              <div className="text-[14px] sm:text-[15px] font-bold text-obsidian">NIC India</div>
              <div className="text-[11px] text-fog mt-0.5">Secure Infrastructure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Photo Strip */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/3] group">
            <img src={civicTownhall} alt="Citizens in town hall meeting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <div className="text-[13px] sm:text-[15px] font-bold text-snow">Town Hall Sabhas</div>
              <div className="text-[10px] sm:text-[11px] text-snow/70">12 cities · Weekly</div>
            </div>
          </div>
          <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/3] group">
            <img src={communityVolunteers} alt="Community volunteers in action" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <div className="text-[13px] sm:text-[15px] font-bold text-snow">Volunteer Drives</div>
              <div className="text-[10px] sm:text-[11px] text-snow/70">50,000+ citizens</div>
            </div>
          </div>
          <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/3] group">
            <img src={govtCitizenCollaboration} alt="Citizens and officials collaborating" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <div className="text-[13px] sm:text-[15px] font-bold text-snow">Direct Collaboration</div>
              <div className="text-[10px] sm:text-[11px] text-snow/70">Citizens & Officials</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
