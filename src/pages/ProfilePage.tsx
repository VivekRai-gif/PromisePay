import React, { useState } from 'react';
import { WalletState, StatsData } from '../types';
import { formatMonBalance } from '../utils/format';
import { ArrowLeft, Wallet, ShieldCheck, Lock, ExternalLink, Copy, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface ProfilePageProps {
  wallet: WalletState;
  stats: StatsData;
  onBack: () => void;
  onToggleWallet: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  wallet,
  stats,
  onBack,
  onToggleWallet,
}) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = wallet.fullAddress || wallet.address || '0xA8563729F4B1A7D832E91AF203102948219048291A91C';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedBalance = formatMonBalance(wallet.balanceString || wallet.balance);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#A3E635] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              User Profile & Monad Wallet
            </h1>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">
              Connected EVM Wallet details & protocol activity stats on Monad Testnet
            </p>
          </div>

          <button
            onClick={onToggleWallet}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all shadow-innerLight ${wallet.isConnected
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25'
                : 'bg-gradient-to-r from-[#A3E635] to-[#10B981] text-[#05070A] shadow-glowLime'
              }`}
          >
            {wallet.isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-3xl p-6 sm:p-8 glass-eye-primary border border-white/12 shadow-card space-y-6 mb-8">
        {/* Wallet Address Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A0E17]/90 border border-white/10 shadow-innerLight">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A3E635] to-[#10B981] p-[1px] shadow-glowLime shrink-0">
              <div className="w-full h-full bg-[#0E1420] rounded-[15px] flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#A3E635]" />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block font-mono">
                Connected Address
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-white break-all">
                {fullAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleCopyAddress}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white border border-white/10 text-xs transition-colors flex items-center gap-1.5 font-mono"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`https://testnet.monadexplorer.com/address/${fullAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-white border border-white/10 text-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#A3E635]" />
            </a>
          </div>
        </div>

        {/* Balance & Network Stat Grid (4 Decimal Places Precision) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {/* Native MON Balance */}
          <div className="p-5 rounded-2xl bg-[#0A0E17]/80 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-1 font-mono">
              Native MON Balance
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#A3E635] lime-text-glow font-mono">
                {formattedBalance}
              </span>
              <span className="text-xs font-bold text-[#10B981] font-mono">MON</span>
            </div>
            <span className="text-[10px] text-[#64748B] font-mono mt-1 block">Live Monad Node RPC</span>
          </div>

          {/* Network Chain */}
          <div className="p-5 rounded-2xl bg-[#0A0E17]/80 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-1 font-mono">
              Active Blockchain
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] animate-node-ping" />
              <span className="text-lg font-bold text-white font-mono">
                {wallet.network || 'Monad Testnet'}
              </span>
            </div>
            <span className="text-[10px] text-[#64748B] font-mono mt-1 block">Chain ID: {wallet.chainId || 10143} (0x279f)</span>
          </div>

          {/* Contract Escrow Status */}
          <div className="p-5 rounded-2xl bg-[#0A0E17]/80 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-1 font-mono">
              Escrow Contract
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              <span className="text-lg font-bold text-white font-mono">Verified</span>
            </div>
            <span className="text-[10px] text-[#64748B] font-mono mt-1 block">0x829F...A91C</span>
          </div>

        </div>
      </div>

      {/* Protocol Participation Stats */}
      <div className="rounded-3xl p-6 sm:p-8 glass-eye-primary border border-white/10 shadow-card">
        <h3 className="text-lg font-extrabold text-white mb-4 tracking-tight flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#A3E635]" />
          <span>Protocol Participation</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#0A0E17]/60 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] font-mono block mb-1">Total Locked</span>
            <span className="text-xl font-extrabold text-white font-mono">{stats.totalLocked.toFixed(2)} MON</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0A0E17]/60 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] font-mono block mb-1">Active Promises</span>
            <span className="text-xl font-extrabold text-[#A3E635] font-mono">{stats.activePromises}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0A0E17]/60 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] font-mono block mb-1">Fulfilled</span>
            <span className="text-xl font-extrabold text-[#10B981] font-mono">{stats.fulfilled}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0A0E17]/60 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#64748B] font-mono block mb-1">Total Promised</span>
            <span className="text-xl font-extrabold text-white font-mono">{stats.totalPromised.toFixed(2)} MON</span>
          </div>
        </div>
      </div>
    </div>
  );
};
