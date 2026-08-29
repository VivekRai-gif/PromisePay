import React, { useState } from 'react';
import { PromiseItem, PromiseStatus } from '../types';
import { PromiseCard } from './PromiseCard';
import { Sparkles, Plus, Filter, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ActivePromisesProps {
  promises: PromiseItem[];
  onViewPromise: (promise: PromiseItem) => void;
  onClaimPromise: (promise: PromiseItem) => void;
  onVerifyPromise: (promise: PromiseItem) => void;
  onOpenCreate: () => void;
  activeFilterTab: string;
  setActiveFilterTab: (filter: string) => void;
}

export const ActivePromises: React.FC<ActivePromisesProps> = ({
  promises,
  onViewPromise,
  onClaimPromise,
  onVerifyPromise,
  onOpenCreate,
  activeFilterTab,
  setActiveFilterTab,
}) => {
  const filteredPromises = promises.filter((p) => {
    if (activeFilterTab === 'ALL') return true;
    if (activeFilterTab === 'LOCKED') return p.status === 'LOCKED';
    if (activeFilterTab === 'VERIFIED') return p.status === 'VERIFIED';
    if (activeFilterTab === 'CLAIMABLE') return p.status === 'VERIFIED';
    if (activeFilterTab === 'FULFILLED') return p.status === 'FULFILLED';
    return true;
  });

  return (
    <section className="mb-12">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Active Commitments</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Promises On-Chain
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'ALL'
                ? 'bg-purple-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            All ({promises.length})
          </button>
          <button
            onClick={() => setActiveFilterTab('LOCKED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'LOCKED'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            🔒 Locked
          </button>
          <button
            onClick={() => setActiveFilterTab('VERIFIED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'VERIFIED'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            ✓ Verified
          </button>
          <button
            onClick={() => setActiveFilterTab('FULFILLED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'FULFILLED'
                ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            🔓 Fulfilled
          </button>
        </div>
      </div>

      {/* Grid of Promises */}
      {filteredPromises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPromises.map((promise) => (
            <PromiseCard
              key={promise.id}
              promise={promise}
              onView={onViewPromise}
              onClaim={onClaimPromise}
              onVerify={onVerifyPromise}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No promises match this filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            Create a new promise to lock MON native tokens behind your condition.
          </p>
          <button
            onClick={onOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-glow transition-all"
          >
            + Create Promise
          </button>
        </div>
      )}
    </section>
  );
};
