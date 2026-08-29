import React from 'react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { Sparkles, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';

interface PromisePreviewProps {
  recipient: string;
  amount: string;
  promiseType: PromiseTypeKey;
  unlockDate: string;
  customConditionText: string;
}

export const PromisePreview: React.FC<PromisePreviewProps> = ({
  recipient,
  amount,
  promiseType,
  unlockDate,
  customConditionText,
}) => {
  const displayAmount = parseFloat(amount) > 0 ? amount : '1';
  const displayRecipient =
    recipient.length >= 10
      ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}`
      : recipient || '0x82...A91C';

  const getConditionLabel = () => {
    if (promiseType === 'date') {
      return `Unlock on ${unlockDate || '29 August 2026'}`;
    }
    if (promiseType === 'graduation') {
      return customConditionText ? `Graduation (${customConditionText})` : 'Graduation Verification';
    }
    return 'Condition Fulfillment';
  };

  return (
    <div className="relative rounded-3xl p-6 glass-panel border border-purple-500/30 shadow-card overflow-hidden sticky top-24">
      {/* Background glow orb */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Promise Preview</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          🔒 Pending Lock
        </span>
      </div>

      {/* Main Preview Content */}
      <div className="space-y-4">
        {/* Amount */}
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-0.5">
            You Promise
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200">
              {displayAmount}
            </span>
            <span className="text-base font-bold text-purple-400">MON</span>
          </div>
        </div>

        {/* Recipient */}
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
            Recipient
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-200 font-semibold">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>{displayRecipient}</span>
          </div>
        </div>

        {/* Condition */}
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
            Condition
          </span>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{getConditionLabel()}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-center">
          <span className="text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 Funds will be locked in smart contract</span>
          </span>
        </div>
      </div>
    </div>
  );
};
