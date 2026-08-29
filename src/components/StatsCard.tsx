import React from 'react';
import { StatsData } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Coins, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  stats: StatsData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl p-6 sm:p-8 glass-panel border border-white/12 shadow-frostedCard mb-8">
      {/* Ambient glass background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-600/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Card Header & Primary Stat */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 tracking-wider uppercase mb-1">
            <Coins className="w-4 h-4 text-pink-400" />
            <span>PromisePay Overview</span>
          </div>
          <p className="text-slate-400 text-xs">Total locked native MON funds in smart contracts</p>
        </div>

        {/* Primary Stat Block */}
        <div className="flex items-baseline gap-3 bg-white/[0.04] p-4 px-6 rounded-2xl border border-purple-400/30 backdrop-blur-xl shadow-inner">
          <span className="text-xs text-slate-300 font-medium">Total Locked:</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 tracking-tight">
              {stats.totalLocked.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-purple-300">MON</span>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Stats */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Stat Item 1: Active Promises */}
        <div className="flex flex-col p-4.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Promises</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-300 border border-amber-500/20">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">{stats.activePromises}</span>
          <span className="text-[11px] text-amber-300/90 font-medium mt-1">Currently locked</span>
        </div>

        {/* Stat Item 2: Fulfilled */}
        <div className="flex flex-col p-4.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Fulfilled</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-300 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">{stats.fulfilled}</span>
          <span className="text-[11px] text-emerald-300/90 font-medium mt-1">Released successfully</span>
        </div>

        {/* Stat Item 3: Total Promised */}
        <div className="flex flex-col p-4.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Promised</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-300 border border-purple-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tracking-tight">{stats.totalPromised.toFixed(2)}</span>
            <span className="text-xs text-purple-300 font-semibold">MON</span>
          </div>
          <span className="text-[11px] text-purple-300/90 font-medium mt-1">All-time volume</span>
        </div>

        {/* Stat Item 4: Monad Health */}
        <div className="flex flex-col p-4.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Smart Contract</span>
            <div className="w-8 h-8 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-300 border border-pink-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300">Operational</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1">PromisePay.sol</span>
        </div>

      </div>
    </div>
  );
};
