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
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-card mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>On-Chain Timeline</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">Monad Block #1489201</span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all"
          >
            <div className="flex items-center gap-3.5">
              {getActivityIcon(act.type)}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{act.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-mono text-purple-300 font-semibold">{act.amount} MON</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/5 transition-all group"
            >
              <span>{act.txHash}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-purple-400 transition-colors" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
