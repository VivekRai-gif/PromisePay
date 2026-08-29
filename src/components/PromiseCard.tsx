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
  // Render status badge based on status
  const renderStatusBadge = () => {
    switch (promise.status) {
      case 'LOCKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 badge-glow">
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 Locked</span>
          </span>
        );
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 badge-glow-emerald">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>✓ Verified</span>
          </span>
        );
      case 'FULFILLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🔓 Fulfilled</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative group rounded-3xl p-5 sm:p-6 glass-panel-interactive border border-white/10 flex flex-col justify-between h-full">
      {/* Background ambient glow effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-purple-500/20 transition-all" />

      {/* Card Top: Title & Status */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
            {promise.title}
          </h3>
          {renderStatusBadge()}
        </div>

        {/* Condition Box */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
          <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-1">
            Condition
          </div>
          <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>{promise.condition}</span>
          </div>
        </div>

        {/* Amount & Recipient */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-slate-400 font-medium block">Amount</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-extrabold text-white">{promise.amount}</span>
              <span className="text-xs font-bold text-purple-400">MON</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-slate-400 font-medium block">Recipient</span>
            <span className="text-xs font-mono text-slate-300 font-semibold block mt-1 truncate">
              {promise.recipient}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{promise.createdAt}</span>
        </div>

        {/* Dynamic Action Buttons based on status */}
        {promise.status === 'VERIFIED' ? (
          <button
            onClick={() => onClaim(promise)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-glowEmerald transition-all active:scale-95"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Claim MON</span>
          </button>
        ) : promise.status === 'LOCKED' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVerify(promise)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>

            <button
              onClick={() => onView(promise)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold transition-all"
            >
              <span>View</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => onView(promise)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold border border-white/5 transition-all"
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>
    </div>
  );
};
