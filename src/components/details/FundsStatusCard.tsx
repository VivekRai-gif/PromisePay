import React from 'react';
import { Lock, ShieldCheck, CheckCircle2, Coins, Sparkles } from 'lucide-react';
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
        ? 'border-amber-500/40 shadow-glow'
        : isVerified
        ? 'border-emerald-500/40 shadow-glowEmerald'
        : 'border-purple-500/30'
    }`}>
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
        isLocked
          ? 'bg-amber-500/15'
          : isVerified
          ? 'bg-emerald-500/15'
          : 'bg-purple-500/15'
      }`} />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
            {isLocked && <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            {isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            {isFulfilled && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
            <span className={isLocked ? 'text-amber-300' : isVerified ? 'text-emerald-300' : 'text-purple-300'}>
              {isLocked ? 'Locked Funds Escrow' : isVerified ? 'Verified & Claimable' : 'Settled Payout'}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            Funds are secured by PromisePay smart contract on Monad Testnet.
          </p>
        </div>

        {/* Large Amount Display */}
        <div className="bg-white/[0.04] p-3.5 px-5 rounded-2xl border border-white/10 flex items-baseline gap-2 shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {amount.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-purple-400">MON</span>
        </div>
      </div>
    </div>
  );
};
