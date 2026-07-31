import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Stethoscope, ShieldCheck, Activity, Users, ArrowRight, Upload } from "lucide-react";
import { toast, Toaster } from "sonner";

import { NurseOnboardingModal } from "@/components/nurse/NurseOnboardingModal";
import { NursePortfolioCard } from "@/components/nurse/NursePortfolioCard";
import { Logo } from "@/components/layout/Logo";

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

function Index() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [nurses, setNurses] = useState([
    {
      name: "Priya Sharma",
      hospital: "AIIMS, New Delhi",
      experience: "5-10",
      shifts: "morning",
      verified: true,
      license: "NCI-2018-4932",
    },
    {
      name: "Rahul Verma",
      hospital: "Safdarjung Hospital",
      experience: "3-5",
      shifts: "night",
      verified: true,
      license: "NCI-2020-1124",
    },
    {
      name: "Anita Desai",
      hospital: "NIMHANS, Bengaluru",
      experience: "10+",
      shifts: "evening",
      verified: true,
      license: "NCI-2012-9981",
    }
  ]);

  const handleNurseOnboardingComplete = (data: any) => {
    setNurses([data, ...nurses]);
  };

  return (
    <main className="min-h-screen bg-paper text-graphite selection:bg-ember selection:text-snow">
      <Toaster position="top-right" richColors closeButton />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-cloud/60 shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-ember text-white shadow-md">
              <Stethoscope size={22} />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-obsidian leading-none">CareNetwork</div>
              <div className="text-[11px] font-semibold text-steel uppercase tracking-widest mt-1">Healthcare Portal</div>
            </div>
          </div>
          <button 
            onClick={() => setOnboardingOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-xl bg-obsidian px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-graphite transition-all hover:scale-105"
          >
            <Upload size={16} />
            Join Network (Dummy Onboard)
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cloud/40 to-paper -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-600 border border-emerald-500/20 mb-6">
              <ShieldCheck size={14} /> Govt. Verified Professionals Only
            </span>
          </motion.div>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-bold text-obsidian tracking-tight leading-tight"
          >
            Empowering the frontline of <span className="text-ember">healthcare.</span>
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-steel leading-relaxed"
          >
            A premium portfolio and placement network for verified nurses. We ensure fast KYC, seamless shift management, and connection to top government hospitals.
          </motion.p>
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setOnboardingOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-ember px-8 py-4 text-base font-bold text-white shadow-xl shadow-ember/20 hover:bg-ember/90 transition-all hover:-translate-y-1"
            >
              Start Dummy Onboarding <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "100% KYC Verified", desc: "Every professional undergoes rigorous national ID checks." },
            { icon: Activity, title: "Shift Matching", desc: "AI-driven scheduling based on your experience and preference." },
            { icon: Users, title: "10,000+ Strong", desc: "Join a growing community of healthcare professionals." }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              key={feat.title} 
              className="bg-white rounded-3xl p-8 border border-cloud shadow-sm hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-cloud grid place-items-center text-obsidian mb-6">
                <feat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-obsidian mb-2">{feat.title}</h3>
              <p className="text-steel leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Verified Professionals Portfolio */}
      <section className="px-6 py-20 bg-white border-t border-cloud">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-obsidian tracking-tight">Verified Professionals</h2>
              <p className="mt-4 text-steel text-lg">Top-tier nursing staff actively placed in government hospitals.</p>
            </div>
            <button className="text-ember font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View Directory <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nurses.map((nurse, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <NursePortfolioCard nurse={nurse} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NurseOnboardingModal 
        isOpen={onboardingOpen} 
        onClose={() => setOnboardingOpen(false)} 
        onComplete={handleNurseOnboardingComplete}
      />
    </main>
  );
}
