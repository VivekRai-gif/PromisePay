import React from 'react';
import { Plus, ListFilter, ShieldCheck, Coins } from 'lucide-react';

interface QuickActionsProps {
  onOpenCreate: () => void;
  onSelectFilter: (filter: string) => void;
  activeFilter: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenCreate,
  onSelectFilter,
  activeFilter,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold text-[#726B77] uppercase tracking-wider">Quick Protocol Actions</h3>
        <span className="text-[11px] text-[#E89AC1] font-medium font-mono">1-Click Execution</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Create Promise */}
        <button
          onClick={onOpenCreate}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#D9579D] via-[#E89AC1] to-[#A982C4] text-white font-bold text-xs shadow-glowPink transition-all active:scale-95 group"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Create Promise</span>
        </button>

        {/* Action 2: My Promises */}
        <button
          onClick={() => onSelectFilter('ALL')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'ALL'
              ? 'bg-[#3A1E3B] border-[#D9579D]/50 text-white shadow-glowPink'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#AAA3AF]'
          }`}
        >
          <ListFilter className="w-4 h-4 text-[#A982C4]" />
          <span>My Promises</span>
        </button>

        {/* Action 3: Verify Condition */}
        <button
          onClick={() => onSelectFilter('VERIFIED')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'VERIFIED'
              ? 'bg-[#5A2A61]/80 border-[#E89AC1]/50 text-[#E89AC1] shadow-glowPink'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#AAA3AF]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#E89AC1]" />
          <span>Verify Condition</span>
        </button>

        {/* Action 4: Claim Funds */}
        <button
          onClick={() => onSelectFilter('CLAIMABLE')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'CLAIMABLE'
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200 shadow-glowEmerald'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#AAA3AF]'
          }`}
        >
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>Claim Funds</span>
        </button>
      </div>
    </div>
  );
};
