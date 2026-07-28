import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Mail, Building, ArrowRight, CheckCircle2 } from "lucide-react";

interface OfficialOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialOnboardingModal: React.FC<OfficialOnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[24px] sm:rounded-[32px] bg-snow shadow-2xl border border-cloud"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cloud px-6 py-4 bg-paper">
            <h3 className="text-lg font-bold text-obsidian flex items-center gap-2">
              <ShieldCheck className="text-blue-600 h-5 w-5" /> Official Portal
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-fog transition-colors hover:bg-cloud/60 hover:text-obsidian"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {step === 1 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[16px] flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                    <Building size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-obsidian mb-2">Government & Official Login</h2>
                  <p className="text-steel text-sm">
                    Verified access for National, State, and District level authorities. Complete the mandatory security verification to access your Civic Dashboard.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 rounded-[16px] border border-cloud bg-paper">
                    <div className="mt-0.5 text-obsidian"><Mail size={20} /></div>
                    <div>
                      <h4 className="font-bold text-obsidian text-sm">1. NIC Email Verification</h4>
                      <p className="text-xs text-fog mt-1">Authenticate using your official @gov.in or @nic.in email address.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-[16px] border border-cloud bg-paper">
                    <div className="mt-0.5 text-obsidian"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="font-bold text-obsidian text-sm">2. e-Pramaan / Govt ID</h4>
                      <p className="text-xs text-fog mt-1">Mandatory KYC using Aadhaar or Election Commission credentials.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-blue-600 py-3.5 text-[15px] font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Begin Verification</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[16px] flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-obsidian mb-2">Gateway Active</h2>
                <p className="text-steel text-sm mb-6">
                  Redirecting to the secure NIC / e-Pramaan gateway for authentication...
                </p>
                
                <div className="w-full h-2 bg-cloud rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-blue-600"
                  />
                </div>
                
                <button
                  onClick={onClose}
                  className="text-sm font-semibold text-fog hover:text-obsidian"
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
