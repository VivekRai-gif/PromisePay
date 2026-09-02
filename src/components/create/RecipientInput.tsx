import React from 'react';
import { User, Wallet, CheckCircle2, ShieldCheck } from 'lucide-react';

interface RecipientInputProps {
  value: string;
  onChange: (value: string) => void;
  connectedAddress?: string;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({
  value,
  onChange,
  connectedAddress = '0x7A291AC829F4B1A7D832E91AF203102948219048291AC',
}) => {
  const isValidAddress = value.startsWith('0x') && value.length === 42 && !value.includes('...');

  const fullConnectedAddr = (connectedAddress && connectedAddress.length === 42 && !connectedAddress.includes('...'))
    ? connectedAddress
    : '0x7A291AC829F4B1A7D832E91AF203102948219048291AC';

  const presets = [
    { label: 'Self Promise (My Wallet)', address: fullConnectedAddr, icon: ShieldCheck },
    { label: 'Deployed Contract', address: '0x829F4B1A7D832E91AF203102948219048291A91C', icon: Wallet },
    { label: 'Friend Wallet', address: '0x7291AC829F4B1A7D832E91AF203102948219048291AC', icon: User },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
          Who are you promising? (Recipient Wallet)
        </label>
        {isValidAddress && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#19D98B]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Valid EVM Address</span>
          </span>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#CFFF00]">
          <User className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0x..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-xs font-mono font-semibold text-white tracking-wider placeholder-[#64748B]"
        />
      </div>

      {/* Quick Select Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] text-[#64748B] font-medium">Quick Select:</span>
        {presets.map((p, idx) => {
          const IconComp = p.icon;
          const isSelected = value === p.address;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(p.address)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-mono font-semibold transition-all ${
                isSelected
                  ? 'bg-[#CFFF00]/20 text-[#CFFF00] border border-[#CFFF00]/50 shadow-glowLime'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-[#9AA4B2] hover:text-[#CFFF00] border border-white/10'
              }`}
            >
              <IconComp className="w-3 h-3 text-[#CFFF00]" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

