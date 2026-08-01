import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IssueCategoryGrid } from "./IssueCategoryGrid";
import { IssueCard } from "./IssueCard";
import { EscalationTimeline } from "./EscalationTimeline";
import { EscalationAlertBanner } from "./EscalationAlertBanner";
import { mockFiledIssues } from "@/data/mockIssues";

export const IssueTracker: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(mockFiledIssues[0]?.id || null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredIssues = filterCategory 
    ? mockFiledIssues.filter(issue => issue.categoryCode === filterCategory)
    : mockFiledIssues;

  const totalIssues = mockFiledIssues.length;
  const resolvedCount = mockFiledIssues.filter(i => i.status === "RESOLVED").length;
  const activeEscalations = mockFiledIssues.filter(i => i.status === "ESCALATED").length;

  return (
    <section id="tracker" className="py-20 md:py-32 bg-snow min-h-screen relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ember/10 text-ember text-[11px] font-bold uppercase tracking-wider mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-ember animate-pulse"></span>
            Civic Accountability
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[38px] md:text-[56px] font-black text-obsidian tracking-tight mb-5 leading-[1.1]"
          >
            Issue Escalation Tracker
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-steel max-w-2xl mx-auto font-medium"
          >
            Track every civic issue from filing to resolution. Complete transparency at every level.
          </motion.p>
        </div>

        {/* Stats bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-16"
        >
          <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[24px] border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 text-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-[28px] md:text-[32px] font-black text-obsidian relative z-10 leading-none mb-1">{totalIssues}</span>
            <span className="text-[11px] text-steel uppercase font-bold tracking-wider relative z-10">Total Issues</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[24px] border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 text-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-[28px] md:text-[32px] font-black text-emerald-600 relative z-10 leading-none mb-1">{resolvedCount}</span>
            <span className="text-[11px] text-emerald-600 uppercase font-bold tracking-wider relative z-10">Resolved</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[24px] border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 text-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-[28px] md:text-[32px] font-black text-blue-600 relative z-10 leading-none mb-1">48h</span>
            <span className="text-[11px] text-blue-600 uppercase font-bold tracking-wider relative z-10">Avg Resolution</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[24px] border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 text-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ember/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-[28px] md:text-[32px] font-black text-ember relative z-10 leading-none mb-1">{activeEscalations}</span>
            <span className="text-[11px] text-ember uppercase font-bold tracking-wider relative z-10">Active Escalations</span>
          </div>
        </motion.div>

        {/* Category Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-obsidian">Browse by Category</h3>
            {filterCategory && (
              <button 
                onClick={() => setFilterCategory(null)}
                className="text-sm font-semibold text-ember hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <IssueCategoryGrid 
            onSelectCategory={(code) => setFilterCategory(code === filterCategory ? null : code)} 
          />
        </div>

        {/* Issue List */}
        <div>
          <h3 className="text-xl font-bold text-obsidian mb-6">Recent Escalations</h3>
          <div className="flex flex-col gap-4">
            {filteredIssues.map(issue => {
              const isExpanded = selectedIssueId === issue.id;

              return (
                <div key={issue.id} className="relative">
                  <IssueCard 
                    issue={issue} 
                    isExpanded={isExpanded}
                    onClick={() => setSelectedIssueId(isExpanded ? null : issue.id)} 
                  />
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-6 sm:p-8 bg-white/60 backdrop-blur-xl rounded-[28px] border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                          <EscalationAlertBanner issue={issue} />
                          
                          <div className="mt-8">
                            <h4 className="text-[13px] font-bold text-obsidian uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-ember"></span>
                              Escalation History
                            </h4>
                            <EscalationTimeline steps={issue.escalationHistory} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {filteredIssues.length === 0 && (
              <div className="text-center py-12 text-fog">
                No issues found for this category.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
