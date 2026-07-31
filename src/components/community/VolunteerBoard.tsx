import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, Shield } from 'lucide-react';

const mockVolunteers = [
  { id: '1', name: 'Priya Sharma', ward: 'Ward 42', issuesResolved: 156, sabhasJoined: 12, verified: true },
  { id: '2', name: 'Rahul Desai', ward: 'Ward 18', issuesResolved: 134, sabhasJoined: 9, verified: true },
  { id: '3', name: 'Anita Patel', ward: 'Ward 05', issuesResolved: 112, sabhasJoined: 14, verified: true },
  { id: '4', name: 'Vikram Singh', ward: 'Ward 22', issuesResolved: 98, sabhasJoined: 7, verified: false },
  { id: '5', name: 'Meera Reddy', ward: 'Ward 11', issuesResolved: 87, sabhasJoined: 11, verified: true },
  { id: '6', name: 'Sanjay Kumar', ward: 'Ward 33', issuesResolved: 76, sabhasJoined: 6, verified: false },
  { id: '7', name: 'Neha Gupta', ward: 'Ward 08', issuesResolved: 65, sabhasJoined: 8, verified: true },
  { id: '8', name: 'Arjun Verma', ward: 'Ward 15', issuesResolved: 54, sabhasJoined: 5, verified: false },
];

export const VolunteerBoard: React.FC = () => {
  const top3 = mockVolunteers.slice(0, 3);
  const rest = mockVolunteers.slice(3);

  return (
    <section id="community" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-600 uppercase tracking-wider border border-amber-200 mb-3"><Award className="h-3 w-3" /> Hall of Impact</div>
        <h2 className="text-3xl font-bold text-obsidian mb-2">Civic Champions</h2>
        <p className="text-steel">Citizens making a real difference</p>
      </motion.div>

      <div className="bg-snow border border-cloud rounded-[32px] p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
        {/* Podium */}
        <div className="flex flex-row items-end justify-center gap-2 sm:gap-8 mb-12 md:mb-16 h-56 md:h-72 pt-8">
          {/* Rank 2 - Silver */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-col items-center order-1 relative group"
          >
            <div className="relative mb-3 sm:mb-5 transition-transform group-hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 sm:border-4 border-slate-300 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-slate-700 shadow-[0_0_20px_rgba(203,213,225,0.4)]">
                {top3[1].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-br from-slate-400 to-slate-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border sm:border-2 border-white">
                2
              </div>
            </div>
            <h4 className="font-bold text-obsidian text-[11px] sm:text-base text-center leading-tight truncate w-20 sm:w-auto">{top3[1].name}</h4>
            <p className="text-[10px] sm:text-xs text-steel mb-2 sm:mb-3">{top3[1].ward}</p>
            <div className="bg-gradient-to-t from-slate-100 to-white border border-slate-200 px-2 py-6 sm:px-4 sm:py-8 rounded-t-[16px] sm:rounded-t-[20px] w-20 sm:w-32 flex flex-col items-center shadow-[0_-4px_20px_rgba(203,213,225,0.2)]">
              <span className="font-black text-lg sm:text-xl text-slate-800">{top3[1].issuesResolved}</span>
              <span className="text-[8px] sm:text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">Resolved</span>
            </div>
          </motion.div>

          {/* Rank 1 - Gold */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col items-center order-2 z-10 relative group"
          >
            <div className="relative mb-3 sm:mb-5 transition-transform group-hover:-translate-y-2">
              <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-amber-500 drop-shadow-xl animate-bounce">
                <Award size={32} className="fill-amber-100 sm:w-10 sm:h-10" />
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-2 sm:border-4 border-amber-400 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black text-amber-700 shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-shadow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent"></div>
                {top3[0].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-br from-amber-400 to-amber-600 text-white w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md border sm:border-2 border-white">
                1
              </div>
            </div>
            <h4 className="font-black text-obsidian text-[12px] sm:text-lg text-center leading-tight truncate w-24 sm:w-auto">{top3[0].name}</h4>
            <p className="text-[10px] sm:text-xs text-steel mb-2 sm:mb-3 font-medium">{top3[0].ward}</p>
            <div className="bg-gradient-to-t from-amber-50 to-white border border-amber-200 px-2 py-10 sm:px-4 sm:py-12 rounded-t-[20px] sm:rounded-t-[24px] w-24 sm:w-36 flex flex-col items-center shadow-[0_-8px_30px_rgba(251,191,36,0.25)] hover:shadow-[0_-12px_40px_rgba(251,191,36,0.3)] transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-amber-300 to-amber-500"></div>
              <span className="font-black text-2xl sm:text-3xl text-amber-700">{top3[0].issuesResolved}</span>
              <span className="text-[8px] sm:text-[10px] uppercase text-amber-600 font-bold tracking-wider mt-1">Resolved</span>
            </div>
          </motion.div>

          {/* Rank 3 - Bronze */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="flex flex-col items-center order-3 relative group"
          >
            <div className="relative mb-3 sm:mb-5 transition-transform group-hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 sm:border-4 border-orange-300 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-orange-700 shadow-[0_0_20px_rgba(253,186,116,0.4)]">
                {top3[2].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-br from-orange-400 to-orange-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border sm:border-2 border-white">
                3
              </div>
            </div>
            <h4 className="font-bold text-obsidian text-[11px] sm:text-base text-center leading-tight truncate w-20 sm:w-auto">{top3[2].name}</h4>
            <p className="text-[10px] sm:text-xs text-steel mb-2 sm:mb-3">{top3[2].ward}</p>
            <div className="bg-gradient-to-t from-orange-50 to-white border border-orange-200 px-2 py-4 sm:px-4 sm:py-6 rounded-t-[16px] sm:rounded-t-[20px] w-20 sm:w-32 flex flex-col items-center shadow-[0_-4px_20px_rgba(253,186,116,0.15)]">
              <span className="font-black text-lg sm:text-xl text-orange-800">{top3[2].issuesResolved}</span>
              <span className="text-[8px] sm:text-[10px] uppercase text-orange-600 font-bold tracking-wider mt-1">Resolved</span>
            </div>
          </motion.div>
        </div>

        {/* List */}
        <div className="bg-white border border-cloud/80 rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {rest.map((volunteer, idx) => (
            <motion.div 
              key={volunteer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`flex items-center justify-between p-4 px-5 sm:px-8 ${idx !== rest.length - 1 ? 'border-b border-cloud/60' : ''} hover:bg-paper/80 transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-6 sm:w-8 font-black text-fog/60 group-hover:text-ember transition-colors text-sm sm:text-base">#{idx + 4}</div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-paper to-snow rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-obsidian border border-cloud shadow-sm group-hover:shadow-md transition-shadow">
                  {volunteer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-obsidian text-[14px] sm:text-[16px] leading-none">{volunteer.name}</h5>
                    {volunteer.verified && <Shield size={14} className="text-emerald-500 hidden sm:block" />}
                  </div>
                  <p className="text-[11px] sm:text-[12px] font-medium text-steel mt-1">{volunteer.ward}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-8 text-right">
                <div className="hidden sm:block">
                  <div className="text-[15px] font-bold text-obsidian leading-none mb-1">{volunteer.sabhasJoined}</div>
                  <div className="text-[10px] text-steel uppercase font-bold tracking-wider">Sabhas</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-bold text-ember flex items-center justify-end gap-1.5 leading-none mb-1">
                    <CheckCircle size={14} className="text-ember hidden sm:block" />
                    {volunteer.issuesResolved}
                  </div>
                  <div className="text-[10px] text-steel uppercase font-bold tracking-wider">Resolved</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
