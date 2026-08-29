import React from 'react';
import { ActivityItem } from '../types';
import { Clock, ExternalLink, PlusCircle, ShieldCheck, ArrowUpRight, Activity, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#8335EC]/20 text-[#A055FF] border border-[#8335EC]/40 flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#8335EC]/20 text-[#8B5CF6] border border-[#8335EC]/40 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
    }
  };

  const renderStatusBadge = (status?: ActivityItem['status']) => {
    const activeStatus = status || 'SUCCESS';
    switch (activeStatus) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 font-mono">
            <CheckCircle2 className="w-2.5 h-2.5 text-[#C084FC]" />
            <span>Success</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono">
            <AlertCircle className="w-2.5 h-2.5 text-rose-400" />
            <span>Failed</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
            <Loader2 className="w-2.5 h-2.5 text-amber-300 animate-spin" />
            <span>Pending</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-eye-primary border border-[#8335EC]/30 shadow-card mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#A055FF] uppercase tracking-wider mb-1 font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>On-Chain Timeline</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
        </div>
        <span className="text-xs text-[#8B5CF6] font-mono">Monad Block #1489201</span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#07040D]/80 hover:bg-white/[0.05] border border-[#8335EC]/25 transition-all shadow-innerLight"
          >
            <div className="flex items-center gap-3.5">
              {getActivityIcon(act.type)}
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{act.title}</h4>
                  {renderStatusBadge(act.status)}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#C4B5FD]">
                  <span className="font-mono text-[#A055FF] font-extrabold">{act.amount} MON</span>
                  <span className="text-[#8B5CF6]">•</span>
                  <span className="flex items-center gap-1 text-[#C4B5FD]">
                    <Clock className="w-3 h-3 text-[#C4B5FD]" />
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C4B5FD] hover:text-white text-xs font-mono border border-[#8335EC]/30 transition-all group"
            >
              <span>{act.txHash}</span>
              <ExternalLink className="w-3 h-3 text-[#8B5CF6] group-hover:text-[#A055FF] transition-colors" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
