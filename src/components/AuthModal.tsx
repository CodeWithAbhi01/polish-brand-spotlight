import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Sparkles, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { toast } from "sonner";

export interface UserProfile {
  name: string;
  email: string;
  city: string;
  role: string;
  avatarUrl?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  initialTab?: "login" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  initialTab = "login",
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Delhi Sabha");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Check for demo credentials or mock error
      if (email === "demo@apnisabha.in" && password === "123456") {
        onLogin({
          name: "Priya Sharma",
          email: "demo@apnisabha.in",
          city: "Delhi Sabha",
          role: "Verified Civic Leader",
        });
        toast.success("ApniSabha me swagat hai Priya! Aapka civic dashboard loaded hai.");
        onClose();
      } else if (email && password) {
        // If wrong credentials entered, show realistic error as requested by user
        setError("Galat email ya password! (Demo ke liye 'Quick Demo Login' button par click karein ya demo@apnisabha.in / 123456 use karein)");
        toast.error("Login failed! Invalid credentials entered.");
      } else {
        setError("Kripya email aur password dono enter karein.");
      }
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: "Abhishek Kumar",
        email: "abhishek@apnisabha.in",
        city: "Mumbai Sabha",
        role: "National Community Creator",
      });
      toast.success("Quick Demo Login Successful! Swagat hai Abhishek Kumar.");
      onClose();
    }, 600);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Kripya sabhi fields enter karein.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name,
        email,
        city,
        role: "Verified Citizen Voice",
      });
      toast.success(`Badhai ho ${name}! Aapka ApniSabha account successfully register ho gaya hai.`);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[26px] sm:rounded-[32px] border border-cloud bg-snow p-5 sm:p-7 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 sm:right-5 sm:top-5 rounded-full p-2 text-fog transition-colors hover:bg-paper hover:text-obsidian"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {user ? (
            /* Logged in state inside modal */
            <div className="text-center py-4 sm:py-6">
              <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-ember/10 text-ember border border-ember/20">
                <User className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mt-3.5 sm:mt-4 text-[20px] sm:text-[22px] font-semibold text-obsidian">{user.name}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-paper px-3 py-1 text-[11px] sm:text-[12px] font-medium text-steel mt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-ember flex-none" /> {user.role} · {user.city}
              </span>
              <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-fog">{user.email}</p>

              <div className="mt-6 sm:mt-8 grid gap-2.5">
                <button
                  onClick={() => {
                    toast.info("Opening your Civic Impact Dashboard...");
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 rounded-[14px] sm:rounded-[16px] bg-paper py-3 text-[13px] sm:text-[14px] font-medium text-obsidian hover:bg-cloud transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" /> Meri Sabha Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    toast.info("Aap successfully logout ho chuke hain.");
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 rounded-[14px] sm:rounded-[16px] border border-red-200 bg-red-50 py-3 text-[13px] sm:text-[14px] font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout Account
                </button>
              </div>
            </div>
          ) : (
            /* Login / Signup Tabs */
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-[10px] bg-ember/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-ember">
                  <Sparkles className="h-3 w-3" /> APNA MANCH
                </span>
                <span className="text-[11px] sm:text-[12px] text-fog">Citizens Access Portal</span>
              </div>

              <h2 className="mt-2.5 sm:mt-3 text-[22px] sm:text-[26px] font-semibold tracking-tight text-obsidian">
                {tab === "login" ? "Apni Sabha me Login karein" : "Nayi Awaaz Register karein"}
              </h2>
              <p className="mt-1 text-[12px] sm:text-[13px] text-steel">
                {tab === "login"
                  ? "Apne shaher aur community ke live muddo se judein."
                  : "Ek verified nagrik ban kar real-world change lead karein."}
              </p>

              {/* Tab Switcher */}
              <div className="mt-5 sm:mt-6 flex rounded-[14px] sm:rounded-[16px] bg-paper p-1 border border-cloud">
                <button
                  type="button"
                  onClick={() => { setTab("login"); setError(""); }}
                  className={`flex-1 rounded-[10px] sm:rounded-[12px] py-2 text-[12px] sm:text-[13px] font-medium transition-all ${
                    tab === "login" ? "bg-snow text-obsidian shadow-sm" : "text-fog hover:text-obsidian"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setTab("signup"); setError(""); }}
                  className={`flex-1 rounded-[10px] sm:rounded-[12px] py-2 text-[12px] sm:text-[13px] font-medium transition-all ${
                    tab === "signup" ? "bg-snow text-obsidian shadow-sm" : "text-fog hover:text-obsidian"
                  }`}
                >
                  Join Sabha (Sign Up)
                </button>
              </div>

              {/* Error Box */}
              {error && (
                <div className="mt-3.5 sm:mt-4 flex items-start gap-2.5 rounded-[14px] sm:rounded-[16px] border border-red-200 bg-red-50 p-3 text-[12px] sm:text-[13px] text-red-700 animate-shake">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-none text-red-500 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Forms */}
              {tab === "login" ? (
                <form onSubmit={handleLoginSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1 sm:mb-1.5">Email ya Phone Number</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@apnisabha.in"
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1 sm:mb-1.5">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-[14px] sm:rounded-[16px] bg-obsidian py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium text-snow shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isLoading ? "Verifying Credentials..." : "Sign In to Sabha"}
                  </button>

                  <div className="relative my-3 sm:my-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-cloud"></div></div>
                    <span className="relative bg-snow px-3 text-[10px] sm:text-[11px] font-medium text-fog uppercase tracking-wider">Instant Demo Access</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-[14px] sm:rounded-[16px] border border-cloud bg-paper py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-graphite hover:bg-cloud/60 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-ember" /> Quick Demo Login (No Typing Needed)
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="mt-4 sm:mt-5 space-y-3">
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abhishek Kumar"
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1">Select Your City / Sabha</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian"
                    >
                      <option value="Delhi Sabha">Delhi Sabha (NCR)</option>
                      <option value="Mumbai Sabha">Mumbai Sabha (Maharashtra)</option>
                      <option value="Bengaluru Sabha">Bengaluru Sabha (Karnataka)</option>
                      <option value="Pune Sabha">Pune Sabha</option>
                      <option value="Jaipur Sabha">Jaipur Sabha (Rajasthan)</option>
                      <option value="Kolkata Sabha">Kolkata Sabha</option>
                      <option value="Lucknow Sabha">Lucknow Sabha</option>
                      <option value="Hyderabad Sabha">Hyderabad Sabha</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1">Email / Mobile Number</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@community.in"
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-[12px] font-medium text-graphite mb-1">Create Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-[12px] sm:rounded-[14px] border border-cloud bg-paper px-3.5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] text-obsidian outline-none focus:border-obsidian"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 rounded-[14px] sm:rounded-[16px] bg-ember py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium text-snow shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isLoading ? "Creating Citizen Profile..." : "Register & Join Sabha"}
                  </button>
                </form>
              )}

              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-fog">
                <ShieldCheck className="h-3.5 w-3.5 text-obsidian flex-none" /> Secure citizen verification & 256-bit encryption
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
