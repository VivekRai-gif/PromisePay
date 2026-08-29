import React from 'react';
import { WalletState } from '../types';
import { formatMonBalance } from '../utils/format';
import { Bell, Sparkles, Wallet, ChevronDown, Activity, Lock, Plus, Home, User } from 'lucide-react';

interface NavbarProps {
  wallet: WalletState;
  onToggleWallet: () => void;
  onOpenCreate: () => void;
  currentView?: string;
  onNavigateHome?: () => void;
  onNavigatePromises?: () => void;
  onNavigateActivity?: () => void;
  onNavigateProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onToggleWallet,
  onOpenCreate,
  currentView = 'home',
  onNavigateHome,
  onNavigatePromises,
  onNavigateActivity,
  onNavigateProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-3xl bg-[#070A0F]/85 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Brand Logo & Protocol Status (Matches Reference Image) */}
        <div className="flex items-center gap-4">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A3E635] via-[#B8F000] to-[#10B981] p-[1px] shadow-glowLime transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0E1420] rounded-[15px] flex items-center justify-center transition-all group-hover:bg-transparent">
                <Sparkles className="w-5 h-5 text-[#A3E635] group-hover:text-[#05070A] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  PROMISE<span className="text-[#A3E635]">PAY</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-node-ping"></span>
                  Monad Testnet
                </span>
              </div>
              <span className="text-[10px] text-[#64748B] font-medium tracking-wide hidden sm:block">
                Programmable Money Protocol
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Home, Promises, Create, Activity, Profile) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-innerLight">
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${currentView === 'home'
                ? 'bg-gradient-to-r from-[#A3E635] to-[#10B981] text-[#05070A] shadow-glowLime'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={onNavigatePromises}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${currentView === 'promises' || currentView === 'detail'
                ? 'bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30 shadow-glowLime'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Promises</span>
          </button>

          <button
            onClick={onOpenCreate}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${currentView === 'create'
                ? 'bg-gradient-to-r from-[#A3E635] to-[#10B981] text-[#05070A] shadow-glowLime'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={onNavigateActivity}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${currentView === 'activity'
                ? 'bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30 shadow-glowLime'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Activity</span>
          </button>

          <button
            onClick={onNavigateProfile}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${currentView === 'profile'
                ? 'bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30 shadow-glowLime'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Right: Action Controls & Wallet (Matches Reference Image) */}
        <div className="flex items-center gap-3">

          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="relative p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all shadow-innerLight"
          >
            <Bell className="w-4 h-4 text-[#94A3B8]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A3E635] ring-2 ring-[#070A0F] animate-pulse"></span>
          </button>

          {/* Create Button (Primary Lime CTA matching Image) */}
          <button
            onClick={onOpenCreate}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981] hover:opacity-95 text-[#05070A] font-extrabold text-xs shadow-glowLime transition-all active:scale-95"
          >
            <span>+ Create Promise</span>
          </button>

          {/* Wallet & Balance Pills (4 Decimal Places Precision) */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              {/* Balance Badge */}
              <div
                onClick={onNavigateProfile}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0E1420] border border-[#A3E635]/30 text-[#A3E635] text-xs font-bold shadow-innerLight cursor-pointer transition-all hover:border-[#A3E635]/60"
              >
                <span className="text-white font-extrabold lime-text-glow">
                  {formatMonBalance(wallet.balanceString || wallet.balance)}
                </span>
                <span className="text-[#A3E635] text-[10px]">MON</span>
              </div>

              {/* Wallet Address Trigger */}
              <button
                onClick={onNavigateProfile}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-bold transition-all shadow-innerLight group"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A3E635] to-[#10B981] flex items-center justify-center text-[10px] text-[#05070A] font-extrabold">
                  0x
                </div>
                <span className="font-mono text-[#94A3B8] group-hover:text-white transition-colors">
                  {wallet.address}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#A3E635] to-[#10B981] text-[#05070A] text-xs font-extrabold shadow-glowLime transition-all active:scale-95"
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
