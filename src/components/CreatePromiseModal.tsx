import React, { useState } from 'react';
import { PromiseItem, CategoryType } from '../types';
import { X, Sparkles, Lock, Coins, ShieldCheck, User } from 'lucide-react';

interface CreatePromiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePromise: (newPromise: PromiseItem) => void;
}

export const CreatePromiseModal: React.FC<CreatePromiseModalProps> = ({
  isOpen,
  onClose,
  onCreatePromise,
}) => {
  const [recipient, setRecipient] = useState<string>('0x829F...A91C');
  const [amount, setAmount] = useState<string>('1.0');
  const [condition, setCondition] = useState<string>('Graduation');
  const [category, setCategory] = useState<CategoryType>('education');
  const [description, setDescription] = useState<string>('Release funds upon verified degree completion.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount || !condition) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newPromise: PromiseItem = {
        id: `p-${Date.now()}`,
        title: `${getCategoryEmoji(category)} ${condition} Promise`,
        recipient: recipient.length > 12 ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}` : recipient,
        sender: '0x7A29...91F2',
        amount: parseFloat(amount) || 1.0,
        token: 'MON',
        condition: condition,
        status: 'LOCKED',
        createdAt: 'Just now',
        category: category,
        txHash: `0x${Math.random().toString(16).substring(2, 12)}...`,
        description: description,
      };

      onCreatePromise(newPromise);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const getCategoryEmoji = (cat: CategoryType) => {
    switch (cat) {
      case 'education': return '🎓';
      case 'freelance': return '💼';
      case 'competition': return '🏆';
      case 'accountability': return '🎯';
      default: return '🔒';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0812]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow orb */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Create Promise</h3>
              <p className="text-xs text-slate-400">Lock native MON behind a verifiable condition</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Recipient Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Recipient Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                required
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-mono pl-10"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Amount (MON)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1.0"
                  required
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold pl-10"
                />
                <Coins className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-semibold appearance-none bg-[#0F0D1B]"
              >
                <option value="education">🎓 Education</option>
                <option value="freelance">💼 Freelancing</option>
                <option value="competition">🏆 Competition</option>
                <option value="accountability">🎯 Accountability</option>
                <option value="other">🔒 Custom</option>
              </select>
            </div>
          </div>

          {/* Condition Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Condition Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g. Graduation, Milestone 1 Completed"
                required
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-semibold pl-10"
              />
              <ShieldCheck className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Notes / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Promise Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the condition criteria..."
              className="w-full px-4 py-2.5 rounded-2xl glass-input text-xs font-normal resize-none"
            />
          </div>

          {/* Card Live Preview */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 mt-4">
            <div className="text-[10px] font-semibold uppercase text-purple-400 tracking-wider mb-2">
              Preview Card
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
              <span>{getCategoryEmoji(category)} {condition || 'Untitled'} Promise</span>
              <span className="text-amber-400 font-mono">🔒 LOCKED</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>To: {recipient.slice(0, 10)}...</span>
              <span className="font-bold text-purple-300">{amount || '0'} MON</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-glow transition-all active:scale-98 mt-6"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Locking Funds on Monad...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>LOCK FUNDS & CREATE PROMISE</span>
              </span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
