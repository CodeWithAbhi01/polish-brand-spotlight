import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Shield, Users, CheckCircle2, Activity } from 'lucide-react';
import { governanceOfficials, searchOfficials, getOfficialsByTier } from '@/data/governance';
import { GovernanceTier } from '@/data/types';
import { OfficialCard } from './OfficialCard';
import { HierarchyTree } from './HierarchyTree';

const tabs: { label: string; value: GovernanceTier | 'ALL' }[] = [
  { label: 'All Tiers', value: 'ALL' },
  { label: 'National', value: 'NATIONAL' },
  { label: 'State', value: 'STATE' },
  { label: 'District', value: 'DISTRICT' },
  { label: 'Local', value: 'LOCAL' }
];

export const GovernanceDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GovernanceTier | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOfficials = useMemo(() => {
    let result = governanceOfficials;
    
    if (activeTab !== 'ALL') {
      result = getOfficialsByTier(activeTab);
    }
    
    if (searchQuery.trim() !== '') {
      result = searchOfficials(searchQuery, result);
    }
    
    return result;
  }, [activeTab, searchQuery]);

  const totalOfficials = governanceOfficials.length;
  const onboardedCount = governanceOfficials.filter(o => o.isOnboarded).length;
  const avgResponseRate = Math.round(
    governanceOfficials.reduce((acc, curr) => acc + (curr.responseRate || 0), 0) / (totalOfficials || 1)
  );

  return (
    <section id="governance" className="py-16 md:py-24 bg-paper min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ember/10 text-ember text-sm font-semibold mb-4"
          >
            <Shield className="w-4 h-4" />
            <span>Civic Transparency</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-obsidian tracking-tight mb-4"
          >
            Governance Directory
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-steel max-w-2xl mx-auto"
          >
            Every official. Every tier. Complete transparency.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-cloud flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-steel">Total Officials</p>
              <p className="text-2xl font-bold text-obsidian">{totalOfficials}</p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-cloud flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-steel">Onboarded</p>
              <p className="text-2xl font-bold text-obsidian">{onboardedCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-cloud flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-steel">Avg Response Rate</p>
              <p className="text-2xl font-bold text-obsidian">{avgResponseRate}%</p>
            </div>
          </div>
        </motion.div>

        {/* Hierarchy Tree */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-obsidian">Escalation Matrix</h3>
            <p className="text-steel mt-2">How issues move through the system</p>
          </div>
          <HierarchyTree />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-fog" />
            </div>
            <input
              type="text"
              placeholder="Search by name, designation, or jurisdiction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-cloud rounded-[20px] bg-white leading-5 placeholder-fog focus:outline-none focus:ring-2 focus:ring-ember/50 focus:border-ember transition-colors sm:text-sm shadow-sm"
            />
          </div>

          <div className="flex overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 gap-2 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-[16px] text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-obsidian text-white'
                    : 'bg-white text-steel border border-cloud hover:bg-snow'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredOfficials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredOfficials.map((official) => (
                <motion.div
                  key={official.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <OfficialCard official={official} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border border-cloud">
            <Search className="w-12 h-12 text-fog mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-obsidian mb-1">No officials found</h3>
            <p className="text-steel">Try adjusting your search query or tier filter.</p>
          </div>
        )}

      </div>
    </section>
  );
};
