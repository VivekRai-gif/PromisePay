import React from 'react';
import { User, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecipientInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({ value, onChange }) => {
  // Simple check for eth/monad address format
  const isValidAddress = value.startsWith('0x') && value.length >= 10;
  const mockQuickAddresses = [
    { label: 'Graduation Recipient', address: '0x829F4B1A7D832E91AF203102948219048291A91C' },
    { label: 'Dev Milestone', address: '0x19B492048D2019A8201948201984201972FA029A' },
    { label: 'Challenge Buddy', address: '0x51E247B98D331AF04B9C02948201948201BC8201' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Who are you promising?
        </label>
        {value.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            {isValidAddress ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid Address
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Incomplete address (0x...)
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0x..."
          className={`w-full px-4 py-3.5 rounded-2xl glass-input text-xs sm:text-sm font-mono pl-11 transition-all ${
            isValidAddress ? 'border-emerald-500/40 focus:border-emerald-400' : ''
          }`}
        />
        <User className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
      </div>

      {/* Quick Select Presets */}
      <div className="pt-1">
        <span className="text-[10px] text-slate-400 font-medium block mb-1.5">Quick Select Mock Addresses:</span>
        <div className="flex flex-wrap gap-1.5">
          {mockQuickAddresses.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(item.address)}
              className="px-2.5 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-slate-300 hover:text-white border border-white/5 transition-all font-mono"
            >
              {item.label} ({item.address.slice(0, 6)}...{item.address.slice(-4)})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
