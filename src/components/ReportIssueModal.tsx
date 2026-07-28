import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, CheckCircle2, MapPin, Megaphone, Camera, Loader2, ArrowRight, ArrowLeft, Search,
  Droplets, Zap, Construction, Waves, Trash2, Lightbulb, CloudOff, Bus, ShieldAlert,
  Building2, Volume2, HeartPulse, GraduationCap, ShieldCheck, ParkingCircle,
  Bath, PawPrint, TreePine, HardHat, ChevronRight, Clock, AlertTriangle, Users
} from "lucide-react";
import { toast } from "sonner";
import type { UserProfile } from "@/data/types";
import { issueCategories } from "@/data/issueCategories";
import { indiaStates, getDistrictsForState } from "@/data/indiaLocations";

// Icon mapping for dynamic icon rendering from category data
const iconMap: Record<string, React.ElementType> = {
  Droplets, Zap, Construction, Waves, Trash2, Lightbulb, CloudOff, Bus, ShieldAlert,
  Building2, Volume2, HeartPulse, GraduationCap, ShieldCheck, ParkingCircle,
  Bath, PawPrint, TreePine, HardHat,
  TrafficCone: Construction, // fallback
};

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export function ReportIssueModal({ isOpen, onClose, user, onOpenAuth }: ReportIssueModalProps) {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [step, setStep] = useState<"category" | "form" | "simulating" | "success">("category");
  const [simMessage, setSimMessage] = useState("");

  const selectedCategory = useMemo(
    () => issueCategories.find((c) => c.code === selectedCategoryCode),
    [selectedCategoryCode]
  );

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return issueCategories;
    const q = searchQuery.toLowerCase();
    return issueCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.tags.some((t) => t.replace(/_/g, " ").includes(q))
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectCategory = (code: string) => {
    setSelectedCategoryCode(code);
    setStep("form");
  };

  const handleBack = () => {
    setStep("category");
    setSelectedCategoryCode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login or register to report a ward issue!");
      onClose();
      onOpenAuth();
      return;
    }
    if (!selectedCategoryCode || !ward || !description || !selectedState || !district) {
      toast.error("Please fill in all location details and issue description.");
      return;
    }

    setStep("simulating");
    setSimMessage("Simulating GPS Geo-Tagging & Ward Boundary Check...");

    setTimeout(() => {
      setSimMessage(`Routing to ${selectedCategory?.defaultDepartment || "Municipal Authority"}...`);
      setTimeout(() => {
        setSimMessage(`Notifying ${selectedCategory?.escalationChain[0]?.responsibleDesignation || "Nodal Officer"} & nearby volunteers...`);
        setTimeout(() => {
          setStep("success");
          toast.success("Your civic issue petition has been successfully registered!");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep("category");
    setSelectedCategoryCode(null);
    setDescription("");
    setSearchQuery("");
    onClose();
  };

  const petitionId = `#AS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md animate-fade-in overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[26px] sm:rounded-[36px] border border-cloud bg-snow p-5 sm:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full p-2 text-fog transition-colors hover:bg-paper hover:text-obsidian z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* ──── STEP 1: Category Selection Grid ──── */}
          {step === "category" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-ember/10 px-3 py-1 text-[11px] font-bold text-ember uppercase tracking-wider">
                  <Megaphone className="h-3.5 w-3.5" /> CIVIC WARD REPORTER
                </span>
              </div>

              <h2 className="mt-3 text-[22px] sm:text-[26px] font-semibold tracking-tight text-obsidian">
                What type of issue are you facing?
              </h2>
              <p className="mt-1 text-[13px] text-steel">
                Select the category that best describes your civic concern. We'll route it to the right authority.
              </p>

              {/* Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-fog" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories... (e.g. water, pothole, safety)"
                  className="w-full rounded-[14px] border border-cloud bg-paper pl-10 pr-4 py-3 text-[13px] font-medium text-obsidian outline-none focus:border-obsidian transition-colors"
                />
              </div>

              {/* Category Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[52vh] overflow-y-auto pr-1">
                {filteredCategories.map((cat, idx) => {
                  const Icon = iconMap[cat.iconName] || AlertTriangle;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                      onClick={() => handleSelectCategory(cat.code)}
                      className="group flex flex-col items-start gap-2 rounded-[16px] border border-cloud bg-white p-3 sm:p-3.5 text-left transition-all hover:border-iron/40 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div
                        className="grid h-9 w-9 place-items-center rounded-[10px]"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <Icon className="h-4.5 w-4.5" style={{ color: cat.color }} />
                      </div>
                      <div>
                        <div className="text-[12px] sm:text-[13px] font-semibold text-obsidian leading-tight group-hover:text-ember transition-colors">
                          {cat.name}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-fog">
                          <Clock className="h-2.5 w-2.5" />
                          <span>SLA: {cat.defaultSlaHours}h</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="mt-6 text-center text-[14px] text-fog py-8">
                  No categories found for "{searchQuery}". Try a different keyword.
                </div>
              )}
            </motion.div>
          )}

          {/* ──── STEP 2: Issue Details Form (with Escalation Preview) ──── */}
          {step === "form" && selectedCategory && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-[12px] font-semibold text-fog hover:text-obsidian transition-colors mb-3"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Change Category
              </button>

              {/* Selected Category Header */}
              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 place-items-center rounded-[12px]"
                  style={{ backgroundColor: `${selectedCategory.color}15` }}
                >
                  {(() => {
                    const Icon = iconMap[selectedCategory.iconName] || AlertTriangle;
                    return <Icon className="h-5 w-5" style={{ color: selectedCategory.color }} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-obsidian">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-[12px] text-steel">
                    {selectedCategory.description.slice(0, 80)}...
                  </p>
                </div>
              </div>

              {/* Escalation Chain Preview */}
              <div className="mt-4 rounded-[16px] border border-cloud bg-paper p-3.5 sm:p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-obsidian uppercase tracking-wider mb-2.5">
                  <AlertTriangle className="h-3 w-3 text-ember" /> Escalation Path
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedCategory.escalationChain.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="inline-flex items-center gap-1 rounded-full bg-white border border-cloud px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-graphite">
                        <span className="font-bold text-obsidian">{step.responsibleDesignation.split(" (")[0].split(" / ")[0].slice(0, 20)}</span>
                        {step.triggerHoursBreach > 0 && (
                          <span className="text-fog ml-0.5">({step.triggerHoursBreach}h)</span>
                        )}
                      </div>
                      {i < selectedCategory.escalationChain.length - 1 && (
                        <ChevronRight className="h-3 w-3 text-fog flex-none" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-fog">
                  If not resolved in {selectedCategory.defaultSlaHours}h, your issue automatically escalates to the next authority level.
                </p>
              </div>

              {/* Department & SLA Info */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-[8px] bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <Clock className="h-3 w-3" /> SLA: {selectedCategory.defaultSlaHours} hours
                </span>
                <span className="inline-flex items-center gap-1 rounded-[8px] bg-blue-50 border border-blue-200 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  {selectedCategory.defaultDepartment.slice(0, 35)}
                </span>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-obsidian mb-1.5">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => { setSelectedState(e.target.value); setDistrict(""); }}
                      className="w-full rounded-[14px] border border-cloud bg-paper px-3 py-3 text-[13px] font-medium text-obsidian outline-none focus:border-obsidian transition-colors appearance-none"
                    >
                      <option value="" disabled>Select State...</option>
                      {indiaStates.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-obsidian mb-1.5">District / Region</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!selectedState}
                      className="w-full rounded-[14px] border border-cloud bg-paper px-3 py-3 text-[13px] font-medium text-obsidian outline-none focus:border-obsidian transition-colors appearance-none disabled:opacity-50"
                    >
                      <option value="" disabled>Select District...</option>
                      {selectedState && getDistrictsForState(selectedState).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
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
                    placeholder="Describe exact location, severity, how long this issue has persisted, and suggested resolution..."
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
                    Auto-Tagged
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-[16px] bg-obsidian py-3.5 text-[15px] font-semibold text-snow shadow-xl transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Submit Verified Petition</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* ──── STEP 3: Processing Simulation ──── */}
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

          {/* ──── STEP 4: Success Receipt ──── */}
          {step === "success" && selectedCategory && (
            <div className="py-6 text-center space-y-5">
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
                  WARD PETITION ID: {petitionId}
                </span>
                <h3 className="text-[22px] font-bold text-obsidian">Petition Officially Published!</h3>
                <p className="text-[14px] leading-relaxed text-steel max-w-sm mx-auto">
                  Your petition has been routed to <span className="font-semibold text-obsidian">{selectedCategory.escalationChain[0]?.responsibleDesignation}</span> at <span className="font-semibold text-obsidian">{selectedCategory.defaultDepartment.slice(0, 40)}</span>.
                </p>
              </div>

              {/* Escalation Info Card */}
              <div className="rounded-[20px] bg-paper p-4 border border-cloud text-left text-[13px] space-y-2.5">
                <div className="flex justify-between font-medium text-graphite">
                  <span>Category:</span> <span className="font-bold" style={{ color: selectedCategory.color }}>{selectedCategory.name}</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Status:</span> <span className="text-emerald-600 font-bold">● Live in Ward Feed</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>SLA Timeline:</span> <span>{selectedCategory.defaultSlaHours} hours</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Auto-Escalation:</span> <span className="text-ember font-bold">Enabled ✓</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Escalation Levels:</span> <span>{selectedCategory.escalationChain.length} tiers</span>
                </div>
                <div className="flex justify-between font-medium text-graphite">
                  <span>Target Endorsements:</span> <span>1 / 50 Citizens</span>
                </div>
              </div>

              <div className="rounded-[14px] bg-amber-50 border border-amber-200 p-3 text-[12px] text-amber-800 text-left">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-none mt-0.5" />
                  <span>
                    If no response within <strong>{selectedCategory.defaultSlaHours}h</strong>, this issue will automatically escalate to <strong>{selectedCategory.escalationChain[1]?.responsibleDesignation || "higher authority"}</strong>. Full transparency guaranteed.
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full rounded-[16px] bg-obsidian py-3.5 text-[15px] font-semibold text-snow shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
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
