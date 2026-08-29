import React, { useState } from 'react';
import { PromiseItem, CategoryType } from '../types';
import { RecipientInput } from '../components/create/RecipientInput';
import { AmountInput } from '../components/create/AmountInput';
import { PromiseTypeSelector, PromiseTypeKey } from '../components/create/PromiseTypeSelector';
import { ConditionSelector } from '../components/create/ConditionSelector';
import { PromisePreview } from '../components/create/PromisePreview';
import { ConfirmationModal } from '../components/create/ConfirmationModal';
import { ArrowLeft, Lock } from 'lucide-react';

interface CreatePromisePageProps {
  onBack: () => void;
  onCreatePromise: (newPromise: PromiseItem) => void;
  userBalance?: number;
}

export const CreatePromisePage: React.FC<CreatePromisePageProps> = ({
  onBack,
  onCreatePromise,
  userBalance = 42.5,
}) => {
  const [recipient, setRecipient] = useState<string>('0x829F4B1A7D832E91AF203102948219048291A91C');
  const [amount, setAmount] = useState<string>('1.0');
  const [promiseType, setPromiseType] = useState<PromiseTypeKey>('graduation');
  const [unlockDate, setUnlockDate] = useState<string>('2026-08-29');
  const [customConditionText, setCustomConditionText] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const displayAmount = parseFloat(amount) > 0 ? amount : '1.0';

  const mapCategory = (type: PromiseTypeKey): CategoryType => {
    switch (type) {
      case 'graduation': return 'education';
      case 'date': return 'accountability';
      case 'milestone': return 'freelance';
      case 'competition': return 'competition';
      default: return 'other';
    }
  };

  const handleConfirmSuccess = (txHash: string) => {
    const conditionTitle =
      promiseType === 'date'
        ? `Unlock on ${unlockDate || '2026-08-29'}`
        : customConditionText
        ? `Graduation (${customConditionText})`
        : 'Graduation';

    const categoryEmoji = promiseType === 'graduation' ? '🎓' : '📅';

    const newPromise: PromiseItem = {
      id: `p-${Date.now()}`,
      title: `${categoryEmoji} ${promiseType === 'graduation' ? 'Graduation' : 'Time-Lock'} Promise`,
      recipient: recipient.length > 12 ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}` : recipient,
      sender: '0x7A29...91F2',
      amount: parseFloat(amount) || 1.0,
      token: 'MON',
      condition: conditionTitle,
      status: 'LOCKED',
      createdAt: 'Just now',
      category: mapCategory(promiseType),
      txHash: txHash || `0x${Math.random().toString(16).substring(2, 12)}...`,
      description: `Programmable MON promise created on Monad Testnet smart contract.`,
    };

    onCreatePromise(newPromise);
    setIsConfirmModalOpen(false);
    onBack();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Top Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create a Promise
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Monad Escrow
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Lock money today. Release it when your promise is fulfilled.
          </p>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container */}
        <div className="lg:col-span-7 space-y-6 rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-card">
          <RecipientInput value={recipient} onChange={setRecipient} />
          <hr className="border-white/5" />
          <AmountInput value={amount} onChange={setAmount} userBalance={userBalance} />
          <hr className="border-white/5" />
          <PromiseTypeSelector selectedType={promiseType} onSelectType={setPromiseType} />
          <hr className="border-white/5" />
          <ConditionSelector
            promiseType={promiseType}
            unlockDate={unlockDate}
            onUnlockDateChange={setUnlockDate}
            customConditionText={customConditionText}
            onCustomConditionChange={setCustomConditionText}
          />

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-glow hover:shadow-glowPink transition-all duration-300 active:scale-98"
            >
              <Lock className="w-4 h-4" />
              <span>Lock {displayAmount} MON & Create Promise</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="lg:col-span-5">
          <PromisePreview
            recipient={recipient}
            amount={amount}
            promiseType={promiseType}
            unlockDate={unlockDate}
            customConditionText={customConditionText}
          />
        </div>

      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        recipient={recipient}
        amount={amount}
        promiseType={promiseType}
        unlockDate={unlockDate}
        customConditionText={customConditionText}
        onConfirmSuccess={handleConfirmSuccess}
      />
    </div>
  );
};
