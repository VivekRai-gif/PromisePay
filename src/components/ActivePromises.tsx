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
          <div className="flex items-center gap-2 text-xs font-bold text-[#A055FF] uppercase tracking-wider mb-1 font-mono">
            <Lock className="w-3.5 h-3.5 text-[#A055FF]" />
            <span>Active Commitments</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Promises On-Chain
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-[#8335EC]/30 overflow-x-auto">
          <button
            onClick={() => setActiveFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilterTab === 'ALL'
                ? 'bg-gradient-to-r from-[#8335EC] to-[#A055FF] text-white shadow-glowPurple'
                : 'text-[#C4B5FD] hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            All ({promises.length})
          </button>
          <button
            onClick={() => setActiveFilterTab('LOCKED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilterTab === 'LOCKED'
                ? 'bg-[#8335EC]/25 text-[#A055FF] border border-[#8335EC]/40 shadow-glowPurple'
                : 'text-[#C4B5FD] hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            🔒 Locked
          </button>
          <button
            onClick={() => setActiveFilterTab('VERIFIED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilterTab === 'VERIFIED'
                ? 'bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 shadow-glowPurple'
                : 'text-[#C4B5FD] hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            ✓ Verified
          </button>
          <button
            onClick={() => setActiveFilterTab('FULFILLED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilterTab === 'FULFILLED'
                ? 'bg-[#8335EC]/20 text-[#8B5CF6] border border-[#8335EC]/30'
                : 'text-[#C4B5FD] hover:text-white hover:bg-white/[0.05]'
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
        <div className="p-12 text-center rounded-3xl glass-eye-primary border border-[#8335EC]/30">
          <div className="w-12 h-12 rounded-2xl bg-[#8335EC]/20 text-[#A055FF] flex items-center justify-center mx-auto mb-4 border border-[#8335EC]/40">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No promises match this filter</h3>
          <p className="text-xs text-[#C4B5FD] max-w-sm mx-auto mb-6">
            Create a new promise to lock MON native tokens behind your condition.
          </p>
          <button
            onClick={onOpenCreate}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8335EC] via-[#A055FF] to-[#C084FC] text-white font-extrabold text-xs shadow-glowPurple transition-all"
          >
            + Create Promise
          </button>
        </div>
      )}
    </section>
  );
};
