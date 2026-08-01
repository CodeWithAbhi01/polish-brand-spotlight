import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Shield, Users, CheckCircle2, Activity } from 'lucide-react';
import { governanceOfficials, searchOfficials, getOfficialsByTier } from '@/data/governance';
import { GovernanceTier } from '@/data/types';
import { OfficialCard } from './OfficialCard';
import { HierarchyTree } from './HierarchyTree';
import { indiaStates, getDistrictsForState } from '@/data/indiaLocations';

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
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

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
    <section id="governance" className="py-20 md:py-32 bg-snow min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-6"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Civic Transparency</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[38px] md:text-[56px] font-black text-obsidian tracking-tight mb-5 leading-[1.1]"
          >
            Governance Directory
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-steel max-w-2xl mx-auto font-medium"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20"
        >
          <div className="group bg-white/80 backdrop-blur-xl rounded-[28px] p-7 border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-14 h-14 rounded-[16px] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 group-hover:rotate-6 transition-transform relative z-10">
              <Users className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <p className="text-[13px] font-bold text-steel uppercase tracking-wider mb-1">Total Officials</p>
              <p className="text-[32px] font-black text-obsidian leading-none">{totalOfficials}</p>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-xl rounded-[28px] p-7 border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-14 h-14 rounded-[16px] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:rotate-6 transition-transform relative z-10">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <p className="text-[13px] font-bold text-steel uppercase tracking-wider mb-1">Onboarded</p>
              <p className="text-[32px] font-black text-obsidian leading-none">{onboardedCount}</p>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-xl rounded-[28px] p-7 border border-cloud/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-14 h-14 rounded-[16px] bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 group-hover:rotate-6 transition-transform relative z-10">
              <Activity className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <p className="text-[13px] font-bold text-steel uppercase tracking-wider mb-1">Avg Response</p>
              <p className="text-[32px] font-black text-obsidian leading-none">{avgResponseRate}%</p>
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
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-10">
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-fog" />
            </div>
            <input
              type="text"
              placeholder="Search by name, designation, or jurisdiction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border border-cloud/60 rounded-[20px] bg-white/60 backdrop-blur-md text-[14px] font-medium text-obsidian placeholder:text-fog focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
              className="w-full lg:w-40 px-4 py-3.5 border border-cloud/60 rounded-[16px] bg-white/60 backdrop-blur-md text-[14px] font-medium text-obsidian focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 appearance-none shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-white transition-all"
            >
              <option value="">All States</option>
              {indiaStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full lg:w-40 px-4 py-3.5 border border-cloud/60 rounded-[16px] bg-white/60 backdrop-blur-md text-[14px] font-medium text-obsidian focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 appearance-none disabled:opacity-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-white transition-all cursor-pointer"
            >
              <option value="">All Districts</option>
              {selectedState && getDistrictsForState(selectedState).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          
          <div className="flex overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 gap-2 hide-scrollbar bg-white/50 backdrop-blur-md p-1.5 rounded-[20px] border border-cloud/60">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-shrink-0 px-5 py-2 rounded-[14px] text-[13px] font-bold transition-all ${
                  activeTab === tab.value
                    ? 'bg-obsidian text-white shadow-md'
                    : 'bg-transparent text-steel hover:text-obsidian hover:bg-white/80'
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
