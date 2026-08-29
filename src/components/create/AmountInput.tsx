import React from 'react';
import { Coins, Zap } from 'lucide-react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  userBalance?: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  userBalance = 42.5,
}) => {
  const presets = ['0.5', '1.0', '5.0', '10.0'];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
          How much MON are you locking?
        </label>
        <span className="text-[11px] text-[#9AA4B2] font-semibold">
          Balance: <strong className="text-[#CFFF00] font-mono">{userBalance.toFixed(2)} MON</strong>
        </span>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#CFFF00]">
          <Coins className="w-4 h-4" />
        </div>
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1.0"
          className="w-full pl-11 pr-20 py-3.5 rounded-2xl glass-input text-sm font-extrabold text-[#CFFF00] lime-glow tracking-wider placeholder-[#64748B]"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none font-extrabold text-xs text-[#19D98B] font-mono">
          MON NATIVE
        </div>
      </div>

      {/* Preset Amount Pills */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[11px] text-[#64748B] font-medium">Quick Amounts:</span>
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
              value === preset
                ? 'bg-gradient-to-r from-[#CFFF00] to-[#19D98B] text-[#05070A] shadow-glowLime'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-[#CFFF00] border border-white/10'
            }`}
          >
            {preset} MON
          </button>
        ))}
      </div>
    </div>
  );
};
