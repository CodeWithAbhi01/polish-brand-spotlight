import React from "react";
import { motion } from "motion/react";
import { EscalationStep } from "@/data/types";
import { getPartyByCode } from "@/data/parties";
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, User } from "lucide-react";

interface EscalationTimelineProps {
  steps: EscalationStep[];
}

const PartyBadge = ({ partyCode }: { partyCode: string }) => {
  const party = getPartyByCode(partyCode);
  if (!party) return null;
  return (
    <span 
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ml-2"
      style={{ backgroundColor: party.bgColor, color: party.color }}
    >
      {party.code}
    </span>
  );
};

export const EscalationTimeline: React.FC<EscalationTimelineProps> = ({ steps }) => {
  return (
    <div className="relative pl-6 py-4">
      {/* Vertical line connecting steps */}
      <div className="absolute top-8 bottom-8 left-[39px] w-0.5 bg-cloud rounded" />

      <div className="flex flex-col gap-6 relative">
        {steps.map((step, idx) => {
          const isBreached = step.status === "SLA_BREACHED";
          const isResolved = step.status === "RESOLVED" || step.status === "ACTION_TAKEN";
          const isPending = step.status === "PENDING";
          const isEscalated = step.status === "ESCALATED";

          let dotColor = "bg-fog";
          let dotIcon = <Clock className="w-4 h-4 text-white" />;
          let statusBadgeClass = "bg-gray-100 text-gray-600";

          if (isResolved) {
            dotColor = "bg-green-500";
            dotIcon = <CheckCircle2 className="w-4 h-4 text-white" />;
            statusBadgeClass = "bg-green-100 text-green-700";
          } else if (isBreached) {
            dotColor = "bg-red-500";
            dotIcon = <AlertTriangle className="w-4 h-4 text-white" />;
            statusBadgeClass = "bg-red-100 text-red-700";
          } else if (isEscalated) {
            dotColor = "bg-amber-500";
            dotIcon = <ArrowRight className="w-4 h-4 text-white" />;
            statusBadgeClass = "bg-amber-100 text-amber-700";
          } else if (!isPending) {
            dotColor = "bg-blue-500";
            dotIcon = <User className="w-4 h-4 text-white" />;
            statusBadgeClass = "bg-blue-100 text-blue-700";
          }

          return (
            <motion.div
              key={step.id}
              className="relative flex gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              {/* Timeline Dot */}
              <div className="flex flex-col items-center z-10">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${dotColor} ${isBreached ? 'ring-4 ring-red-500/20 animate-pulse' : 'ring-2 ring-white'}`}
                >
                  {dotIcon}
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 p-4 rounded-[16px] border ${isBreached ? 'border-red-200 bg-red-50/30' : 'border-cloud bg-snow'}`}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-fog uppercase tracking-wider">{step.tierName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadgeClass}`}>
                        {step.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h4 className="font-semibold text-obsidian text-sm">{step.officialName}</h4>
                      {step.officialPartyCode && <PartyBadge partyCode={step.officialPartyCode} />}
                    </div>
                    <p className="text-xs text-steel">{step.officialDesignation}</p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs text-fog whitespace-nowrap">{new Date(step.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className={`text-[10px] font-semibold mt-1 ${step.hoursElapsed > step.slaHours ? 'text-red-500' : 'text-green-600'}`}>
                      {step.hoursElapsed}h / {step.slaHours}h SLA
                    </span>
                  </div>
                </div>

                {step.note && (
                  <div className="mt-2 text-sm text-graphite bg-white/60 p-3 rounded-lg border border-cloud/50">
                    {step.note}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
