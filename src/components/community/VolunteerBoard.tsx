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
        <h2 className="text-3xl font-bold text-obsidian mb-2">Civic Champions</h2>
        <p className="text-steel">Citizens making a real difference</p>
      </motion.div>

      <div className="bg-snow border border-cloud rounded-[32px] p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
        {/* Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-12 h-auto md:h-64 pt-8">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center order-2 md:order-1"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-obsidian shadow-md">
                {top3[1].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">
                2
              </div>
            </div>
            <h4 className="font-bold text-obsidian">{top3[1].name}</h4>
            <p className="text-sm text-steel mb-2">{top3[1].ward}</p>
            <div className="bg-white border border-gray-200 px-4 py-6 rounded-t-[16px] w-32 flex flex-col items-center shadow-sm">
              <span className="font-bold text-lg text-obsidian">{top3[1].issuesResolved}</span>
              <span className="text-[10px] uppercase text-fog font-semibold">Resolved</span>
            </div>
          </motion.div>

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center order-1 md:order-2 z-10"
          >
            <div className="relative mb-4">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-md">
                <Award size={36} className="fill-yellow-100" />
              </div>
              <div className="w-24 h-24 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-obsidian shadow-lg">
                {top3[0].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">
                1
              </div>
            </div>
            <h4 className="font-bold text-obsidian text-lg">{top3[0].name}</h4>
            <p className="text-sm text-steel mb-2">{top3[0].ward}</p>
            <div className="bg-white border border-yellow-200 shadow-[0_-4px_20px_rgba(250,204,21,0.15)] px-4 py-10 rounded-t-[16px] w-36 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
              <span className="font-bold text-2xl text-obsidian">{top3[0].issuesResolved}</span>
              <span className="text-[10px] uppercase text-fog font-semibold">Resolved</span>
            </div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center order-3"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-white border-4 border-amber-700 rounded-full flex items-center justify-center text-xl font-bold text-obsidian shadow-md">
                {top3[2].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">
                3
              </div>
            </div>
            <h4 className="font-bold text-obsidian">{top3[2].name}</h4>
            <p className="text-sm text-steel mb-2">{top3[2].ward}</p>
            <div className="bg-white border border-amber-100 px-4 py-4 rounded-t-[16px] w-32 flex flex-col items-center shadow-sm">
              <span className="font-bold text-lg text-obsidian">{top3[2].issuesResolved}</span>
              <span className="text-[10px] uppercase text-fog font-semibold">Resolved</span>
            </div>
          </motion.div>
        </div>

        {/* List */}
        <div className="bg-white border border-cloud rounded-[24px] overflow-hidden shadow-sm">
          {rest.map((volunteer, idx) => (
            <motion.div 
              key={volunteer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`flex items-center justify-between p-4 px-6 ${idx !== rest.length - 1 ? 'border-b border-cloud' : ''} hover:bg-paper transition-colors group`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 font-bold text-fog group-hover:text-ember transition-colors">#{idx + 4}</div>
                <div className="w-10 h-10 bg-paper rounded-full flex items-center justify-center text-sm font-bold text-obsidian border border-cloud">
                  {volunteer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-obsidian">{volunteer.name}</h5>
                    {volunteer.verified && <Shield size={14} className="text-emerald-500" />}
                  </div>
                  <p className="text-xs text-steel">{volunteer.ward}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block">
                  <div className="text-sm font-bold text-obsidian">{volunteer.sabhasJoined}</div>
                  <div className="text-[10px] text-fog uppercase">Sabhas</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-obsidian flex items-center justify-end gap-1">
                    <CheckCircle size={14} className="text-ember" />
                    {volunteer.issuesResolved}
                  </div>
                  <div className="text-[10px] text-fog uppercase">Resolved</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
