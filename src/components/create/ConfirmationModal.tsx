import React, { useState } from 'react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { executeCreatePromiseOnChain } from '../../services/web3';
import { X, Lock, ShieldCheck, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
  recipient: string;
  amount: string;
  promiseType: PromiseTypeKey;
  unlockDate: string;
  customConditionText: string;
  onClose: () => void;
  onSuccess: (txHash: string) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  recipient,
  amount,
  promiseType,
  unlockDate,
  customConditionText,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getConditionLabel = () => {
    if (promiseType === 'date') {
      return `Unlock on ${unlockDate || '2026-08-29'}`;
    }
    if (promiseType === 'graduation') {
      return customConditionText ? `Graduation (${customConditionText})` : 'Graduation Verification';
    }
    return 'Condition Fulfillment';
  };

  const handleConfirmAndSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const condition = getConditionLabel();
      console.log('🚀 Initiating Real Monad Testnet Promise Creation transaction...');
      
      const result = await executeCreatePromiseOnChain(recipient, amount, condition);
      console.log('✅ Real Monad Testnet Tx Confirmed:', result.txHash);
      
      onSuccess(result.txHash);
    } catch (err: any) {
      console.warn('Tx error or fallback:', err);
      setErrorMessage(err.message || 'Transaction was rejected or failed on Monad Testnet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-lime-primary border border-[#CFFF00]/30 shadow-card">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#9AA4B2] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#CFFF00]/15 text-[#CFFF00] border border-[#CFFF00]/30 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Confirm Promise & Lock MON</h3>
            <span className="text-xs text-[#19D98B] font-mono">Monad Testnet Transaction</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#0C1015]/80 border border-white/10 mb-6 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[#64748B] font-medium">Locked Amount</span>
            <span className="font-extrabold text-[#CFFF00] text-sm lime-glow">{amount} MON</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[#64748B] font-medium">Recipient Wallet</span>
            <span className="font-mono text-white font-bold">{recipient.slice(0, 6)}...{recipient.slice(-4)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">Unlock Condition</span>
            <span className="font-semibold text-[#19D98B]">{getConditionLabel()}</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-1/3 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#9AA4B2] font-semibold text-xs transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmAndSubmit}
            disabled={isSubmitting}
            className="w-2/3 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#CFFF00] via-[#B8F000] to-[#19D98B] hover:opacity-95 text-[#05070A] font-extrabold text-xs shadow-glowLime transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#05070A]" />
                <span>Confirming on Monad...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#05070A]" />
                <span>Confirm & Send Tx</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
