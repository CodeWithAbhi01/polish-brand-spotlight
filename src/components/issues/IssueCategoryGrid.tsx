import React from "react";
import { motion } from "motion/react";
import { issueCategories } from "@/data/issueCategories";
import { 
  Droplets, Zap, Construction, Waves, Trash2, Lightbulb, CloudOff, Bus, 
  ShieldAlert, Building2, Volume2, HeartPulse, GraduationCap, ShieldCheck, 
  TrafficCone, ParkingCircle, Bath, PawPrint, TreePine, HardHat 
} from "lucide-react";

const iconMap: Record<string, any> = {
  Droplets, Zap, Construction, Waves, Trash2, Lightbulb, CloudOff, Bus,
  ShieldAlert, Building2, Volume2, HeartPulse, GraduationCap, ShieldCheck,
  TrafficCone, ParkingCircle, Bath, PawPrint, TreePine, HardHat
};

interface IssueCategoryGridProps {
  onSelectCategory?: (code: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const IssueCategoryGrid: React.FC<IssueCategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {issueCategories.map((cat) => {
        const IconComponent = iconMap[cat.iconName] || Lightbulb;
        return (
          <motion.button
            key={cat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory?.(cat.code)}
            className="flex flex-col items-start p-4 rounded-[16px] border border-cloud bg-snow text-left hover:shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group"
          >
            <div 
              className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" 
              style={{ backgroundColor: cat.color }} 
            />
            
            <div className="flex items-center justify-center w-10 h-10 rounded-full mb-3 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
              <IconComponent className="w-5 h-5" />
            </div>
            
            <h3 className="font-semibold text-obsidian text-sm mb-1 leading-tight">{cat.name}</h3>
            
            <div className="flex items-center gap-2 mt-auto pt-2 w-full">
              <span className="text-[10px] uppercase font-bold text-fog">SLA: {cat.defaultSlaHours}h</span>
              <span className="text-[10px] text-fog ml-auto">{cat.tags.length} tags</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};
