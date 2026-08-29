import React from 'react';
import { StatsData } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Coins, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  stats: StatsData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-card-highlight shadow-card mb-8">
      {/* Background ambient mauve glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#C66B9B]/20 via-[#4B304F]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-70 h-70 bg-gradient-to-tr from-[#765878]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Card Header & Primary Stat */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E38BB5] tracking-wider uppercase mb-1">
            <Coins className="w-4 h-4 text-[#D95B9A]" />
            <span>PromisePay Overview</span>
          </div>
          <p className="text-[#C8C1C9] text-xs">Total locked native MON funds in smart contracts</p>
        </div>

        {/* Primary Stat Block */}
        <div className="flex items-baseline gap-3 bg-[#121016]/70 p-3.5 px-5 rounded-2xl border border-[#D95B9A]/30 backdrop-blur-md">
          <span className="text-xs text-[#C8C1C9] font-medium">Total Locked:</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {stats.totalLocked.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-[#E38BB5]">MON</span>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Stats */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Stat Item 1: Active Promises */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all">
          <div className="flex items-center justify-between text-[#C8C1C9] mb-2">
            <span className="text-xs font-medium">Active Promises</span>
            <div className="w-7 h-7 rounded-xl bg-[#4B304F]/50 flex items-center justify-center text-[#E38BB5]">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">{stats.activePromises}</span>
          <span className="text-[11px] text-[#E38BB5] font-medium mt-1">Currently locked</span>
        </div>

        {/* Stat Item 2: Fulfilled */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all">
          <div className="flex items-center justify-between text-[#C8C1C9] mb-2">
            <span className="text-xs font-medium">Fulfilled</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">{stats.fulfilled}</span>
          <span className="text-[11px] text-emerald-400 font-medium mt-1">Released successfully</span>
        </div>

        {/* Stat Item 3: Total Promised */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all">
          <div className="flex items-center justify-between text-[#C8C1C9] mb-2">
            <span className="text-xs font-medium">Total Promised</span>
            <div className="w-7 h-7 rounded-xl bg-[#4B304F]/50 flex items-center justify-center text-[#A984C4]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tracking-tight">{stats.totalPromised.toFixed(2)}</span>
            <span className="text-xs text-[#A984C4] font-semibold">MON</span>
          </div>
          <span className="text-[11px] text-[#A984C4] font-medium mt-1">All-time volume</span>
        </div>

        {/* Stat Item 4: Smart Contract */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all">
          <div className="flex items-center justify-between text-[#C8C1C9] mb-2">
            <span className="text-xs font-medium">Smart Contract</span>
            <div className="w-7 h-7 rounded-xl bg-[#342031] flex items-center justify-center text-[#D95B9A]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300">Operational</span>
          </div>
          <span className="text-[11px] text-[#8F8991] font-mono mt-1">PromisePay.sol</span>
        </div>

      </div>
    </div>
  );
};
