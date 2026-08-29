import React from 'react';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PromiseStatus } from '../../types';

interface FundsStatusCardProps {
  amount: number;
  status: PromiseStatus;
}

export const FundsStatusCard: React.FC<FundsStatusCardProps> = ({ amount, status }) => {
  const isLocked = status === 'LOCKED';
  const isVerified = status === 'VERIFIED' || status === 'CLAIMABLE';
  const isFulfilled = status === 'FULFILLED';

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 glass-panel border transition-all duration-500 ${
      isLocked
        ? 'border-[#D95B9A]/40 shadow-glowPink bg-gradient-to-br from-[#342031] to-[#151118]'
        : isVerified
        ? 'border-emerald-500/40 shadow-glowEmerald bg-gradient-to-br from-emerald-950/40 to-[#121016]'
        : 'border-[#A984C4]/30 bg-gradient-to-br from-[#211722] to-[#121016]'
    }`}>
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none ${
        isLocked
          ? 'bg-[#D95B9A]/20'
          : isVerified
          ? 'bg-emerald-500/15'
          : 'bg-[#A984C4]/20'
      }`} />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
            {isLocked && <Lock className="w-3.5 h-3.5 text-[#E38BB5] animate-pulse" />}
            {isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            {isFulfilled && <CheckCircle2 className="w-3.5 h-3.5 text-[#A984C4]" />}
            <span className={isLocked ? 'text-[#E38BB5]' : isVerified ? 'text-emerald-300' : 'text-[#A984C4]'}>
              {isLocked ? 'Locked Funds Escrow' : isVerified ? 'Verified & Claimable' : 'Settled Payout'}
            </span>
          </div>

          <p className="text-xs text-[#C8C1C9] font-medium">
            Funds are secured by PromisePay smart contract on Monad Testnet.
          </p>
        </div>

        {/* Large Amount Display */}
        <div className="bg-[#121016]/80 p-3.5 px-5 rounded-2xl border border-white/10 flex items-baseline gap-2 shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {amount.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-[#E38BB5]">MON</span>
        </div>
      </div>
    </div>
  );
};
