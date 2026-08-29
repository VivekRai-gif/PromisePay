import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ArrowRight, ShieldCheck, User, Sparkles, Info, ExternalLink } from 'lucide-react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { executeCreatePromiseOnChain, MONAD_EXPLORER } from '../../services/web3';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  amount: string;
  promiseType: PromiseTypeKey;
  unlockDate: string;
  customConditionText: string;
  onConfirmSuccess: (txHash: string) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  recipient,
  amount,
  promiseType,
  unlockDate,
  customConditionText,
  onConfirmSuccess,
}) => {
  const [step, setStep] = useState<'confirm' | 'submitting' | 'success'>('confirm');
  const [txHash, setTxHash] = useState<string>('');
  const [explorerUrl, setExplorerUrl] = useState<string>('');

  if (!isOpen) return null;

  const displayAmount = amount || '1.0';
  const displayRecipient = recipient || '0x829F...A91C';

  const getConditionLabel = () => {
    if (promiseType === 'date') return `Unlock on ${unlockDate || '29 August 2026'}`;
    if (promiseType === 'graduation') return customConditionText ? `Graduation (${customConditionText})` : 'Graduation Verification';
    return 'Condition Verification';
  };

  const handleConfirm = async () => {
    setStep('submitting');
    const condition = getConditionLabel();

    try {
      const result = await executeCreatePromiseOnChain(recipient, displayAmount, condition);
      setTxHash(result.txHash);
      setExplorerUrl(result.explorerUrl);
      setStep('success');
    } catch (err) {
      console.error('Tx error', err);
      setStep('confirm');
    }
  };

  const handleDone = () => {
    setStep('confirm');
    onConfirmSuccess(txHash);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0812]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 glass-panel border border-purple-500/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {step === 'confirm' && (
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Ready to lock funds on Monad
                  </h3>
                  <p className="text-xs text-slate-400">MetaMask confirmation required</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Promise Details List */}
            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Amount to Lock</span>
                <span className="text-sm font-extrabold text-purple-300">{displayAmount} MON</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Recipient</span>
                <span className="text-xs font-mono text-slate-200 font-bold truncate max-w-[180px]">
                  {displayRecipient}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Condition</span>
                <span className="text-xs font-semibold text-emerald-300">{getConditionLabel()}</span>
              </div>
            </div>

            {/* Note */}
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-center mb-6">
              <span className="text-[11px] text-purple-200 font-medium leading-relaxed block">
                🔒 Funds will be locked inside PromisePay contract (`0x829F...A91C`) on Monad Testnet.
              </span>
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-semibold border border-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-glow transition-all active:scale-95"
              >
                <span>Confirm Transaction</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {step === 'submitting' && (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Sending transaction to Monad...</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Please confirm the transaction in MetaMask window to lock native MON.
            </p>
          </div>
        )}

        {step === 'success' && (
          /* Live Monad Transaction Success State */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto badge-glow-emerald">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">Promise locked on Monad!</h3>
              <p className="text-xs text-purple-300 font-semibold mb-3">
                Live Transaction Confirmed on Monad Testnet
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Successfully locked <span className="text-white font-bold">{displayAmount} MON</span> in smart contract.
              </p>
            </div>

            {/* Live Tx Hash */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Transaction Hash</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300 font-bold truncate max-w-[240px]">
                  {txHash}
                </span>
                <a
                  href={explorerUrl || `${MONAD_EXPLORER}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold shrink-0"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-glow transition-all"
            >
              View Active Promises
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
