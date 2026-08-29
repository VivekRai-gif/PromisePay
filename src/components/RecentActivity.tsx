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
          <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-300 border border-purple-400/25 flex items-center justify-center shrink-0">
            <PlusCircle className="w-4 h-4" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-400/25 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="rounded-3xl sm:rounded-4xl p-6 sm:p-8 glass-panel border border-white/12 shadow-frostedCard mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>On-Chain Timeline</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
        </div>
        <span className="text-xs text-slate-400 font-mono bg-white/[0.04] px-3 py-1 rounded-full border border-white/8">
          Monad Block #1489201
        </span>
      </div>

      <div className="space-y-3.5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5">
              {getActivityIcon(act.type)}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{act.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span className="font-mono text-purple-300 font-semibold">{act.amount} MON</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white text-xs font-mono border border-white/8 transition-all group"
            >
              <span>{act.txHash}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-purple-300 transition-colors" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
