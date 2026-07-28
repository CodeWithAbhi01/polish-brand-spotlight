import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IssueCategoryGrid } from "./IssueCategoryGrid";
import { IssueCard } from "./IssueCard";
import { EscalationTimeline } from "./EscalationTimeline";
import { EscalationAlertBanner } from "./EscalationAlertBanner";
import { mockFiledIssues } from "@/data/mockIssues";

export const IssueTracker: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredIssues = filterCategory 
    ? mockFiledIssues.filter(issue => issue.categoryCode === filterCategory)
    : mockFiledIssues;

  const totalIssues = mockFiledIssues.length;
  const resolvedCount = mockFiledIssues.filter(i => i.status === "RESOLVED").length;
  const activeEscalations = mockFiledIssues.filter(i => i.status === "ESCALATED").length;

  return (
    <section id="tracker" className="py-16 bg-paper min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian mb-4">
            Issue Escalation Tracker
          </h2>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            Track every civic issue from filing to resolution. Complete transparency at every level.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-[16px] bg-snow border border-cloud text-center">
            <span className="block text-2xl font-bold text-obsidian">{totalIssues}</span>
            <span className="text-xs text-fog uppercase font-bold tracking-wider">Total Issues</span>
          </div>
          <div className="p-4 rounded-[16px] bg-snow border border-cloud text-center">
            <span className="block text-2xl font-bold text-green-600">{resolvedCount}</span>
            <span className="text-xs text-fog uppercase font-bold tracking-wider">Resolved</span>
          </div>
          <div className="p-4 rounded-[16px] bg-snow border border-cloud text-center">
            <span className="block text-2xl font-bold text-blue-600">48h</span>
            <span className="text-xs text-fog uppercase font-bold tracking-wider">Avg Resolution</span>
          </div>
          <div className="p-4 rounded-[16px] bg-snow border border-cloud text-center">
            <span className="block text-2xl font-bold text-amber-600">{activeEscalations}</span>
            <span className="text-xs text-fog uppercase font-bold tracking-wider">Active Escalations</span>
          </div>
        </div>

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
                        <div className="mt-4 p-6 bg-white rounded-[24px] border border-cloud shadow-sm">
                          <EscalationAlertBanner issue={issue} />
                          
                          <div className="mt-6">
                            <h4 className="text-sm font-bold text-obsidian uppercase tracking-wider mb-4 px-2">Escalation History</h4>
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
