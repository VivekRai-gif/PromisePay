import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { ArrowLeft, Clock, ExternalLink, PlusCircle, ShieldCheck, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ActivityPageProps {
  activities: ActivityItem[];
  onBack: () => void;
}

export const ActivityPage: React.FC<ActivityPageProps> = ({ activities, onBack }) => {
  const [filter, setFilter] = useState<'ALL' | 'created' | 'verified' | 'claimed'>('ALL');

  const filteredActivities = activities.filter((act) => {
    if (filter === 'ALL') return true;
    return act.type === filter;
  });

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#8335EC]/20 text-[#A055FF] border border-[#8335EC]/40 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#8335EC]/20 text-[#8B5CF6] border border-[#8335EC]/40 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        );
    }
  };

  const renderStatusBadge = (status?: ActivityItem['status']) => {
    const activeStatus = status || 'SUCCESS';
    switch (activeStatus) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 font-mono shadow-innerLight">
            <CheckCircle2 className="w-3 h-3 text-[#C084FC]" />
            <span>Success</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono shadow-innerLight">
            <AlertCircle className="w-3 h-3 text-rose-400" />
            <span>Failed</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono shadow-innerLight">
            <Loader2 className="w-3 h-3 text-amber-300 animate-spin" />
            <span>Pending</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C4B5FD] hover:text-white border border-[#8335EC]/30 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#A055FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Activity Timeline
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8335EC]/20 text-[#A055FF] border border-[#8335EC]/40 font-mono">
                Live Monad Logs
              </span>
            </div>
            <p className="text-xs text-[#C4B5FD] font-medium">
              Real-time on-chain transaction execution & confirmation status on Monad Testnet
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-[#8335EC]/30">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'ALL'
                  ? 'bg-gradient-to-r from-[#8335EC] to-[#A055FF] text-white shadow-glowPurple'
                  : 'text-[#8B5CF6] hover:text-white'
              }`}
            >
              All ({activities.length})
            </button>
            <button
              onClick={() => setFilter('created')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'created'
                  ? 'bg-[#8335EC]/25 text-[#A055FF] border border-[#8335EC]/40'
                  : 'text-[#8B5CF6] hover:text-white'
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'verified'
                  ? 'bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40'
                  : 'text-[#8B5CF6] hover:text-white'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter('claimed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'claimed'
                  ? 'bg-[#8335EC]/20 text-[#8B5CF6] border border-[#8335EC]/30'
                  : 'text-[#8B5CF6] hover:text-white'
              }`}
            >
              Claimed
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="rounded-3xl p-6 sm:p-8 glass-eye-primary border border-[#8335EC]/35 shadow-card space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#07040D]/80 hover:bg-white/[0.05] border border-[#8335EC]/25 transition-all shadow-innerLight"
            >
              <div className="flex items-center gap-4">
                {getActivityIcon(act.type)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white tracking-tight">{act.title}</h4>
                    {renderStatusBadge(act.status)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                    <span className="font-mono text-[#A055FF] font-extrabold">{act.amount} MON</span>
                    <span className="text-[#8B5CF6]">•</span>
                    <span className="flex items-center gap-1 font-mono text-[#C4B5FD]">
                      <Clock className="w-3.5 h-3.5 text-[#C4B5FD]" />
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`https://testnet.monadexplorer.com/tx/${act.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C4B5FD] hover:text-white text-xs font-mono border border-[#8335EC]/30 transition-all self-start sm:self-center group"
              >
                <span>{act.txHash}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:text-[#A055FF] transition-colors" />
              </a>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-[#8B5CF6] text-xs font-mono">
            No transaction activities found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};
