import React from 'react';
import { WalletState } from '../types';
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-3xl bg-[#08070D]/85 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo & Protocol Status */}
        <div className="flex items-center gap-4">
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D9579D] via-[#E89AC1] to-[#A982C4] p-[1px] shadow-glowPink transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#121017] rounded-[15px] flex items-center justify-center transition-all group-hover:bg-transparent">
                <Sparkles className="w-5 h-5 text-[#E89AC1] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  PROMISE<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9579D] to-[#A982C4]">PAY</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#3A1E3B]/80 text-[#E89AC1] border border-[#D9579D]/30 shadow-innerGlow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9579D] animate-node-pulse"></span>
                  Monad Testnet
                </span>
              </div>
              <span className="text-[10px] text-[#726B77] font-mono tracking-wider hidden sm:block">
                PROTOCOL v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Home, Promises, Create, Activity, Profile) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-innerGlow">
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'home'
                ? 'bg-gradient-to-r from-[#D9579D] to-[#A982C4] text-white shadow-glowPink'
                : 'text-[#AAA3AF] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={onNavigatePromises}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'promises' || currentView === 'detail'
                ? 'bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/40 shadow-glowPink'
                : 'text-[#AAA3AF] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Promises</span>
          </button>

          <button
            onClick={onOpenCreate}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'create'
                ? 'bg-gradient-to-r from-[#D9579D] to-[#A982C4] text-white shadow-glowPink'
                : 'text-[#AAA3AF] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={onNavigateActivity}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'activity'
                ? 'bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/40 shadow-glowPink'
                : 'text-[#AAA3AF] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Activity</span>
          </button>

          <button
            onClick={onNavigateProfile}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'profile'
                ? 'bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/40 shadow-glowPink'
                : 'text-[#AAA3AF] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Right: Action Controls & Wallet */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <button 
            aria-label="Notifications"
            className="relative p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#AAA3AF] hover:text-white transition-all shadow-innerGlow"
          >
            <Bell className="w-4 h-4 text-[#AAA3AF]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D9579D] ring-2 ring-[#08070D] animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D9579D] ring-2 ring-[#08070D]"></span>
          </button>

          {/* Wallet Button */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              {/* Balance Badge */}
              <div 
                onClick={onNavigateProfile}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#3A1E3B]/70 hover:bg-[#3A1E3B] border border-[#D9579D]/30 text-[#E89AC1] text-xs font-bold shadow-innerGlow cursor-pointer transition-all"
              >
                <span className="text-white font-extrabold mon-glow">{wallet.balance.toFixed(2)}</span>
                <span className="text-[#A982C4] text-[10px]">MON</span>
              </div>

              {/* Wallet Address Trigger */}
              <button
                onClick={onNavigateProfile}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-[#D9579D]/30 text-white text-xs font-bold transition-all shadow-innerGlow group"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D9579D] to-[#A982C4] flex items-center justify-center text-[10px] text-white font-bold">
                  0x
                </div>
                <span className="font-mono text-[#AAA3AF] group-hover:text-white transition-colors">
                  {wallet.address}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#AAA3AF] group-hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D9579D] to-[#A982C4] text-white text-xs font-bold shadow-glowPink transition-all active:scale-95"
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
