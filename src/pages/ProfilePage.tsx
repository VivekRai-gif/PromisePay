import React from 'react';
import { WalletState, StatsData } from '../types';
import { ArrowLeft, User, Wallet, ShieldCheck, Coins, Lock, ExternalLink, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';

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
  const [copied, setCopied] = React.useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x7291AC829F4B1A7D832E91AF203102948219048291AC');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#AAA3AF] hover:text-white border border-white/10 text-xs font-semibold mb-4 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#E89AC1] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            User Profile & Wallet
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/30 font-mono">
            Web3 Account
          </span>
        </div>
        <p className="text-xs text-[#AAA3AF] font-medium mt-1">
          Connected wallet analytics and smart contract interactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Wallet Card */}
        <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 glass-protocol-primary border border-white/12 shadow-card flex flex-col justify-between">
          <div>
            {/* Top User Info */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D9579D] via-[#E89AC1] to-[#A982C4] p-[1px] shadow-glowPink">
                  <div className="w-full h-full bg-[#121017] rounded-[15px] flex items-center justify-center">
                    <User className="w-7 h-7 text-[#E89AC1]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white font-mono">
                      {wallet.address}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className="p-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-[#AAA3AF] hover:text-white transition-colors"
                      title="Copy Address"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-xs text-[#E89AC1] font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-node-pulse" />
                    Connected to Monad Testnet
                  </span>
                </div>
              </div>

              <button
                onClick={onToggleWallet}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#E89AC1] border border-[#D9579D]/30 text-xs font-semibold transition-all"
              >
                {wallet.isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            {/* Balance Overview */}
            <div className="p-5 rounded-2xl bg-[#0C0A14]/70 border border-white/10 mb-6">
              <span className="text-xs text-[#AAA3AF] uppercase font-semibold tracking-wider block mb-1">
                Native MON Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white mon-glow">
                  {wallet.balance.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-[#E89AC1]">MON</span>
              </div>
            </div>

            {/* Network & Contract Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#726B77] uppercase font-semibold block mb-0.5">
                  Network Target
                </span>
                <span className="text-xs font-bold text-white block">Monad Testnet</span>
                <span className="text-[10px] font-mono text-[#E89AC1]">Chain ID 10143</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#726B77] uppercase font-semibold block mb-0.5">
                  Escrow Contract
                </span>
                <span className="text-xs font-mono text-white font-bold block truncate">
                  0x829F4B1A7D832E91AF203102948219048291A91C
                </span>
                <a
                  href="https://testnet.monadexplorer.com/address/0x829F4B1A7D832E91AF203102948219048291A91C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#E89AC1] font-semibold flex items-center gap-1 mt-0.5"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats Side Card */}
        <div className="rounded-3xl p-6 glass-protocol-card border border-white/10 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D9579D]" />
              <span>User Commitment Stats</span>
            </h3>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#AAA3AF]">Active Promises</span>
                <span className="text-base font-extrabold text-white">{stats.activePromises}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#AAA3AF]">Fulfilled Claims</span>
                <span className="text-base font-extrabold text-emerald-400">{stats.fulfilled}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#AAA3AF]">Total MON Locked</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-extrabold text-white">{stats.totalLocked.toFixed(2)}</span>
                  <span className="text-xs font-bold text-[#E89AC1]">MON</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#AAA3AF]">Total Volume</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-extrabold text-[#A982C4]">{stats.totalPromised.toFixed(2)}</span>
                  <span className="text-xs font-bold text-[#A982C4]">MON</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-[11px] text-[#726B77] font-mono">
              PromisePay Smart Contract Verified
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
