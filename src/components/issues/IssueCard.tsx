import React from "react";
import { motion } from "motion/react";
import { FiledIssue } from "@/data/types";
import { MapPin, ThumbsUp, Users, Clock } from "lucide-react";
import { issueCategories } from "@/data/issueCategories";

interface IssueCardProps {
  issue: FiledIssue;
  onClick?: () => void;
  isExpanded?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick, isExpanded }) => {
  const category = issueCategories.find((c) => c.code === issue.categoryCode);
  const color = category?.color || "#71717a";

  let slaColor = "bg-green-500";
  if (issue.slaStatus === "BREACHED") slaColor = "bg-amber-500 animate-pulse";
  if (issue.slaStatus === "CRITICAL") slaColor = "bg-red-500 animate-pulse ring-2 ring-red-500/30";

  return (
    <motion.div
      whileHover={{ y: isExpanded ? 0 : -2 }}
      onClick={onClick}
      className={`p-5 rounded-[24px] border transition-all duration-300 cursor-pointer bg-white flex flex-col gap-1 ${
        isExpanded 
          ? "border-obsidian shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
          : "border-cloud/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-cloud"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              {issue.categoryName}
            </span>
            <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
              {issue.petitionId}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
              issue.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
              issue.severity === 'HIGH' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {issue.severity}
            </span>
          </div>
          <h3 className="font-bold text-obsidian text-lg leading-tight line-clamp-2">
            {issue.title}
          </h3>
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-cloud shadow-sm shrink-0" title={`SLA Status: ${issue.slaStatus}`}>
          <div className={`w-3 h-3 rounded-full ${slaColor}`} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-steel mb-4">
        <MapPin className="w-3.5 h-3.5" />
        <span className="truncate">{issue.location}, {issue.ward}, {issue.city}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cloud/60">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-graphite font-medium">
            <ThumbsUp className="w-4 h-4 text-fog" />
            {issue.endorsements}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-graphite font-medium">
            <Users className="w-4 h-4 text-fog" />
            {issue.volunteersActive}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-fog uppercase font-bold">Current Tier</span>
            <span className="text-xs font-medium text-obsidian">{issue.currentTierName}</span>
          </div>
          <div className="w-px h-6 bg-cloud hidden sm:block" />
          <div className="flex items-center gap-1.5 text-xs text-steel">
            <Clock className="w-3.5 h-3.5" />
            {new Date(issue.filedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
