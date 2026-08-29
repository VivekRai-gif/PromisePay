import React from 'react';
import { Coins, Wallet } from 'lucide-react';

interface AmountInputProps {
  value: string;
  onChange: (val: string) => void;
  userBalance?: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  userBalance = 42.5,
}) => {
  const presets = [0.5, 1.0, 5.0, 10.0];

  const handleAddPreset = (amount: number) => {
    const current = parseFloat(value) || 0;
    onChange((current + amount).toString());
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          How much?
        </label>
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
          <Wallet className="w-3.5 h-3.5 text-purple-400" />
          <span>Available:</span>
          <span className="font-bold text-white">{userBalance.toFixed(2)} MON</span>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3.5 rounded-2xl glass-input text-lg sm:text-xl font-bold pl-11 pr-20 transition-all focus:border-purple-500"
        />
        <Coins className="w-5 h-5 text-purple-400 absolute left-4" />
        
        {/* Currency Tag */}
        <div className="absolute right-3 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 font-extrabold text-xs tracking-wider">
          MON
        </div>
      </div>

      {/* Quick Amount Presets */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[10px] text-slate-400 font-medium">Add Quick:</span>
        <div className="flex gap-1.5">
          {presets.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleAddPreset(amt)}
              className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-purple-600/20 text-slate-300 hover:text-purple-200 border border-white/5 hover:border-purple-500/30 text-xs font-semibold transition-all"
            >
              +{amt} MON
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
