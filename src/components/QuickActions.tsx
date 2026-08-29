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
        <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Quick Protocol Actions</h3>
        <span className="text-[11px] text-[#CFFF00] font-medium font-mono">1-Click Execution</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Create Promise */}
        <button
          onClick={onOpenCreate}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#CFFF00] via-[#B8F000] to-[#19D98B] text-[#05070A] font-extrabold text-xs shadow-glowLime transition-all active:scale-95 group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#05070A]/20 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-[#05070A]" />
          </div>
          <span>Create Promise</span>
        </button>

        {/* Action 2: My Promises */}
        <button
          onClick={() => onSelectFilter('ALL')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'ALL'
              ? 'bg-[#CFFF00]/15 border-[#CFFF00]/50 text-[#CFFF00] shadow-glowLime'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-[#9AA4B2]'
          }`}
        >
          <ListFilter className="w-4 h-4 text-[#8B5CF6]" />
          <span>My Promises</span>
        </button>

        {/* Action 3: Verify Condition */}
        <button
          onClick={() => onSelectFilter('VERIFIED')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'VERIFIED'
              ? 'bg-[#19D98B]/15 border-[#19D98B]/50 text-[#19D98B] shadow-glowEmerald'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-[#9AA4B2]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#19D98B]" />
          <span>Verify Condition</span>
        </button>

        {/* Action 4: Claim Funds */}
        <button
          onClick={() => onSelectFilter('CLAIMABLE')}
          className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
            activeFilter === 'CLAIMABLE'
              ? 'bg-[#CFFF00]/15 border-[#CFFF00]/50 text-[#CFFF00] shadow-glowLime'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-[#9AA4B2]'
          }`}
        >
          <Coins className="w-4 h-4 text-[#CFFF00]" />
          <span>Claim Funds</span>
        </button>
      </div>
    </div>
  );
};
