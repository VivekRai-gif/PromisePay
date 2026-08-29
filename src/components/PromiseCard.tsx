import React from 'react';
import { PromiseItem } from '../types';
import { Lock, ShieldCheck, CheckCircle2, ArrowUpRight, ExternalLink, Clock } from 'lucide-react';

interface PromiseCardProps {
  promise: PromiseItem;
  onView: (promise: PromiseItem) => void;
  onClaim: (promise: PromiseItem) => void;
  onVerify: (promise: PromiseItem) => void;
}

export const PromiseCard: React.FC<PromiseCardProps> = ({
  promise,
  onView,
  onClaim,
  onVerify,
}) => {
  const isHighValue = promise.amount >= 10;

  // Render status badge based on status
  const renderStatusBadge = () => {
    switch (promise.status) {
      case 'LOCKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8335EC]/20 text-[#A055FF] border border-[#8335EC]/40 badge-glow-lime font-mono">
            <Lock className="w-3.5 h-3.5 text-[#A055FF]" />
            <span>🔒 Locked</span>
          </span>
        );
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#A055FF]/20 text-[#C084FC] border border-[#A055FF]/40 badge-glow-emerald font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>✓ Verified</span>
          </span>
        );
      case 'FULFILLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8335EC]/20 text-[#8B5CF6] border border-[#8335EC]/30 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🔓 Fulfilled</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative group rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 ${
      isHighValue
        ? 'glass-eye-primary border border-[#8335EC]/40 hover:border-[#A055FF]/60 shadow-glowPurple'
        : 'glass-eye-card border border-[#8335EC]/25 hover:border-[#A055FF]/40'
    }`}>
      {/* Background ambient glow effect on hover */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#8335EC]/20 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#A055FF]/30 transition-all" />

      {/* Card Top: Title & Status */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#A055FF] transition-colors">
            {promise.title}
          </h3>
          {renderStatusBadge()}
        </div>

        {/* Condition Box */}
        <div className="p-3.5 rounded-2xl bg-[#07040D]/80 border border-[#8335EC]/30 mb-4">
          <div className="text-[11px] font-semibold uppercase text-[#8B5CF6] tracking-wider mb-1 font-mono">
            Condition Criteria
          </div>
          <div className="text-sm font-semibold text-[#C4B5FD] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A055FF] animate-node-ping"></span>
            <span>{promise.condition}</span>
          </div>
        </div>

        {/* Amount & Recipient */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-[#8335EC]/30">
            <span className="text-[10px] text-[#8B5CF6] font-medium block">Amount Locked</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#A055FF] lime-text-glow font-mono">{promise.amount}</span>
              <span className="text-xs font-bold text-[#C084FC] font-mono">MON</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-[#8335EC]/30">
            <span className="text-[10px] text-[#8B5CF6] font-medium block">Recipient</span>
            <span className="text-xs font-mono text-[#C4B5FD] font-semibold block mt-1 truncate">
              {promise.recipient}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-[#8B5CF6] font-mono">
          <Clock className="w-3 h-3 text-[#C4B5FD]" />
          <span>{promise.createdAt}</span>
        </div>

        {/* Dynamic Action Buttons based on status */}
        {promise.status === 'VERIFIED' ? (
          <button
            onClick={() => onClaim(promise)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8335EC] via-[#A055FF] to-[#C084FC] hover:opacity-95 text-white font-extrabold text-xs shadow-glowPurple transition-all active:scale-95"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span>Claim MON</span>
          </button>
        ) : promise.status === 'LOCKED' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVerify(promise)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#8335EC]/20 hover:bg-[#8335EC]/35 text-[#A055FF] border border-[#8335EC]/40 text-xs font-semibold transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>Verify</span>
            </button>

            <button
              onClick={() => onView(promise)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-[#C4B5FD] hover:text-white text-xs font-semibold transition-all"
            >
              <span>View</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => onView(promise)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C4B5FD] hover:text-white text-xs font-semibold border border-white/10 transition-all"
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3 text-[#8B5CF6]" />
          </button>
        )}
      </div>
    </div>
  );
};
