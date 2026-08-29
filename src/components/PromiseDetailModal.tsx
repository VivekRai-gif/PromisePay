import React from 'react';
import { PromiseItem } from '../types';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowUpRight, ExternalLink, Clock, User, Coins } from 'lucide-react';

interface PromiseDetailModalProps {
  promise: PromiseItem | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (promise: PromiseItem) => void;
  onVerify: (promise: PromiseItem) => void;
}

export const PromiseDetailModal: React.FC<PromiseDetailModalProps> = ({
  promise,
  isOpen,
  onClose,
  onClaim,
  onVerify,
}) => {
  if (!isOpen || !promise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0812]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{promise.title.split(' ')[0]}</span>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{promise.title}</h3>
              <span className="text-xs text-purple-400 font-mono">ID: {promise.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promise Status Header Banner */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block mb-0.5">
              Current State
            </span>
            <div className="flex items-center gap-2">
              {promise.status === 'LOCKED' && (
                <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  🔒 Funds Locked in Escrow
                </span>
              )}
              {promise.status === 'VERIFIED' && (
                <span className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ✓ Condition Verified
                </span>
              )}
              {promise.status === 'FULFILLED' && (
                <span className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  🔓 Claimed & Settled
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block mb-0.5">
              Amount
            </span>
            <span className="text-lg font-extrabold text-white">{promise.amount} MON</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 mb-6">
          {/* Condition Box */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block mb-1">
              Condition Criteria
            </span>
            <span className="text-sm font-semibold text-slate-200 block mb-1">{promise.condition}</span>
            {promise.description && (
              <p className="text-xs text-slate-400 leading-relaxed">{promise.description}</p>
            )}
          </div>

          {/* Recipient & Sender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-medium block">Recipient</span>
              <span className="text-xs font-mono text-slate-200 font-semibold mt-1 block truncate">
                {promise.recipient}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-medium block">Sender</span>
              <span className="text-xs font-mono text-slate-200 font-semibold mt-1 block truncate">
                {promise.sender}
              </span>
            </div>
          </div>

          {/* Explorer Hash */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Transaction Hash</span>
              <span className="text-xs font-mono text-purple-300 font-semibold">{promise.txHash}</span>
            </div>
            <a
              href={`https://testnet.monadexplorer.com/tx/${promise.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {promise.status === 'VERIFIED' && (
            <button
              onClick={() => {
                onClaim(promise);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-glowEmerald transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>CLAIM {promise.amount} MON</span>
            </button>
          )}

          {promise.status === 'LOCKED' && (
            <button
              onClick={() => {
                onVerify(promise);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-glow transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFY CONDITION</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-semibold border border-white/10 transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
