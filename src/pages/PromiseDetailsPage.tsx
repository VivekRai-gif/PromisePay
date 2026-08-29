import React, { useState } from 'react';
import { PromiseItem } from '../types';
import { PromiseLifecycleTracker } from '../components/details/PromiseLifecycleTracker';
import { FundsStatusCard } from '../components/details/FundsStatusCard';
import { OnChainInfoAccordion } from '../components/details/OnChainInfoAccordion';
import {
  executeVerifyPromiseOnChain,
  executeClaimPromiseOnChain,
  MONAD_EXPLORER,
} from '../services/web3';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  CheckCircle2,
  User,
  Calendar,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

interface PromiseDetailsPageProps {
  promise: PromiseItem;
  onBack: () => void;
  onVerifyPromise: (promise: PromiseItem) => void;
  onClaimPromise: (promise: PromiseItem) => void;
}

export const PromiseDetailsPage: React.FC<PromiseDetailsPageProps> = ({
  promise: initialPromise,
  onBack,
  onVerifyPromise,
  onClaimPromise,
}) => {
  const [promise, setPromise] = useState<PromiseItem>(initialPromise);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [latestTxHash, setLatestTxHash] = useState<string>(initialPromise.txHash);

  // Handle Verification Action
  const handleVerifyClick = async () => {
    setIsVerifying(true);

    try {
      const numericId = parseInt(promise.id.replace('p-', ''), 10) || 1;
      const res = await executeVerifyPromiseOnChain(numericId);
      setLatestTxHash(res.txHash);

      const updated = { ...promise, status: 'VERIFIED' as const, txHash: res.txHash };
      setPromise(updated);
      onVerifyPromise(updated);
    } catch (err) {
      console.error('Verify error', err);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle Claim Action
  const handleClaimClick = async () => {
    setIsClaiming(true);

    try {
      const numericId = parseInt(promise.id.replace('p-', ''), 10) || 1;
      const res = await executeClaimPromiseOnChain(numericId);
      setLatestTxHash(res.txHash);

      const updated = { ...promise, status: 'FULFILLED' as const, txHash: res.txHash };
      setPromise(updated);
      onClaimPromise(updated);
    } catch (err) {
      console.error('Claim error', err);
    } finally {
      setIsClaiming(false);
    }
  };

  // Status Badge Rendering
  const renderStatusBadge = () => {
    switch (promise.status) {
      case 'LOCKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 badge-glow">
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 LOCKED</span>
          </span>
        );
      case 'VERIFIED':
      case 'CLAIMABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 badge-glow-emerald">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>✅ CLAIMABLE</span>
          </span>
        );
      case 'FULFILLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🔓 FULFILLED</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Promise Details
              </h1>
              {renderStatusBadge()}
            </div>
            <p className="text-xs font-mono text-purple-400">
              Promise #{promise.id.replace('p-', '102')} • Created {promise.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-semibold text-slate-300">
              Monad Testnet
            </span>
          </div>
        </div>
      </div>

      {/* Main Details Layout */}
      <div className="space-y-6">
        
        {/* Funds Status Header Card */}
        <FundsStatusCard amount={promise.amount} status={promise.status} />

        {/* Main Promise Summary Card */}
        <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-card">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{promise.title.split(' ')[0]}</span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{promise.title}</h2>
                <span className="text-xs text-slate-400">Category: {promise.category}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Commitment</span>
              <span className="text-2xl font-extrabold text-white">{promise.amount} MON</span>
            </div>
          </div>

          {/* Grid of Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Sender
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span className="truncate">{promise.sender}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Recipient
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 font-bold">
                <User className="w-3.5 h-3.5 text-pink-400" />
                <span className="truncate">{promise.recipient}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Condition
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{promise.condition}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Created Date
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>29 August 2026</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {promise.description && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Unlock Condition Details
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {promise.description}
              </p>
            </div>
          )}
        </div>

        {/* Lifecycle Tracker */}
        <PromiseLifecycleTracker status={promise.status} />

        {/* Interactive Action Section */}
        <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 text-center">
          <h3 className="text-base font-bold text-white mb-2">Monad On-Chain Actions</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Execute smart contract state updates or claim native MON escrow.
          </p>

          <div className="max-w-xs mx-auto">
            {promise.status === 'LOCKED' && (
              <button
                onClick={handleVerifyClick}
                disabled={isVerifying}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm shadow-glow transition-all active:scale-95"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Verifying on Monad...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Condition</span>
                  </span>
                )}
              </button>
            )}

            {(promise.status === 'VERIFIED' || promise.status === 'CLAIMABLE') && (
              <button
                onClick={handleClaimClick}
                disabled={isClaiming}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-glowEmerald transition-all active:scale-95"
              >
                {isClaiming ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Claiming {promise.amount} MON...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Claim {promise.amount} MON</span>
                  </span>
                )}
              </button>
            )}

            {promise.status === 'FULFILLED' && (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>🔓 Native MON Transferred & Settled</span>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible On-Chain Information */}
        <OnChainInfoAccordion txHash={latestTxHash} />

      </div>
    </div>
  );
};
