import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/data/types';
import { StatsOverview } from './StatsOverview';
import { TransparencyScore } from './TransparencyScore';
import { MyIssuesPanel } from './MyIssuesPanel';
import { FileEdit, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface CitizenDashboardProps {
  user: UserProfile | null;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ user }) => {
  if (!user) {
    return (
      <section id="dashboard" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-obsidian mb-2">Civic Dashboard</h2>
          <p className="text-steel">Your command center for civic engagement</p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-snow to-paper border border-cloud rounded-[32px] p-12 text-center shadow-sm max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 border border-cloud">
            <Users size={32} className="text-ember" />
          </div>
          <h3 className="text-2xl font-bold text-obsidian mb-4">Login to access your Civic Dashboard</h3>
          <p className="text-steel mb-8 max-w-md mx-auto">Track your issues, view platform transparency, and engage with your local community sabhas.</p>
          <button 
            onClick={() => toast.info('Redirecting to login...')}
            className="bg-obsidian text-white px-8 py-3 rounded-[16px] font-semibold text-lg hover:bg-graphite transition-all hover:shadow-md"
          >
            Log In or Sign Up
          </button>
        </motion.div>
      </section>
    );
  }

  const quickActions = [
    { label: 'File Issue', icon: FileEdit, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:border-blue-200' },
    { label: 'Join Sabha', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', hover: 'hover:border-amber-200' },
    { label: 'View Directory', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-200' },
    { label: 'Track Escalation', icon: AlertTriangle, color: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:border-purple-200' },
  ];

  return (
    <section id="dashboard" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-obsidian mb-2">Civic Dashboard</h2>
        <p className="text-steel">Your command center for civic engagement</p>
      </div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 bg-white border border-cloud p-6 rounded-[24px] shadow-sm"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-ember to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-obsidian">Welcome back, {user.name}</h3>
            <p className="text-steel font-medium mt-1">{user.role || 'Active Citizen'} • Ward {user.ward}</p>
          </div>
        </motion.div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <MyIssuesPanel user={user} />
            
            <div className="bg-snow border border-cloud rounded-[24px] p-6 shadow-sm">
              <h3 className="text-obsidian text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.success(`${action.label} clicked`)}
                      className={`flex flex-col items-center text-center p-4 rounded-[16px] border border-cloud bg-white transition-all shadow-sm ${action.hover} group`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-semibold text-obsidian">{action.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <TransparencyScore />
          </div>
        </div>
      </div>
    </section>
  );
};
