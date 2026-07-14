import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Users, ShieldCheck, Lightbulb, Target, TrendingUp,
  MessageCircle, Megaphone, Handshake, ArrowRight, Bell, Globe, Sparkles,
  CheckCircle2, Menu
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

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
      <img src={logoMark} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      <div className="leading-none">
        <div className="font-display text-xl font-extrabold tracking-tight">
          <span className="text-secondary">Apni</span>
          <span className="text-primary">Sabha</span>
        </div>
      </div>
    </div>
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-secondary/80 transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden rounded-full border border-secondary/20 px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:border-secondary md:inline-block">
            Login
          </a>
          <a href="#cta" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]">
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
          <button className="ml-1 rounded-md p-2 text-secondary md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-accent/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--secondary) 25%, transparent) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
        <div className="flex flex-col justify-center">
          <motion.span
            initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Apna Manch, Apni Awaaz
          </motion.span>

          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] text-secondary sm:text-6xl lg:text-7xl"
          >
            Where every <span className="text-brand-gradient">voice</span> builds a <span className="text-primary">movement</span>.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            ApniSabha is a digital platform where communities connect, discuss, share and solve real-world problems — together. A manch built on trust, empowerment and inclusivity.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]">
              Join the Sabha <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-secondary/20 px-6 py-3.5 text-sm font-semibold text-secondary transition-colors hover:border-secondary">
              Explore Features
            </a>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            {["Free to join", "No ads, ever", "Verified voices"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — device / logo composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-brand-gradient opacity-90 blur-[2px]" />
          <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-brand">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>apnisabha.app</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">Live</span>
            </div>
            <div className="mt-6 flex flex-col items-center text-center">
              <img src={logoMark} alt="ApniSabha logo" width={180} height={180} className="h-40 w-40 object-contain drop-shadow-xl" />
              <div className="mt-4 font-display text-3xl font-extrabold tracking-tight">
                <span className="text-secondary">Apni</span><span className="text-primary">Sabha</span>
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Apna Manch • Apni Awaaz
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { n: "50K+", l: "Voices" },
                { n: "1.2K", l: "Sabhas" },
                { n: "98%", l: "Trust" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-muted/60 p-3 text-center">
                  <div className="font-display text-lg font-bold text-secondary">{s.n}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-secondary">New discussion</div>
              <div className="text-[11px] text-muted-foreground">248 people joined in</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section id="values" className="relative bg-secondary py-24 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Brand Values</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Five principles that <span className="text-primary">guide every voice.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              ApniSabha is more than a platform — it's a movement. A place where every voice matters and every idea has the power to inspire change.
            </p>
            <div className="mt-8 h-1 w-16 bg-primary" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                custom={i} variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-primary/40 hover:bg-white/[0.06]"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${i % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-white/10 text-white"}`}>
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{v.desc}</p>
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
    <section id="features" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">What You Can Do</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
            One manch. <span className="text-brand-gradient">Endless possibilities.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            From starting a conversation to leading a movement — everything you need to participate lives in one place.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              custom={i} variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-brand"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-125" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-white shadow-lg">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-secondary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights strip */}
        <div className="mt-16 grid gap-6 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-sm font-semibold text-secondary">{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-brand-gradient opacity-20 blur-2xl" />
          <img
            src={community} alt="Community in conversation"
            width={1600} height={1200} loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:block">
            <div className="flex -space-x-2">
              {[0,1,2,3].map(i => (
                <div key={i} className={`h-9 w-9 rounded-full border-2 border-card ${["bg-primary","bg-accent","bg-secondary","bg-primary/70"][i]}`} />
              ))}
            </div>
            <div className="mt-2 text-xs font-semibold text-secondary">+50K community members</div>
          </div>
        </motion.div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">About ApniSabha</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
            A place where every voice matters.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            ApniSabha is more than a platform — it's a movement. We're building a digital manch where communities gather without fear, share without filter, and grow without limits.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Verified profiles and moderated spaces keep conversations respectful.",
              "Local, regional and national sabhas so every issue finds its people.",
              "Multi-language support — express yourself in the language you think in.",
              "Impact tracking that turns every discussion into real-world outcomes.",
            ].map(t => (
              <div key={t} className="flex items-start gap-3">
                <div className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm text-secondary/85">{t}</p>
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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-gradient p-10 text-white shadow-2xl sm:p-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Your voice is the beginning of change.
            </h2>
            <p className="mt-5 max-w-xl text-white/85">
              Join thousands already shaping the conversation on ApniSabha. Free forever. Built for you.
            </p>
          </div>
          <div id="contact" className="flex flex-col gap-3">
            <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-bold text-secondary transition-transform hover:scale-[1.02]">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10">
              Login to your Sabha
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="[&_span:first-child]:text-white" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Apna Manch, Apni Awaaz — a digital platform for the communities of tomorrow.
          </p>
        </div>
        {[
          { title: "Platform", items: ["Features", "Values", "Sabhas", "Impact"] },
          { title: "Company", items: ["About", "Careers", "Press", "Contact"] },
          { title: "Legal", items: ["Privacy", "Terms", "Guidelines", "Safety"] },
        ].map(col => (
          <div key={col.title}>
            <div className="font-display text-sm font-bold uppercase tracking-widest text-primary">{col.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {col.items.map(i => (
                <li key={i}><a href="#" className="transition-colors hover:text-primary">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <div>© {new Date().getFullYear()} ApniSabha. All rights reserved.</div>
          <div>Made with intention • Apna Manch, Apni Awaaz</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-secondary">
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
