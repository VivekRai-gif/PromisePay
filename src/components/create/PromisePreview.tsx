import React from 'react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { Sparkles, Lock, ShieldCheck, User } from 'lucide-react';

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
    <div className="relative rounded-3xl p-6 glass-lime-primary border border-[#CFFF00]/30 shadow-card overflow-hidden sticky top-24">
      {/* Background glow orb */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#CFFF00]/15 via-[#19D98B]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-[#CFFF00] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#CFFF00]" />
          <span>Promise Preview</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFFF00]/10 text-[#CFFF00] border border-[#CFFF00]/30 font-mono">
          🔒 Pending Lock
        </span>
      </div>

      {/* Main Preview Content */}
      <div className="space-y-4">
        {/* Amount */}
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-0.5">
            You Promise
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#CFFF00] lime-glow">
              {displayAmount}
            </span>
            <span className="text-base font-bold text-[#19D98B]">MON</span>
          </div>
        </div>

        {/* Recipient */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-1">
            Recipient
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9AA4B2] font-semibold">
            <User className="w-3.5 h-3.5 text-[#CFFF00]" />
            <span>{displayRecipient}</span>
          </div>
        </div>

        {/* Condition */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-1">
            Condition
          </span>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9AA4B2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#19D98B]" />
            <span>{getConditionLabel()}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="p-3 rounded-2xl bg-[#CFFF00]/10 border border-[#CFFF00]/30 text-center">
          <span className="text-xs font-semibold text-[#CFFF00] flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 Funds will be locked in smart contract</span>
          </span>
        </div>
      </div>
    </div>
  );
};
