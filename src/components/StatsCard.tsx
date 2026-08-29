import React from 'react';
import { StatsData } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Coins, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  stats: StatsData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-protocol-primary shadow-card mb-8">
      {/* Background ambient mauve glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D9579D]/20 via-[#3A1E3B]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#5A2A61]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Card Header & Primary Stat */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E89AC1] tracking-wider uppercase mb-1">
            <Coins className="w-4 h-4 text-[#D9579D]" />
            <span>PromisePay Overview</span>
          </div>
          <p className="text-[#AAA3AF] text-xs">Total locked native MON funds in smart contracts</p>
        </div>

        {/* Primary Stat Block: High Visual Hierarchy for MON */}
        <div className="flex items-baseline gap-3 bg-[#121017]/80 p-4 px-6 rounded-2xl border border-[#D9579D]/40 backdrop-blur-md shadow-glowPink">
          <span className="text-xs text-[#AAA3AF] font-medium">Total Locked:</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mon-glow">
              {stats.totalLocked.toFixed(2)}
            </span>
            <span className="text-sm font-extrabold text-[#E89AC1] font-mono">MON</span>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Stats */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Stat Item 1: Active Promises */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-innerGlow">
          <div className="flex items-center justify-between text-[#AAA3AF] mb-2">
            <span className="text-xs font-medium">Active Promises</span>
            <div className="w-8 h-8 rounded-xl bg-[#3A1E3B] flex items-center justify-center text-[#E89AC1] border border-[#D9579D]/30">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">{stats.activePromises}</span>
          <span className="text-[11px] text-[#E89AC1] font-semibold mt-1">Currently locked</span>
        </div>

        {/* Stat Item 2: Fulfilled */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-innerGlow">
          <div className="flex items-center justify-between text-[#AAA3AF] mb-2">
            <span className="text-xs font-medium">Fulfilled</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">{stats.fulfilled}</span>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1">Released successfully</span>
        </div>

        {/* Stat Item 3: Total Promised */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-innerGlow">
          <div className="flex items-center justify-between text-[#AAA3AF] mb-2">
            <span className="text-xs font-medium">Total Promised</span>
            <div className="w-8 h-8 rounded-xl bg-[#3A1E3B] flex items-center justify-center text-[#A982C4] border border-[#A982C4]/30">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white tracking-tight">{stats.totalPromised.toFixed(2)}</span>
            <span className="text-xs text-[#A982C4] font-bold">MON</span>
          </div>
          <span className="text-[11px] text-[#A982C4] font-semibold mt-1">All-time volume</span>
        </div>

        {/* Stat Item 4: Smart Contract */}
        <div className="flex flex-col p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-innerGlow">
          <div className="flex items-center justify-between text-[#AAA3AF] mb-2">
            <span className="text-xs font-medium">Smart Contract</span>
            <div className="w-8 h-8 rounded-xl bg-[#241426] flex items-center justify-center text-[#D9579D] border border-[#D9579D]/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-node-pulse" />
            <span className="text-xs font-bold text-emerald-300">Operational</span>
          </div>
          <span className="text-[11px] text-[#726B77] font-mono mt-1">PromisePay.sol</span>
        </div>

      </div>
    </div>
  );
};
