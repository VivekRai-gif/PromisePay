import React from 'react';
import { WalletState } from '../types';
import { Bell, Sparkles, Wallet, ChevronDown } from 'lucide-react';

interface NavbarProps {
  wallet: WalletState;
  onToggleWallet: () => void;
  onOpenCreate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ wallet, onToggleWallet, onOpenCreate }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#0B0A0D]/80 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D95B9A] via-[#C66B9B] to-[#A984C4] p-[1px] shadow-glowPink">
            <div className="w-full h-full bg-[#121016] rounded-[15px] flex items-center justify-center transition-all group-hover:bg-transparent">
              <Sparkles className="w-5 h-5 text-[#E38BB5] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                PROMISE<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95B9A] to-[#A984C4]">PAY</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#4B304F]/60 text-[#E38BB5] border border-[#D95B9A]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95B9A] animate-pulse"></span>
                Monad Testnet
              </span>
            </div>
            <span className="text-[10px] text-[#8F8991] font-medium tracking-wide hidden sm:block">
              Programmable Money Protocol
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <button 
            aria-label="Notifications"
            className="relative p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-[#C8C1C9] hover:text-white transition-all"
          >
            <Bell className="w-4 h-4 text-[#AAA3AC]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D95B9A] ring-2 ring-[#0B0A0D] animate-pulse"></span>
          </button>

          {/* Create Button (Desktop Quick Action) */}
          <button
            onClick={onOpenCreate}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D95B9A] via-[#C66B9B] to-[#A984C4] hover:opacity-90 text-white font-semibold text-xs shadow-glowPink transition-all active:scale-95"
          >
            <span>+ Create Promise</span>
          </button>

          {/* Wallet Button */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              {/* Balance Badge (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#342031]/60 border border-[#D95B9A]/30 text-[#E38BB5] text-xs font-semibold">
                <span className="text-white font-bold">{wallet.balance.toFixed(2)}</span>
                <span className="text-[#A984C4] text-[10px]">MON</span>
              </div>

              {/* Wallet Address Trigger */}
              <button
                onClick={onToggleWallet}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-[#D95B9A]/30 text-white text-xs font-semibold transition-all group"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D95B9A] to-[#A984C4] flex items-center justify-center text-[10px] text-white font-bold">
                  0x
                </div>
                <span className="font-mono text-[#C8C1C9] group-hover:text-white transition-colors">
                  {wallet.address}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#AAA3AC] group-hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D95B9A] to-[#A984C4] text-white text-xs font-bold shadow-glowPink transition-all active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
