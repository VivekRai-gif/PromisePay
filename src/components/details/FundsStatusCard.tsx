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
    <div className={`relative overflow-hidden rounded-3xl p-6 glass-lime-primary border transition-all duration-500 ${
      isLocked
        ? 'border-[#CFFF00]/40 shadow-glowLime bg-gradient-to-br from-[#10151B] to-[#05070A]'
        : isVerified
        ? 'border-[#19D98B]/40 shadow-glowEmerald bg-gradient-to-br from-[#10151B] to-[#05070A]'
        : 'border-[#8B5CF6]/30 bg-gradient-to-br from-[#10151B] to-[#05070A]'
    }`}>
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none ${
        isLocked
          ? 'bg-[#CFFF00]/15'
          : isVerified
          ? 'bg-[#19D98B]/15'
          : 'bg-[#8B5CF6]/15'
      }`} />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
            {isLocked && <Lock className="w-3.5 h-3.5 text-[#CFFF00] animate-node-pulse" />}
            {isVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#19D98B]" />}
            {isFulfilled && <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />}
            <span className={isLocked ? 'text-[#CFFF00]' : isVerified ? 'text-[#19D98B]' : 'text-[#8B5CF6]'}>
              {isLocked ? 'Locked Funds Escrow' : isVerified ? 'Verified & Claimable' : 'Settled Payout'}
            </span>
          </div>

          <p className="text-xs text-[#9AA4B2] font-medium">
            Funds are secured by PromisePay smart contract on Monad Testnet.
          </p>
        </div>

        {/* Large Amount Display */}
        <div className="bg-[#0C1015]/90 p-3.5 px-5 rounded-2xl border border-white/10 flex items-baseline gap-2 shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#CFFF00] tracking-tight lime-glow">
            {amount.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-[#19D98B]">MON</span>
        </div>
      </div>
    </div>
  );
};
