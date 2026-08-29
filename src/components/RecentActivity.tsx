import React from 'react';
import { ActivityItem } from '../types';
import { Clock, ExternalLink, PlusCircle, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#CFFF00]/10 text-[#CFFF00] border border-[#CFFF00]/30 flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#19D98B]/15 text-[#19D98B] border border-[#19D98B]/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-lime-primary border border-white/10 shadow-card mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#CFFF00] uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>On-Chain Timeline</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
        </div>
        <span className="text-xs text-[#64748B] font-mono">Monad Block #1489201</span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0C1015]/70 hover:bg-white/[0.05] border border-white/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              {getActivityIcon(act.type)}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{act.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-[#9AA4B2]">
                  <span className="font-mono text-[#CFFF00] font-bold">{act.amount} MON</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="flex items-center gap-1 text-[#9AA4B2]">
                    <Clock className="w-3 h-3 text-[#9AA4B2]" />
                    {act.timestamp}
                  </span>
                </div>
              </div>
            </div>

            {/* Tx Hash badge */}
            <a
              href={`https://testnet.monadexplorer.com/tx/${act.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-white text-xs font-mono border border-white/10 transition-all group"
            >
              <span>{act.txHash}</span>
              <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-[#CFFF00] transition-colors" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
