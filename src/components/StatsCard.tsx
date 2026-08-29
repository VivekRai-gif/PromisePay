import React from 'react';
import { StatsData } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Coins, TrendingUp, Activity, ArrowRight, Radar } from 'lucide-react';

interface StatsCardProps {
  stats: StatsData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-eye-primary shadow-card mb-8">
      {/* Background ambient soft glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#A3E635]/12 via-[#10B981]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Card Header & Primary Stat (Matches Reference Image) */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#A3E635] tracking-wider uppercase mb-1">
            <Coins className="w-4 h-4 text-[#A3E635]" />
            <span>PROMISEPAY OVERVIEW</span>
          </div>
          <p className="text-[#94A3B8] text-xs font-medium">
            Total locked native MON funds in smart contracts
          </p>
        </div>

        {/* Primary Stat Block: Total Locked 24.50 MON with sparkline */}
        <div className="flex items-center gap-4 bg-[#0A0E17]/90 p-4 px-6 rounded-2xl border border-[#A3E635]/35 backdrop-blur-md shadow-glowLime">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#94A3B8] font-medium">Total Locked:</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mon-glow font-sans">
              {stats.totalLocked.toFixed(2)}
            </span>
            <span className="text-sm font-extrabold text-[#A3E635] font-mono">MON</span>
          </div>

          {/* SVG Sparkline Graph */}
          <svg className="w-16 h-8 text-[#A3E635]" viewBox="0 0 60 25" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M0 20 L15 12 L30 18 L45 5 L60 10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Grid of 4 Secondary Stats (Matches Reference Image) */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Stat Item 1: Active Promises */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all shadow-innerLight group">
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-semibold">Active Promises</span>
            <Lock className="w-4 h-4 text-[#A3E635]" />
          </div>

          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{stats.activePromises}</span>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#A3E635]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 15 Q 12 0, 25 15 T 50 15" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#A3E635] font-medium mt-3 flex items-center gap-1 group-hover:underline">
            <span>View all active promises</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Stat Item 2: Fulfilled Promises */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all shadow-innerLight group">
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-semibold">Fulfilled Promises</span>
            <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
          </div>

          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{stats.fulfilled}</span>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#8B5CF6]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 10 Q 12 20, 25 5 T 50 10" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#8B5CF6] font-medium mt-3 flex items-center gap-1 group-hover:underline">
            <span>View fulfilled promises</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Stat Item 3: Total Value Locked */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all shadow-innerLight">
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-semibold">Total Value Locked</span>
            <Lock className="w-4 h-4 text-[#F59E0B]" />
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white tracking-tight">{stats.totalPromised.toFixed(2)}</span>
              <span className="text-xs font-bold text-[#F59E0B]">MON</span>
            </div>
            {/* Wave graph */}
            <svg className="w-16 h-6 text-[#F59E0B]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 18 L15 8 L30 14 L50 2" strokeLinecap="round" />
            </svg>
          </div>

          <span className="text-[11px] text-[#64748B] font-medium mt-3">Across all contracts</span>
        </div>

        {/* Stat Item 4: Smart Contract Status */}
        <div className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all shadow-innerLight">
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-semibold">Smart Contract</span>
            <Radar className="w-4 h-4 text-[#10B981]" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-node-ping" />
                <span className="text-xs font-extrabold text-[#10B981]">Operational</span>
              </div>
              <span className="text-[11px] text-[#64748B] block mt-1">All systems normal</span>
            </div>

            {/* Radar Circle */}
            <div className="w-10 h-10 rounded-full border border-[#10B981]/40 flex items-center justify-center bg-[#10B981]/10">
              <div className="w-4 h-4 rounded-full border border-[#10B981] animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
