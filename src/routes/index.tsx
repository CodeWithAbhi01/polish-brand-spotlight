import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Users, ShieldCheck, Lightbulb, Target, TrendingUp,
  MessageCircle, Megaphone, Handshake, ArrowRight, Bell, Globe, Sparkles,
  CheckCircle2, Menu, ArrowUpRight
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import community from "@/assets/community.jpg";

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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoMark} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
      <div className="text-[17px] font-semibold tracking-tight text-obsidian leading-none">
        ApniSabha
      </div>
    </div>
  );
}

function DarkBtn({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-[14px] bg-obsidian px-4 py-3 text-[14px] font-medium text-snow transition-transform hover:-translate-y-[1px] ${className}`}
      style={{ boxShadow: "inset 0 0.5px 0 0 rgba(255,255,255,0.5), 0 0 0 1.5px #2c2e34, 0 4px 6px 0 rgba(0,0,0,0.14)" }}
    >
      {children}
    </a>
  );
}

function GhostBtn({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-[14px] border border-cloud bg-snow px-4 py-3 text-[14px] font-medium text-graphite transition-colors hover:border-iron ${className}`}
    >
      {children}
    </a>
  );
}

function Nav() {
  const links = [
    { label: "Values", href: "#values" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[14px] font-medium text-graphite/80 transition-colors hover:text-obsidian">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden rounded-[14px] px-3 py-2 text-[14px] font-medium text-graphite transition-colors hover:text-obsidian md:inline-block">
            Login
          </a>
          <DarkBtn href="#cta" className="!py-2 !px-3 sm:!px-4">
            <span className="whitespace-nowrap">Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </DarkBtn>
          <button className="ml-1 rounded-md p-2 text-graphite md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-20 pt-16 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28">
        <div className="flex flex-col justify-center">
          <motion.span
            initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-[12px] bg-ember px-2.5 py-1 text-[12px] font-medium text-snow"
          >
            Apna Manch · Apni Awaaz
          </motion.span>

          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="mt-6 text-[44px] font-semibold leading-[1.08] tracking-[-0.03em] text-obsidian sm:text-[56px] lg:text-[64px] lg:leading-[1.05]"
          >
            Where every voice<br />
            builds a <span className="italic font-normal text-iron">movement</span>.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 max-w-xl text-[15px] leading-[1.6] text-steel"
          >
            ApniSabha is a digital manch where communities connect, discuss, and solve real-world problems — built on trust, empowerment and inclusivity.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex w-full max-w-md items-center gap-2 rounded-[16px] border border-cloud bg-snow p-2">
              <input
                type="email"
                placeholder="you@community.in"
                className="flex-1 bg-transparent px-3 py-2 text-[14px] text-graphite outline-none placeholder:text-ash"
              />
              <DarkBtn href="#cta" className="!py-2 !px-4">Join<ArrowRight className="h-4 w-4" /></DarkBtn>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-fog"
          >
            {["Free forever", "No ads, ever", "Verified voices"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-obsidian" /> {t}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — editorial card stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-4"
        >
          <div className="rounded-[36px] border border-cloud bg-snow p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-ember px-2 py-0.5 text-[11px] font-medium text-snow">LIVE</span>
              <span className="text-[12px] text-fog">Sabha · Delhi</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <img src={logoMark} alt="" className="h-12 w-12 rounded-[16px] border border-cloud object-contain p-1.5" />
              <div>
                <div className="text-[16px] font-semibold text-obsidian">Clean Yamuna Initiative</div>
                <div className="text-[12px] text-fog">1,284 voices · 12 sabhas joined</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {["Water", "Civic", "Community", "Volunteers"].map(t => (
                <span key={t} className="rounded-[12px] border border-cloud px-2 py-1 text-[12px] text-graphite">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[28px] border border-cloud bg-snow p-5">
              <div className="text-[32px] font-semibold leading-none tracking-tight text-obsidian">50K+</div>
              <div className="mt-2 text-[12px] text-steel">Verified voices across 240 cities</div>
            </div>
            <div className="rounded-[28px] border border-cloud bg-obsidian p-5 text-snow">
              <div className="text-[32px] font-semibold leading-none tracking-tight">1.2K</div>
              <div className="mt-2 text-[12px] text-ash">Active sabhas this month</div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[28px] border border-cloud bg-snow px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-paper text-obsidian">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[14px] font-medium text-obsidian">New discussion started</div>
                <div className="text-[12px] text-fog">Priya · 2m ago</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-iron" />
          </div>
        </motion.div>
      </div>

      {/* Logo strip / social proof */}
      <div className="mx-auto max-w-[1200px] border-y border-cloud px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-fog">
          <span className="text-[12px] uppercase tracking-[0.2em]">Trusted by communities across</span>
          {["Delhi", "Mumbai", "Bengaluru", "Pune", "Jaipur", "Kolkata"].map(c => (
            <span key={c} className="text-[15px] font-medium">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section id="values" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] rounded-[36px] bg-obsidian p-8 text-snow sm:p-14">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center rounded-[12px] bg-ember px-2 py-1 text-[11px] font-medium text-snow">Brand Values</span>
            <h2 className="mt-5 text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[48px]">
              Five principles that guide every voice.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ash">
              ApniSabha is more than a platform — it's a movement. A place where every voice matters and every idea has the power to inspire change.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                custom={i} variants={fadeUp}
                className="group rounded-[24px] border border-white/10 bg-slate p-6 transition-colors hover:border-white/25"
              >
                <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-snow/10 text-snow">
                  <v.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ash">{v.desc}</p>
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
    <section id="features" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-fog">What You Can Do</span>
            <h2 className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] text-obsidian sm:text-[52px]">
              One manch.<br />Endless possibilities.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-steel">
            From starting a conversation to leading a movement — everything you need to participate lives in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              custom={i} variants={fadeUp}
              className="group flex flex-col rounded-[36px] border border-cloud bg-snow p-7 transition-colors hover:border-iron"
            >
              <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-paper text-obsidian">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-8 text-[20px] font-semibold tracking-tight text-obsidian">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-steel">{f.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-[13px] font-medium text-obsidian">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights strip */}
        <div className="mt-6 grid gap-4 rounded-[36px] border border-cloud bg-snow p-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-3 rounded-[20px] bg-paper px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-[12px] bg-snow text-obsidian border border-cloud">
                <h.icon className="h-4 w-4" />
              </div>
              <div className="text-[14px] font-medium text-graphite">{h.label}</div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {[
            { n: "50K+", l: "Verified voices building the manch every day" },
            { n: "1.2K", l: "Active sabhas across 240+ cities in India" },
            { n: "98%", l: "Members say ApniSabha is a safe space to speak" },
          ].map(s => (
            <div key={s.n} className="flex items-baseline gap-4">
              <div className="text-[48px] font-semibold leading-none tracking-[-0.03em] text-obsidian sm:text-[56px]">{s.n}</div>
              <div className="text-[13px] leading-relaxed text-steel">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={community} alt="Community in conversation"
            width={1600} height={1200} loading="lazy"
            className="aspect-[4/3] w-full rounded-[36px] border border-cloud object-cover"
          />
        </motion.div>

        <div>
          <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-fog">About ApniSabha</span>
          <h2 className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] text-obsidian sm:text-[52px]">
            A place where every voice matters.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.6] text-steel">
            ApniSabha is more than a platform — it's a movement. A digital manch where communities gather without fear, share without filter, and grow without limits.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Verified profiles and moderated spaces keep conversations respectful.",
              "Local, regional and national sabhas so every issue finds its people.",
              "Multi-language support — express yourself in the language you think in.",
              "Impact tracking that turns every discussion into real-world outcomes.",
            ].map(t => (
              <div key={t} className="flex items-start gap-3 rounded-[20px] border border-cloud bg-snow px-4 py-3">
                <div className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-obsidian text-snow">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <p className="text-[14px] leading-relaxed text-graphite">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="cta" className="px-6 pb-24">
      <div className="mx-auto max-w-[1200px] rounded-[36px] border border-cloud bg-snow p-10 sm:p-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center rounded-[12px] bg-ember px-2 py-1 text-[11px] font-medium text-snow">Join the Sabha</span>
            <h2 className="mt-5 text-[40px] font-semibold leading-[1.08] tracking-[-0.025em] text-obsidian sm:text-[56px]">
              Your voice is the beginning of change.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">
              Join thousands already shaping the conversation on ApniSabha. Free forever. Built for you.
            </p>
          </div>
          <div id="contact" className="flex flex-col gap-3">
            <DarkBtn href="#" className="justify-center !py-4 text-[15px]">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </DarkBtn>
            <GhostBtn href="#" className="justify-center !py-4 text-[15px]">
              Login to your Sabha
            </GhostBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cloud bg-paper">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-steel">
            Apna Manch, Apni Awaaz — a digital platform for the communities of tomorrow.
          </p>
        </div>
        {[
          { title: "Platform", items: ["Features", "Values", "Sabhas", "Impact"] },
          { title: "Company", items: ["About", "Careers", "Press", "Contact"] },
          { title: "Legal", items: ["Privacy", "Terms", "Guidelines", "Safety"] },
        ].map(col => (
          <div key={col.title}>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-fog">{col.title}</div>
            <ul className="mt-4 space-y-2 text-[14px]">
              {col.items.map(i => (
                <li key={i}><a href="#" className="text-graphite transition-colors hover:text-obsidian">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cloud">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-[12px] text-fog sm:flex-row">
          <div>© {new Date().getFullYear()} ApniSabha. All rights reserved.</div>
          <div>Made with intention · Apna Manch, Apni Awaaz</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-paper text-graphite">
      <Nav />
      <Hero />
      <ValueSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
