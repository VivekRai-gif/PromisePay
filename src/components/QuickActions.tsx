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
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
        <span className="text-[11px] text-purple-400 font-medium">1-Click Operations</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Create Promise */}
        <button
          onClick={onOpenCreate}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-glow transition-all active:scale-95 group"
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
              ? 'bg-purple-950/50 border-purple-500/50 text-white shadow-glow'
              : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-300'
          }`}
        >
          <ListFilter className="w-4 h-4 text-purple-400" />
          <span>My Promises</span>
        </button>

        {/* Action 3: Verify Condition */}
        <button
          onClick={() => onSelectFilter('VERIFIED')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'VERIFIED'
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-200 shadow-glow'
              : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Verify Condition</span>
        </button>

        {/* Action 4: Claim Funds */}
        <button
          onClick={() => onSelectFilter('CLAIMABLE')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'CLAIMABLE'
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200 shadow-glowEmerald'
              : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-300'
          }`}
        >
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>Claim Funds</span>
        </button>
      </div>
    </div>
  );
};
