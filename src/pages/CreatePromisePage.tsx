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
  userBalance = 0.0,
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
      case 'milestone': return 'freelance';
      case 'competition': return 'competition';
      case 'date': return 'accountability';
      case 'custom': return 'other';
      default: return 'other';
    }
  };

  const getTemplateTitle = (type: PromiseTypeKey): string => {
    switch (type) {
      case 'graduation': return '🎓 Graduation Promise';
      case 'milestone': return '💼 Project Milestone Promise';
      case 'competition': return '🏆 Competition Prize Promise';
      case 'date': return '📅 Time-Lock Date Promise';
      case 'custom': return '🎯 Custom Goal Promise';
      default: return '🔒 Monad Promise';
    }
  };

  const handleConfirmSuccess = (txHash: string) => {
    let conditionTitle = '';
    switch (promiseType) {
      case 'date':
        conditionTitle = `Unlock on ${unlockDate || '2026-08-29'}`;
        break;
      case 'graduation':
        conditionTitle = customConditionText ? `Graduation (${customConditionText})` : 'Graduation';
        break;
      case 'milestone':
        conditionTitle = customConditionText ? `Milestone (${customConditionText})` : 'Project Deliverable';
        break;
      case 'competition':
        conditionTitle = customConditionText ? `Competition (${customConditionText})` : 'Prize Pool Winner';
        break;
      case 'custom':
        conditionTitle = customConditionText ? `Goal (${customConditionText})` : 'Custom Goal Commitment';
        break;
    }

    const newPromise: PromiseItem = {
      id: `p-${Date.now()}`,
      title: getTemplateTitle(promiseType),
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
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#A3E635] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create a Promise
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/30 font-mono">
              Monad Escrow
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#9AA4B2] font-medium">
            Lock money today. Release it when your promise is fulfilled.
          </p>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl p-6 sm:p-7 glass-eye-primary border border-white/10 shadow-card space-y-6">

            {/* Field 1: Recipient Input */}
            <RecipientInput value={recipient} onChange={setRecipient} />

            {/* Field 2: Amount Input */}
            <AmountInput value={amount} onChange={setAmount} userBalance={userBalance} />

            {/* Field 3: Promise Type Selector (5 Templates) */}
            <PromiseTypeSelector selectedType={promiseType} onSelectType={setPromiseType} />

            {/* Field 4: Condition Details */}
            <ConditionSelector
              promiseType={promiseType}
              unlockDate={unlockDate}
              onUnlockDateChange={setUnlockDate}
              customConditionText={customConditionText}
              onCustomConditionChange={setCustomConditionText}
            />

            {/* Lock Money CTA Trigger */}
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981] hover:opacity-95 text-[#05070A] font-extrabold text-sm shadow-glowLime transition-all duration-300 active:scale-95 group"
            >
              <Lock className="w-4 h-4 text-[#05070A]" />
              <span>Lock Money & Create Promise ({displayAmount} MON)</span>
            </button>

          </div>
        </div>

        {/* Right Column: Live Preview Sticky Card */}
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

      {/* Confirmation & Web3 Transaction Submission Modal */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          recipient={recipient}
          amount={amount}
          promiseType={promiseType}
          unlockDate={unlockDate}
          customConditionText={customConditionText}
          onClose={() => setIsConfirmModalOpen(false)}
          onSuccess={handleConfirmSuccess}
        />
      )}
    </div>
  );
};
