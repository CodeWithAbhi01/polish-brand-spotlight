import React from 'react';
import { GovernanceOfficial } from '@/data/types';
import { PartyBadge } from './PartyBadge';
import { CheckCircle2, MapPin, Briefcase } from 'lucide-react';

interface OfficialCardProps {
  official: GovernanceOfficial;
}

export const OfficialCard: React.FC<OfficialCardProps> = ({ official }) => {
  const initials = (official?.name || 'Unknown')
    .split(' ')
    .map(n => n[0] || '')
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const responseRate = official.responseRate || 0;
  const progressColor = responseRate > 70 ? 'bg-emerald-500' : responseRate >= 40 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 border border-cloud/80 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-[14px] bg-gradient-to-br from-paper to-snow flex items-center justify-center text-obsidian font-bold text-lg border border-cloud/80 shadow-sm group-hover:shadow-md transition-shadow">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-obsidian truncate">{official.name}</h3>
            {official.isOnboarded && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" title="Verified Official" />
            )}
          </div>
          <p className="text-sm text-steel font-medium truncate flex items-center gap-1.5 mt-0.5">
            <Briefcase className="w-3.5 h-3.5" />
            {official.designation}
            {official.department && ` • ${official.department}`}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-fog truncate">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{official.jurisdiction}</span>
          </div>
          {official.partyCode && (
            <div className="flex-shrink-0">
              <PartyBadge partyCode={official.partyCode} />
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-auto pt-4 border-t border-cloud">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-steel">Response Rate</span>
          <span className="text-xs font-bold text-obsidian">{responseRate}%</span>
        </div>
        <div className="w-full bg-paper rounded-full h-1.5 mb-3">
          <div className={`h-1.5 rounded-full ${progressColor}`} style={{ width: `${responseRate}%` }}></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-steel">Issues Routed</span>
          <span className="text-xs font-bold text-obsidian">{official.issuesRouted || 0}</span>
        </div>
      </div>
    </div>
  );
};
