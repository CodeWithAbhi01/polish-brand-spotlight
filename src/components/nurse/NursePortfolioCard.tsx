import React from "react";
import { ShieldCheck, Stethoscope, Clock, CalendarDays, Award } from "lucide-react";
import { motion } from "motion/react";

interface NursePortfolioCardProps {
  nurse: {
    name: string;
    hospital: string;
    experience: string;
    shifts: string;
    verified: boolean;
    license: string;
    imageUrl?: string;
  };
}

export function NursePortfolioCard({ nurse }: NursePortfolioCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative rounded-[28px] border border-cloud bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-ember/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            {nurse.imageUrl ? (
              <img 
                src={nurse.imageUrl} 
                alt={nurse.name} 
                className="h-16 w-16 rounded-full object-cover border-2 border-cloud"
              />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-paper to-cloud border-2 border-white shadow-sm text-lg font-bold text-obsidian">
                {nurse.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}
            {nurse.verified && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm" title="Govt KYC Verified">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-obsidian flex items-center gap-2">
              {nurse.name}
            </h3>
            <p className="text-[13px] text-steel font-medium flex items-center gap-1.5 mt-0.5">
              <Stethoscope size={14} className="text-ember" />
              {nurse.license || "Registered Nurse"}
            </p>
          </div>
        </div>
        {nurse.verified && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-500/20">
            KYC Verified
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-cloud/60 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fog flex items-center gap-1.5">
            <Award size={12} /> Experience
          </div>
          <div className="text-[14px] font-semibold text-graphite">{nurse.experience} Years</div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fog flex items-center gap-1.5">
            <Clock size={12} /> Shift
          </div>
          <div className="text-[14px] font-semibold text-graphite capitalize">{nurse.shifts} Shift</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-paper border border-cloud p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-white border border-cloud grid place-items-center shadow-sm">
            {/* Fallback Gov Logo if no actual image provided */}
            <span className="text-[16px]">🏛️</span>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-steel tracking-wider">Current Posting</div>
            <div className="text-[13px] font-semibold text-obsidian">{nurse.hospital}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
