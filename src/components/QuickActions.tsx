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
        <h3 className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider font-mono">Quick Protocol Actions</h3>
        <span className="text-[11px] text-[#A055FF] font-medium font-mono">1-Click Execution</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Create Promise */}
        <button
          onClick={onOpenCreate}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#8335EC] via-[#A055FF] to-[#C084FC] text-white font-extrabold text-xs shadow-glowPurple transition-all active:scale-95 group"
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
              ? 'bg-[#8335EC]/25 border-[#8335EC]/50 text-[#A055FF] shadow-glowPurple'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-[#8335EC]/30 text-[#C4B5FD]'
          }`}
        >
          <ListFilter className="w-4 h-4 text-[#A055FF]" />
          <span>My Promises</span>
        </button>

        {/* Action 3: Verify Condition */}
        <button
          onClick={() => onSelectFilter('VERIFIED')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'VERIFIED'
              ? 'bg-[#8335EC]/25 border-[#8335EC]/50 text-[#C084FC] shadow-glowPurple'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-[#8335EC]/30 text-[#C4B5FD]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C084FC]" />
          <span>Verify Condition</span>
        </button>

        {/* Action 4: Claim Funds */}
        <button
          onClick={() => onSelectFilter('CLAIMABLE')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'CLAIMABLE'
              ? 'bg-[#8335EC]/25 border-[#8335EC]/50 text-[#A055FF] shadow-glowPurple'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-[#8335EC]/30 text-[#C4B5FD]'
          }`}
        >
          <Coins className="w-4 h-4 text-[#A055FF]" />
          <span>Claim Funds</span>
        </button>
      </div>
    </div>
  );
};
