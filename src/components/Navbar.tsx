import React from 'react';
import { WalletState } from '../types';
import { Bell, Sparkles, Wallet, CheckCircle2, ChevronDown } from 'lucide-react';

interface NavbarProps {
  wallet: WalletState;
  onToggleWallet: () => void;
  onOpenCreate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ wallet, onToggleWallet, onOpenCreate }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0812]/75 border-b border-white/5 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-[1px] shadow-glow">
            <div className="w-full h-full bg-[#0F0D1B] rounded-[11px] flex items-center justify-center transition-all group-hover:bg-transparent">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                PROMISE<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">PAY</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                Monad Testnet
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Programmable Money Protocol
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <button 
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-[#0A0812] animate-pulse"></span>
          </button>

          {/* Create Button (Desktop Quick Action) */}
          <button
            onClick={onOpenCreate}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95"
          >
            <span>+ Create Promise</span>
          </button>

          {/* Wallet Button */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              {/* Balance Badge (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                <span className="text-white font-bold">{wallet.balance.toFixed(2)}</span>
                <span className="text-purple-400 text-[10px]">MON</span>
              </div>

              {/* Wallet Address Trigger */}
              <button
                onClick={onToggleWallet}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-purple-500/30 text-white text-xs font-semibold transition-all group"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold">
                  0x
                </div>
                <span className="font-mono text-slate-200 group-hover:text-purple-300 transition-colors">
                  {wallet.address}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-glow transition-all active:scale-95"
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
