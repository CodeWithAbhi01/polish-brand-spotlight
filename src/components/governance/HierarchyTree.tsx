import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

const tiers = [
  {
    level: 'NATIONAL',
    title: 'National Level',
    description: 'PM, Ministers & Parliament',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    count: 24,
    examples: 'Prime Minister, Cabinet Ministers, MPs'
  },
  {
    level: 'STATE',
    title: 'State Level',
    description: 'MLA, CM & Secretariat',
    color: 'bg-ember',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    count: 156,
    examples: 'Chief Minister, State Ministers, MLAs'
  },
  {
    level: 'DISTRICT',
    title: 'District Level',
    description: 'Collector & Police',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    count: 432,
    examples: 'District Magistrate, SP, Commissioners'
  },
  {
    level: 'LOCAL',
    title: 'Local Level',
    description: 'Ward & Municipal',
    color: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    count: 1250,
    examples: 'Mayor, Corporators, Ward Members'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const HierarchyTree: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        {tiers.map((tier, index) => (
          <React.Fragment key={tier.level}>
            <motion.div 
              variants={itemVariants}
              className={`group w-full relative bg-snow border border-cloud rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-4 md:gap-6 ${tier.bgColor} bg-opacity-30`}
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-full ${tier.color} bg-opacity-10 flex items-center justify-center`}>
                <div className={`w-12 h-12 rounded-full ${tier.color} text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-obsidian">{tier.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${tier.bgColor} ${tier.textColor}`}>
                    {tier.level}
                  </span>
                </div>
                <p className="text-sm text-steel mb-2">{tier.description}</p>
                <p className="text-xs text-fog italic">{tier.examples}</p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2 bg-white px-4 py-2 rounded-[16px] border border-cloud shadow-sm">
                <Users className={`w-4 h-4 ${tier.textColor}`} />
                <span className="font-semibold text-graphite">{tier.count}</span>
                <span className="text-xs text-fog">Officials</span>
              </div>
            </motion.div>

            {index < tiers.length - 1 && (
              <motion.div 
                variants={itemVariants}
                className="h-10 border-l-2 border-dashed border-ember/30 flex flex-col items-center justify-center relative my-2"
              >
                <div className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-fog/40"></div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
