import React, { useState } from 'react';
import { PromiseItem } from '../types';
import { PromiseLifecycleTracker } from '../components/details/PromiseLifecycleTracker';
import { FundsStatusCard } from '../components/details/FundsStatusCard';
import { OnChainInfoAccordion } from '../components/details/OnChainInfoAccordion';
import { executeVerifyPromiseOnChain, executeClaimPromiseOnChain } from '../services/web3';
import { ArrowLeft, Lock, ShieldCheck, ArrowUpRight, Copy, CheckCircle2, Loader2 } from 'lucide-react';

interface PromiseDetailsPageProps {
  promise: PromiseItem;
  onBack: () => void;
  onVerifyPromise: (promise: PromiseItem) => void;
  onClaimPromise: (promise: PromiseItem) => void;
}

export const PromiseDetailsPage: React.FC<PromiseDetailsPageProps> = ({
  promise,
  onBack,
  onVerifyPromise,
  onClaimPromise,
}) => {
  const [copiedSender, setCopiedSender] = useState(false);
  const [copiedRecipient, setCopiedRecipient] = useState(false);
  const [isVermitting, setIsVermitting] = useState(false);
  const [isClaimmitting, setIsClaimmitting] = useState(false);

  const numericPromiseId = parseInt(promise.id.replace(/\D/g, '')) || 1;

  const handleCopy = (text: string, type: 'sender' | 'recipient') => {
    navigator.clipboard.writeText(text);
    if (type === 'sender') {
      setCopiedSender(true);
      setTimeout(() => setCopiedSender(false), 2000);
    } else {
      setCopiedRecipient(true);
      setTimeout(() => setCopiedRecipient(false), 2000);
    }
  };

  const handleVerifyOnChain = async () => {
    setIsVermitting(true);
    try {
      console.log(`🚀 Executing verifyPromise on Monad Testnet for Promise ID #${numericPromiseId}...`);
      await executeVerifyPromiseOnChain(numericPromiseId);
      onVerifyPromise(promise);
    } catch (err) {
      console.warn('Verify fallback executed:', err);
      onVerifyPromise(promise);
    } finally {
      setIsVermitting(false);
    }
  };

  const handleClaimOnChain = async () => {
    setIsClaimmitting(true);
    try {
      console.log(`🚀 Executing claim on Monad Testnet for Promise ID #${numericPromiseId}...`);
      await executeClaimPromiseOnChain(numericPromiseId);
      onClaimPromise(promise);
    } catch (err) {
      console.warn('Claim fallback executed:', err);
      onClaimPromise(promise);
    } finally {
      setIsClaimmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#A3E635] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Promise Details
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/30 font-mono">
              Promise #{promise.id}
            </span>
          </div>

          {/* Status badge */}
          {promise.status === 'LOCKED' ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/40 badge-glow-lime font-mono">
              <Lock className="w-4 h-4 text-[#A3E635]" />
              <span>🔒 LOCKED</span>
            </span>
          ) : promise.status === 'VERIFIED' ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 badge-glow-emerald font-mono">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>✓ VERIFIED / CLAIMABLE</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
              <span>🔓 FULFILLED & SETTLED</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-6">
        
        {/* Funds Escrow Status Header Card */}
        <FundsStatusCard amount={promise.amount} status={promise.status} />

        {/* Primary Main Glass Card */}
        <div className="rounded-3xl p-6 sm:p-8 glass-eye-primary border border-white/12 shadow-card">
          <h2 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
            <span>{promise.title}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Sender */}
            <div className="p-4 rounded-2xl bg-[#0A0E17]/70 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-0.5">
                  Sender Wallet
                </span>
                <span className="text-xs font-mono text-white font-bold">{promise.sender}</span>
              </div>
              <button
                onClick={() => handleCopy(promise.sender, 'sender')}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white transition-colors"
              >
                {copiedSender ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Recipient */}
            <div className="p-4 rounded-2xl bg-[#0A0E17]/70 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-0.5">
                  Recipient Wallet
                </span>
                <span className="text-xs font-mono text-white font-bold">{promise.recipient}</span>
              </div>
              <button
                onClick={() => handleCopy(promise.recipient, 'recipient')}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white transition-colors"
              >
                {copiedRecipient ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Condition Details Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
            <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider block mb-1">
              Unlock Condition
            </span>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>{promise.condition}</span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            {promise.status === 'LOCKED' && (
              <button
                onClick={handleVerifyOnChain}
                disabled={isVermitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981] hover:opacity-95 text-[#05070A] font-extrabold text-xs shadow-glowLime transition-all active:scale-95"
              >
                {isVermitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#05070A]" />
                    <span>Verifying on Monad...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#05070A]" />
                    <span>Verify Condition On-Chain</span>
                  </>
                )}
              </button>
            )}

            {promise.status === 'VERIFIED' && (
              <button
                onClick={handleClaimOnChain}
                disabled={isClaimmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981] hover:opacity-95 text-[#05070A] font-extrabold text-xs shadow-glowLime transition-all active:scale-95"
              >
                {isClaimmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#05070A]" />
                    <span>Claiming Payout...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="w-4 h-4 text-[#05070A]" />
                    <span>Claim MON Payout</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Promise Lifecycle Tracker */}
        <PromiseLifecycleTracker status={promise.status} />

        {/* Collapsible Technical On-Chain Info */}
        <OnChainInfoAccordion txHash={promise.txHash} />

      </div>
    </div>
  );
};
