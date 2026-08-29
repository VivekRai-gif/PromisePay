import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { ArrowLeft, Activity, Clock, ExternalLink, PlusCircle, ShieldCheck, ArrowUpRight, Filter } from 'lucide-react';

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
          <div className="w-9 h-9 rounded-xl bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/30 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#4B304F]/60 text-[#A982C4] border border-[#A982C4]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#AAA3AF] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#E89AC1] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Activity Timeline
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/30 font-mono">
                Live Monad Logs
              </span>
            </div>
            <p className="text-xs text-[#AAA3AF] font-medium">
              Real-time on-chain transaction activity on Monad Testnet
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'ALL'
                  ? 'bg-gradient-to-r from-[#D9579D] to-[#A982C4] text-white shadow-glowPink'
                  : 'text-[#8F8991] hover:text-white'
              }`}
            >
              All ({activities.length})
            </button>
            <button
              onClick={() => setFilter('created')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'created'
                  ? 'bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/30'
                  : 'text-[#8F8991] hover:text-white'
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'verified'
                  ? 'bg-[#4B304F] text-[#A982C4] border border-[#A982C4]/30'
                  : 'text-[#8F8991] hover:text-white'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter('claimed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'claimed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-[#8F8991] hover:text-white'
              }`}
            >
              Claimed
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="rounded-3xl p-6 sm:p-8 glass-protocol-primary border border-white/12 shadow-card space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121017]/70 hover:bg-white/[0.06] border border-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                {getActivityIcon(act.type)}
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{act.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#AAA3AF]">
                    <span className="font-mono text-[#E89AC1] font-bold">{act.amount} MON</span>
                    <span className="text-[#726B77]">•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#AAA3AF]" />
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`https://testnet.monadexplorer.com/tx/${act.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C8C1C9] hover:text-white text-xs font-mono border border-white/10 transition-all self-start sm:self-center group"
              >
                <span>{act.txHash}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8F8991] group-hover:text-[#D9579D] transition-colors" />
              </a>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-[#AAA3AF] text-xs font-mono">
            No transaction activities found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};
