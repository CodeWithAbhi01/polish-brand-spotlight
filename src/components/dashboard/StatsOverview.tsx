import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Landmark, FileText, CheckCircle, Clock, Shield } from 'lucide-react';
import { platformStats } from '@/data/mockIssues';

const statsData = [
  { id: 'citizens', label: 'Citizens', value: 52847, prefix: '', suffix: '', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'sabhas', label: 'Sabhas', value: 1247, prefix: '', suffix: '', icon: Landmark, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'filed', label: 'Issues Filed', value: 8934, prefix: '', suffix: '', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'resolved', label: 'Resolved', value: 6721, prefix: '', suffix: '', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'response', label: 'Response Rate', value: 64, prefix: '', suffix: '%', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'transparency', label: 'Transparency Score', value: 87.4, prefix: '', suffix: '%', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50', isFloat: true },
];

const AnimatedNumber = ({ value, isFloat = false }: { value: number; isFloat?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}</span>;
};

export const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white border border-cloud/80 rounded-[24px] p-5 flex flex-col items-start shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Icon size={100} />
            </div>
            <div className={`p-2.5 rounded-[12px] ${stat.bg} ${stat.color} mb-3`}>
              <Icon size={20} />
            </div>
            <p className="text-fog text-sm font-medium mb-1">{stat.label}</p>
            <h4 className="text-obsidian text-2xl font-bold tracking-tight z-10">
              {stat.prefix}
              <AnimatedNumber value={stat.value} isFloat={stat.isFloat} />
              {stat.suffix}
            </h4>
          </motion.div>
        );
      })}
    </div>
  );
};
