import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiledIssue } from "@/data/types";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface EscalationAlertBannerProps {
  issue: FiledIssue;
}

export const EscalationAlertBanner: React.FC<EscalationAlertBannerProps> = ({ issue }) => {
  const { slaStatus } = issue;
  
  if (!slaStatus) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full mb-4"
      >
        {slaStatus === "ON_TRACK" && (
          <div className="flex items-center gap-3 p-4 rounded-[16px] border border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm font-medium">Issue is being handled within SLA</p>
          </div>
        )}

        {slaStatus === "BREACHED" && (
          <div className="flex items-center gap-3 p-4 rounded-[16px] border-2 border-amber-400 bg-amber-50 text-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
            <p className="text-sm font-medium">SLA breached! Officials have not responded within expected timeline.</p>
          </div>
        )}

        {slaStatus === "CRITICAL" && (
          <div className="flex items-start gap-3 p-4 rounded-[16px] border-2 border-red-500 bg-red-50 text-red-900 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
            <AlertOctagon className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide mb-1">Critical Escalation Triggered</p>
              <p className="text-sm">This issue has been unresolved across multiple tiers. Immediate automated escalation has been triggered to higher authorities.</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
