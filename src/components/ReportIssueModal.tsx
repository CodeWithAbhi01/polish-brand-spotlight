import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, ShieldCheck, MapPin, Sparkles, Megaphone, Camera, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "./AuthModal";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export function ReportIssueModal({
  isOpen,
  onClose,
  user,
  onOpenAuth,
}: ReportIssueModalProps) {
  const [category, setCategory] = useState("Roads & Potholes");
  const [ward, setWard] = useState("Ward 42 (Metro Station Road)");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<"form" | "simulating" | "success">("form");
  const [simMessage, setSimMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Issue darz karne ke liye kripya pehle Login / Register karein!");
      onClose();
      onOpenAuth();
      return;
    }
    if (!description.trim()) {
      toast.error("Kripya mudde (issue) ke baare me thodi jankari likhein.");
      return;
    }

    setStep("simulating");
    setSimMessage("📍 Simulating GPS Geo-Tagging & Ward Boundary Check...");

    setTimeout(() => {
      setSimMessage("🏛️ Verifying Municipal Authority & Nodal Officer Routing...");
      setTimeout(() => {
        setSimMessage("⚡ Notifying 14 active citizen volunteers in your neighborhood...");
        setTimeout(() => {
          setStep("success");
          toast.success("Aapka civic issue successfully register ho gaya hai!");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep("form");
    setDescription("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md animate-fade-in overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[26px] sm:rounded-[36px] border border-cloud bg-snow p-6 sm:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full p-2 text-fog transition-colors hover:bg-paper hover:text-obsidian"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {step === "form" && (
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-ember/10 px-3 py-1 text-[11px] font-bold text-ember uppercase tracking-wider">
                  <Megaphone className="h-3.5 w-3.5" /> CIVIC WARD REPORTER
                </span>
                <span className="text-[12px] font-medium text-fog">AI-Assisted Municipal Routing</span>
              </div>

              <h2 className="mt-3 text-[24px] sm:text-[28px] font-semibold tracking-tight text-obsidian">
                Report a Local Neighborhood Issue
              </h2>
              <p className="mt-1 text-[13px] sm:text-[14px] text-steel">
                Your verified petition will be geo-tagged and submitted directly to the concerned ward nodal officer with tracking ID.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-obsidian mb-1.5">Issue Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-[14px] border border-cloud bg-paper px-4 py-3 text-[14px] font-medium text-obsidian outline-none focus:border-obsidian transition-colors"
                  >
                    <option value="Roads & Potholes">🚧 Roads, Potholes & Footpaths</option>
                    <option value="Garbage & Sanitation">🗑️ Garbage Dump & Sanitation</option>
                    <option value="Streetlight Dark Spot">💡 Streetlight Dark Spot / Electrical</option>
                    <option value="Water Supply & Leakage">🚰 Water Supply & Pipe Leakage</option>
                    <option value="Women Safety Zone">🛡️ Women Transit Safety & Surveillance</option>
                    <option value="Public Parks & Greenery">🌳 Public Parks, Trees & Green Spaces</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-obsidian mb-1.5">Ward / Locality Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      placeholder="e.g. Ward 42, Sector 3, Outer Ring Road..."
                      className="w-full rounded-[14px] border border-cloud bg-paper pl-10 pr-4 py-3 text-[14px] font-medium text-obsidian outline-none focus:border-obsidian transition-colors"
                    />
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-ember" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-obsidian mb-1.5">Issue Details & Suggested Resolution</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe exact location, severity, and how long this issue has persisted..."
                    className="w-full rounded-[14px] border border-cloud bg-paper p-4 text-[14px] text-obsidian outline-none focus:border-obsidian transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between rounded-[14px] border border-dashed border-cloud bg-paper p-3 text-[12px] text-fog">
                  <span className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-graphite" />
                    <span>Attach Photo Evidence (Simulated GPS metadata)</span>
                  </span>
                  <span className="rounded-[8px] bg-snow px-2 py-1 font-medium text-obsidian border border-cloud">
                    Auto-Tagged 📍
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-[16px] bg-obsidian py-4 text-[15px] font-semibold text-snow shadow-xl transition-transform hover:-translate-y-0.5"
                >
                  <span>Submit Verified Petition to Sabha</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {step === "simulating" && (
            <div className="py-12 text-center space-y-6">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ember/10 text-ember animate-spin" style={{ animationDuration: "3s" }}>
                <Loader2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[22px] font-bold text-obsidian">Processing Civic Action</h3>
                <p className="text-[15px] font-medium text-ember animate-pulse">{simMessage}</p>
                <p className="text-[12px] text-fog max-w-xs mx-auto">
                  Connecting citizen consensus with municipal accountability protocols...
                </p>
              </div>
              <div className="w-full bg-paper rounded-full h-2 overflow-hidden max-w-xs mx-auto border border-cloud">
                <motion.div
                  initial={{ width: "15%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="bg-ember h-full rounded-full"
                />
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 border-2 border-emerald-500/30"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-bold text-emerald-600 border border-emerald-500/20">
                  ⚡ WARD PETITION ID: #AS-2026-9482
                </span>
                <h3 className="text-[24px] font-bold text-obsidian">Petition Officially Published!</h3>
                <p className="text-[14px] leading-relaxed text-steel max-w-sm mx-auto">
                  Your petition has been routed to the Nodal Officer for <span className="font-semibold text-obsidian">{category}</span> in <span className="font-semibold text-obsidian">{ward}</span>. 14 nearby volunteers have been notified to endorse.
                </p>
              </div>

              <div className="rounded-[20px] bg-paper p-4 border border-cloud text-left text-[13px] space-y-2">
                <div className="flex justify-between font-medium text-graphite">
                  <span>Status:</span> <span className="text-emerald-600 font-bold">● Live in Ward Feed</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Target Endorsements:</span> <span>1 / 50 Citizens</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Estimated Response:</span> <span>Within 48 Hours</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full rounded-[16px] bg-obsidian py-3.5 text-[15px] font-semibold text-snow shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Return to Active Sabhas Feed
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
