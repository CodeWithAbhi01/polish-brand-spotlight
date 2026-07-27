import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2, BarChart2, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "./AuthModal";

interface PollOption {
  id: string;
  text: string;
  percentage: number;
  votes: number;
  color: string;
}

interface CivicPollProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export function CivicPoll({ user, onOpenAuth }: CivicPollProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(1482);
  const [options, setOptions] = useState<PollOption[]>([
    {
      id: "opt-1",
      text: "Yes, 100% mandatory with municipal tax incentives & green subsidies",
      percentage: 64,
      votes: 948,
      color: "bg-emerald-500",
    },
    {
      id: "opt-2",
      text: "Voluntary adoption first with community-led pilot projects",
      percentage: 28,
      votes: 415,
      color: "bg-amber-500",
    },
    {
      id: "opt-3",
      text: "No, current construction regulations are already sufficient",
      percentage: 8,
      votes: 119,
      color: "bg-red-500",
    },
  ]);

  const handleVote = (id: string) => {
    if (!user) {
      toast.error("Vote darz karne ke liye kripya pehle Login / Register karein!");
      onOpenAuth();
      return;
    }
    if (hasVoted) {
      toast.info("Aap pehle se hi aaj ke Civic Pulse poll me vote darz kar chuke hain.");
      return;
    }

    setSelectedId(id);
    setHasVoted(true);
    setTotalVotes(prev => prev + 1);

    // Recalculate percentages dynamically
    setOptions(prev => {
      const newTotal = totalVotes + 1;
      return prev.map(opt => {
        const newVotes = opt.id === id ? opt.votes + 1 : opt.votes;
        return {
          ...opt,
          votes: newVotes,
          percentage: Math.round((newVotes / newTotal) * 100),
        };
      });
    });

    toast.success("Aapka vote successfully verified & register ho gaya hai! Civic data updated.");
  };

  return (
    <section className="px-6 py-16 bg-snow border-y border-cloud">
      <div className="mx-auto max-w-[1000px] rounded-[36px] bg-obsidian p-8 sm:p-12 text-snow shadow-2xl relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-ember/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Question & Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-ember/20 px-3 py-1 text-[11px] font-bold text-ember uppercase tracking-wider border border-ember/30">
              <BarChart2 className="h-3.5 w-3.5" /> DAILY CIVIC PULSE POLL
            </div>
            <h3 className="mt-4 text-[28px] font-semibold leading-[1.2] tracking-tight text-snow sm:text-[34px]">
              Should solar rooftops be mandatory for metro commercial buildings by 2027?
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ash">
              Your verified vote directly informs municipal green energy benchmarks and civic sustainability reports submitted to urban development authorities.
            </p>
            <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate text-[12px] text-fog">
              <span className="flex items-center gap-1 text-snow font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> 100% Verified Citizens
              </span>
              <span>·</span>
              <span>{totalVotes.toLocaleString()} Votes Today</span>
            </div>
          </div>

          {/* Right Column: Interactive Options */}
          <div className="lg:col-span-7 space-y-3.5">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  className={`group relative overflow-hidden rounded-[22px] border p-5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-ember bg-slate/90 shadow-lg shadow-ember/10"
                      : "border-slate bg-graphite/80 hover:border-iron hover:bg-slate/50"
                  }`}
                >
                  {/* Progress bar background for voted state */}
                  {hasVoted && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${opt.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`absolute left-0 top-0 bottom-0 opacity-15 ${opt.color}`}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border ${
                        isSelected ? "border-ember bg-ember text-snow" : "border-fog text-transparent group-hover:border-snow"
                      }`}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[14px] font-medium text-snow leading-snug">
                        {opt.text}
                      </span>
                    </div>

                    {hasVoted ? (
                      <div className="text-right flex-none">
                        <span className="text-[18px] font-bold text-snow">{opt.percentage}%</span>
                        <div className="text-[11px] text-ash">{opt.votes} votes</div>
                      </div>
                    ) : (
                      <span className="text-[12px] font-medium text-ash opacity-0 group-hover:opacity-100 transition-opacity flex-none">
                        Click to Vote &rarr;
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {!hasVoted && (
              <div className="text-center pt-2 text-[12px] text-ash italic">
                * Click on any option to submit your verified civic opinion.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
