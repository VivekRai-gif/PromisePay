import React from 'react';
import { PromiseItem } from '../types';
import { PromiseCard } from './PromiseCard';
import { Sparkles, Lock } from 'lucide-react';

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
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Active Commitments</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Promises On-Chain
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 overflow-x-auto backdrop-blur-xl">
          <button
            onClick={() => setActiveFilterTab('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-mauveGlow'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            All ({promises.length})
          </button>
          <button
            onClick={() => setActiveFilterTab('LOCKED')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'LOCKED'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            🔒 Locked
          </button>
          <button
            onClick={() => setActiveFilterTab('VERIFIED')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'VERIFIED'
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            ✓ Verified
          </button>
          <button
            onClick={() => setActiveFilterTab('FULFILLED')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilterTab === 'FULFILLED'
                ? 'bg-purple-950/70 text-purple-200 border border-purple-400/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
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
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-300 flex items-center justify-center mx-auto mb-4 border border-purple-400/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No promises match this filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            Create a new promise to lock MON native tokens behind your condition.
          </p>
          <button
            onClick={onOpenCreate}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs shadow-mauveGlow transition-all"
          >
            + Create Promise
          </button>
        </div>
      )}
    </section>
  );
};
