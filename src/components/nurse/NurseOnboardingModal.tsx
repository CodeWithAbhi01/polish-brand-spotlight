import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ShieldCheck, Stethoscope, Building2, UploadCloud, ChevronRight, User } from "lucide-react";
import { toast } from "sonner";

interface NurseOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

const steps = ["Personal Info", "KYC & Verification", "Experience & Shifts"];

export function NurseOnboardingModal({ isOpen, onClose, onComplete }: NurseOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    hospitalId: "",
    experienceYears: "",
    shiftPreference: "day"
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Nurse profile verified successfully!");
      onComplete({ ...formData, verified: true });
      onClose();
      // Reset after close
      setTimeout(() => setCurrentStep(0), 500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-[24px] bg-white shadow-2xl overflow-hidden border border-cloud"
        >
          {/* Header */}
          <div className="bg-paper border-b border-cloud p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-ember/10 text-ember">
                <Stethoscope size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-obsidian">Nurse Onboarding</h2>
                <p className="text-sm text-steel">Join our verified healthcare network</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-fog hover:bg-cloud rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Progress */}
          <div className="bg-snow px-8 py-4 border-b border-cloud">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cloud -z-10 -translate-y-1/2"></div>
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 bg-snow px-2">
                  <div className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold border-2 transition-colors ${
                    idx < currentStep ? "bg-ember border-ember text-white" :
                    idx === currentStep ? "bg-white border-ember text-ember" :
                    "bg-white border-cloud text-fog"
                  }`}>
                    {idx < currentStep ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-semibold ${idx <= currentStep ? "text-obsidian" : "text-fog"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-8 min-h-[320px]">
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-graphite">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-fog h-4 w-4" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full rounded-xl border border-cloud bg-paper py-2.5 pl-10 pr-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all" 
                        placeholder="e.g. Priya Sharma" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-graphite">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-xl border border-cloud bg-paper py-2.5 px-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all" 
                      placeholder="priya@hospital.gov.in" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-graphite">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-xl border border-cloud bg-paper py-2.5 px-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
                  <ShieldCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-800">Govt. E-KYC Verification</h4>
                    <p className="text-xs text-emerald-700 mt-1">Your identity and nursing license will be verified against the national healthcare registry.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-graphite">Nursing License Number (NCI)</label>
                    <input 
                      type="text" 
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      className="w-full rounded-xl border border-cloud bg-paper py-2.5 px-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all" 
                      placeholder="NCI-XXXX-XXXX" 
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-cloud rounded-xl p-6 text-center hover:bg-paper transition-colors cursor-pointer group">
                    <div className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-cloud text-fog group-hover:bg-ember/10 group-hover:text-ember transition-colors mb-3">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-sm font-medium text-obsidian">Upload Govt ID / Aadhar</p>
                    <p className="text-xs text-steel mt-1">JPEG, PNG or PDF up to 5MB</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-graphite">Current Hospital / Affiliation</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-fog h-4 w-4" />
                      <input 
                        type="text" 
                        value={formData.hospitalId}
                        onChange={(e) => setFormData({...formData, hospitalId: e.target.value})}
                        className="w-full rounded-xl border border-cloud bg-paper py-2.5 pl-10 pr-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all" 
                        placeholder="e.g. AIIMS Delhi" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-graphite">Years of Experience</label>
                    <select 
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                      className="w-full rounded-xl border border-cloud bg-paper py-2.5 px-4 text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all appearance-none"
                    >
                      <option value="">Select Experience</option>
                      <option value="1-3">1 - 3 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5-10">5 - 10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-graphite">Preferred Shifts</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Morning", "Evening", "Night"].map(shift => (
                      <button
                        key={shift}
                        onClick={() => setFormData({...formData, shiftPreference: shift.toLowerCase()})}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                          formData.shiftPreference === shift.toLowerCase() 
                            ? "bg-ember border-ember text-white shadow-md shadow-ember/20" 
                            : "bg-paper border-cloud text-steel hover:border-fog"
                        }`}
                      >
                        {shift}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-paper border-t border-cloud p-6 flex justify-between items-center">
            {currentStep > 0 ? (
              <button 
                onClick={() => setCurrentStep(s => s - 1)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-graphite bg-white border border-cloud shadow-sm hover:bg-snow transition-all"
              >
                Back
              </button>
            ) : <div></div>}
            
            <button 
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-ember shadow-md shadow-ember/20 hover:bg-ember/90 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 
                  Processing...
                </span>
              ) : currentStep === steps.length - 1 ? (
                "Complete Verification"
              ) : (
                <>Continue <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
