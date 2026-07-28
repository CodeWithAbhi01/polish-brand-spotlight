import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/data/types';
import { mockFiledIssues } from '@/data/mockIssues';
import { FileText, Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface MyIssuesPanelProps {
  user?: UserProfile | null;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved': return 'bg-green-100 text-green-700';
    case 'in progress': return 'bg-blue-100 text-blue-700';
    case 'escalated': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved': return <CheckCircle size={14} />;
    case 'escalated': return <AlertTriangle size={14} />;
    default: return <Clock size={14} />;
  }
};

export const MyIssuesPanel: React.FC<MyIssuesPanelProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="bg-snow border border-cloud rounded-[24px] p-8 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <div className="w-16 h-16 bg-cloud rounded-full flex items-center justify-center text-fog mb-4">
          <FileText size={24} />
        </div>
        <h3 className="text-obsidian text-lg font-semibold mb-2">Track Your Issues</h3>
        <p className="text-steel mb-6 max-w-[250px]">Log in to view and track the status of issues you have filed.</p>
        <button 
          onClick={() => toast.info('Login flow initiated')}
          className="bg-obsidian text-white px-6 py-2.5 rounded-[12px] font-medium hover:bg-graphite transition-colors"
        >
          Login to View
        </button>
      </div>
    );
  }

  // Use mock data if available, fallback to internal defaults
  const recentIssues = mockFiledIssues?.slice(0, 3) || [
    { id: 'PET-2026-001', title: 'Pothole repair on MG Road', status: 'In Progress', slaStatus: 'On Track', tier: 'Tier 1' },
    { id: 'PET-2026-042', title: 'Streetlight malfunction in Sector 4', status: 'Resolved', slaStatus: 'Met', tier: 'Tier 1' },
    { id: 'PET-2026-089', title: 'Garbage accumulation near park', status: 'Escalated', slaStatus: 'Breached', tier: 'Tier 2' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-snow border border-cloud rounded-[24px] p-6 shadow-sm h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-obsidian text-lg font-semibold">My Filed Issues</h3>
        <button 
          onClick={() => toast.success('New issue form opened')}
          className="flex items-center gap-1.5 text-sm bg-ember text-white px-3 py-1.5 rounded-[10px] font-medium hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>File New</span>
        </button>
      </div>

      <div className="flex-1 space-y-3">
        {recentIssues.map((issue: any, idx: number) => (
          <motion.div 
            key={issue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-[16px] border border-cloud bg-white hover:border-blue-200 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-fog">{issue.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${getStatusColor(issue.status)}`}>
                {getStatusIcon(issue.status)}
                {issue.status}
              </span>
            </div>
            <h4 className="text-obsidian font-medium text-sm mb-3 line-clamp-1 group-hover:text-ember transition-colors">
              {issue.title}
            </h4>
            <div className="flex items-center justify-between text-xs">
              <span className="text-steel bg-paper px-2 py-1 rounded-[6px]">{issue.tier}</span>
              <span className={`font-medium ${issue.slaStatus?.toLowerCase().includes('breach') ? 'text-red-500' : 'text-emerald-500'}`}>
                SLA: {issue.slaStatus}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-steel font-medium hover:text-obsidian transition-colors border-t border-cloud pt-4 flex items-center justify-center gap-1">
        <span>View All Issues</span>
        <span>→</span>
      </button>
    </motion.div>
  );
};
