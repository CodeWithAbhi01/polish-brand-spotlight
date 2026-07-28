import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const subScores = [
  { label: 'Official Response Rate', value: 64, color: 'bg-amber-500' },
  { label: 'Issue Resolution Rate', value: 75, color: 'bg-blue-500' },
  { label: 'SLA Compliance', value: 71, color: 'bg-purple-500' },
  { label: 'Citizen Satisfaction', value: 82, color: 'bg-emerald-500' },
];

export const TransparencyScore: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const score = 87.4;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-snow border border-cloud rounded-[24px] p-6 shadow-sm flex flex-col items-center h-full"
    >
      <h3 className="text-obsidian text-lg font-semibold mb-6 self-start">Transparency Score</h3>
      
      <div className="relative w-40 h-40 mb-8 mt-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-cloud"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            className="text-emerald-500"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: mounted ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-obsidian">{score}%</span>
          <span className="text-xs font-medium text-fog uppercase tracking-wider mt-1">Excellent</span>
        </div>
      </div>

      <div className="w-full space-y-5 mt-auto">
        {subScores.map((item, i) => (
          <div key={i} className="w-full">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-steel font-medium">{item.label}</span>
              <span className="text-obsidian font-semibold">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-cloud rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: mounted ? `${item.value}%` : 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className={`h-full ${item.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
