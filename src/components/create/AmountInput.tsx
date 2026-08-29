import React from 'react';
import { formatMonBalance } from '../../utils/format';
import { Coins, Lock } from 'lucide-react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  userBalance?: number | string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  userBalance = 0,
}) => {
  const handlePresetClick = (preset: number) => {
    onChange(preset.toString());
  };

  const handleMaxClick = () => {
    if (typeof userBalance === 'number' && userBalance > 0) {
      onChange(userBalance.toString());
    } else if (typeof userBalance === 'string' && userBalance !== '0') {
      onChange(userBalance);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>Amount to Lock (MON)</span>
        </label>
        <span className="text-[11px] font-mono text-[#64748B]">
          Balance: <strong className="text-[#A3E635]">{formatMonBalance(userBalance)} MON</strong>
        </span>
      </div>

      <div className="relative flex items-center">
        <input
          type="number"
          step="0.0001"
          min="0.0001"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full pl-4 pr-24 py-3.5 rounded-2xl glass-input text-lg font-bold text-white placeholder-[#64748B] focus:outline-none font-mono"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleMaxClick}
            className="px-2.5 py-1 rounded-xl bg-[#A3E635]/15 hover:bg-[#A3E635]/25 text-[#A3E635] border border-[#A3E635]/30 text-[10px] font-extrabold font-mono transition-all"
          >
            MAX
          </button>
          <span className="px-2 py-1 rounded-xl bg-white/[0.06] text-white text-xs font-extrabold font-mono border border-white/10">
            MON
          </span>
        </div>
      </div>

      {/* Preset Amount Chips */}
      <div className="flex items-center gap-2 pt-1">
        {[1, 5, 10, 25, 50].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
              value === preset.toString()
                ? 'bg-gradient-to-r from-[#A3E635] to-[#10B981] text-[#05070A] border-transparent shadow-glowLime'
                : 'bg-white/[0.03] hover:bg-white/[0.08] text-[#94A3B8] border-white/10'
            }`}
          >
            {preset} MON
          </button>
        ))}
      </div>
    </div>
  );
};
