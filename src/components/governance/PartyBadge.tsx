import React from 'react';
import { getPartyByCode } from '@/data/parties';

interface PartyBadgeProps {
  partyCode: string;
}

export const PartyBadge: React.FC<PartyBadgeProps> = ({ partyCode }) => {
  const party = getPartyByCode(partyCode);
  
  if (!party) {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
        IND
      </span>
    );
  }

  const color = party.color || '#71717a'; 
  
  return (
    <span 
      className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{
        backgroundColor: `${color}1A`,
        color: color,
        borderColor: `${color}33`,
      }}
      title={party.name}
    >
      {party.code}
    </span>
  );
};
