import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { ArrowLeft, Clock, ExternalLink, PlusCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
          <div className="w-9 h-9 rounded-xl bg-[#CFFF00]/10 text-[#CFFF00] border border-[#CFFF00]/30 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
        );
      case 'verified':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#19D98B]/15 text-[#19D98B] border border-[#19D98B]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        );
      case 'claimed':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 flex items-center justify-center">
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
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#CFFF00] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Activity Timeline
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFFF00]/10 text-[#CFFF00] border border-[#CFFF00]/30 font-mono">
                Live Monad Logs
              </span>
            </div>
            <p className="text-xs text-[#9AA4B2] font-medium">
              Real-time on-chain transaction activity on Monad Testnet
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'ALL'
                  ? 'bg-gradient-to-r from-[#CFFF00] to-[#19D98B] text-[#05070A] shadow-glowLime'
                  : 'text-[#64748B] hover:text-white'
              }`}
            >
              All ({activities.length})
            </button>
            <button
              onClick={() => setFilter('created')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'created'
                  ? 'bg-[#CFFF00]/15 text-[#CFFF00] border border-[#CFFF00]/30'
                  : 'text-[#64748B] hover:text-white'
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'verified'
                  ? 'bg-[#19D98B]/15 text-[#19D98B] border border-[#19D98B]/30'
                  : 'text-[#64748B] hover:text-white'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter('claimed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'claimed'
                  ? 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30'
                  : 'text-[#64748B] hover:text-white'
              }`}
            >
              Claimed
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="rounded-3xl p-6 sm:p-8 glass-lime-primary border border-white/12 shadow-card space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0C1015]/70 hover:bg-white/[0.05] border border-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                {getActivityIcon(act.type)}
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{act.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#9AA4B2]">
                    <span className="font-mono text-[#CFFF00] font-bold">{act.amount} MON</span>
                    <span className="text-[#64748B]">•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#9AA4B2]" />
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`https://testnet.monadexplorer.com/tx/${act.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-white text-xs font-mono border border-white/10 transition-all self-start sm:self-center group"
              >
                <span>{act.txHash}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#CFFF00] transition-colors" />
              </a>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-[#9AA4B2] text-xs font-mono">
            No transaction activities found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};
