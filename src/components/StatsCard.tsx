import React from 'react';
import { StatsData } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Coins, TrendingUp, Activity, ArrowRight, Radar } from 'lucide-react';

interface StatsCardProps {
  stats: StatsData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-eye-primary border border-[#8335EC]/35 shadow-glowPurple mb-8">
      {/* Background ambient soft glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8335EC]/20 via-[#A055FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Card Header & Primary Stat */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#A055FF] tracking-wider uppercase mb-1 font-mono">
            <Coins className="w-4 h-4 text-[#A055FF]" />
            <span>PROMISEPAY OVERVIEW</span>
          </div>
          <p className="text-[#C4B5FD] text-xs font-medium">
            Total locked native MON funds in smart contracts
          </p>
        </div>

        {/* Primary Stat Block */}
        <div className="flex items-center gap-4 bg-[#130924]/90 p-4 px-6 rounded-2xl border border-[#8335EC]/45 backdrop-blur-md shadow-glowPurple">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#C4B5FD] font-medium">Total Locked:</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight lime-text-glow font-sans">
              {stats.totalLocked.toFixed(2)}
            </span>
            <span className="text-sm font-extrabold text-[#A055FF] font-mono">MON</span>
          </div>

          {/* SVG Sparkline Graph */}
          <svg className="w-16 h-8 text-[#A055FF]" viewBox="0 0 60 25" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M0 20 L15 12 L30 18 L45 5 L60 10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Grid of 4 Secondary Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Stat Item 1: Active Promises */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#8335EC]/30 transition-all shadow-innerLight group">
          <div className="flex items-center justify-between text-[#C4B5FD] mb-2">
            <span className="text-xs font-semibold">Active Promises</span>
            <Lock className="w-4 h-4 text-[#A055FF]" />
          </div>

          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{stats.activePromises}</span>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#A055FF]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 15 Q 12 0, 25 15 T 50 15" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#A055FF] font-medium mt-3 flex items-center gap-1 group-hover:underline">
            <span>View all active promises</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Stat Item 2: Fulfilled Promises */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#8335EC]/30 transition-all shadow-innerLight group">
          <div className="flex items-center justify-between text-[#C4B5FD] mb-2">
            <span className="text-xs font-semibold">Fulfilled Promises</span>
            <CheckCircle2 className="w-4 h-4 text-[#C084FC]" />
          </div>

          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{stats.fulfilled}</span>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#C084FC]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 10 Q 12 20, 25 5 T 50 10" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#C084FC] font-medium mt-3 flex items-center gap-1 group-hover:underline">
            <span>View fulfilled promises</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Stat Item 3: Total Value Locked */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#8335EC]/30 transition-all shadow-innerLight">
          <div className="flex items-center justify-between text-[#C4B5FD] mb-2">
            <span className="text-xs font-semibold">Total Value Locked</span>
            <Lock className="w-4 h-4 text-[#A055FF]" />
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white tracking-tight">{stats.totalPromised.toFixed(2)}</span>
              <span className="text-xs font-bold text-[#A055FF]">MON</span>
            </div>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#A055FF]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 18 L15 8 L30 14 L50 2" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#8B5CF6] font-medium mt-3">Across all contracts</span>
        </div>

        {/* Stat Item 4: Smart Contract Status */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#8335EC]/30 transition-all shadow-innerLight">
          <div className="flex items-center justify-between text-[#C4B5FD] mb-2">
            <span className="text-xs font-semibold">Smart Contract</span>
            <Radar className="w-4 h-4 text-[#C084FC]" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A055FF] animate-node-ping" />
                <span className="text-xs font-extrabold text-[#A055FF]">Operational</span>
              </div>
              <span className="text-[11px] text-[#8B5CF6] block mt-1">All systems normal</span>
            </div>

            {/* Radar Circle */}
            <div className="w-10 h-10 rounded-full border border-[#8335EC]/50 flex items-center justify-center bg-[#8335EC]/15">
              <div className="w-4 h-4 rounded-full border border-[#A055FF] animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
