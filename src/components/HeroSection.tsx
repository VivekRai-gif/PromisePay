import React from 'react';
import { formatMonBalance } from '../utils/format';
import { Plus, Compass, Lock, ShieldCheck, Zap, CheckCircle2, Edit3, ArrowUpRightFromSquare } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
  isConnected?: boolean;
  connectedBalance?: number | string;
  totalLocked?: number | string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCreate,
  onExplore,
  isConnected = false,
  connectedBalance = 0,
  totalLocked = 0,
}) => {
  const displayAmount = isConnected
    ? formatMonBalance(connectedBalance)
    : formatMonBalance(totalLocked);

  return (
    <section className="relative pt-6 pb-14 overflow-hidden">
      {/* Background Soft Monad Purple Glow Falloff */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[350px] bg-gradient-to-tr from-[#8335EC]/25 via-[#A055FF]/15 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Asymmetric 2-Column Desktop Composition */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline, Copy & CTAs */}
        <div className="lg:col-span-6 text-left">
          
          {/* Protocol Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8335EC]/20 border border-[#8335EC]/40 text-[#C084FC] text-xs font-semibold mb-6 backdrop-blur-md shadow-innerLight">
            <Zap className="w-3.5 h-3.5 text-[#A055FF] fill-[#A055FF]/30 animate-node-ping" />
            <span>Programmable Money on Monad Testnet</span>
          </div>

          {/* Headline (Monad Purple & Violet Text Gradient) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
            Make promises. <br className="hidden sm:inline" />
            Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A055FF] via-[#C084FC] to-[#8335EC]">code</span> keep them.
          </h1>

          {/* Supporting Copy */}
          <p className="text-[#C4B5FD] text-sm sm:text-base md:text-lg max-w-xl mb-8 font-medium leading-relaxed">
            Lock money today. Release it automatically when your promise is fulfilled.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
            <button
              onClick={onOpenCreate}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#8335EC] via-[#A055FF] to-[#C084FC] text-white font-extrabold text-sm shadow-glowPurple hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-white" />
              <span>+ Create Promise</span>
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#8335EC]/30 text-[#C4B5FD] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-innerLight"
            >
              <Compass className="w-4 h-4 text-[#A055FF]" />
              <span>Explore Promises</span>
            </button>
          </div>

          {/* Core Value Micro Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[#8B5CF6] font-medium">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#A055FF]" />
              <span className="text-[#C4B5FD]">Smart Contract Escrow</span>
            </div>
            <span className="text-[#8335EC]/50">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="text-[#C4B5FD]">Verifiable Conditions</span>
            </div>
            <span className="text-[#8335EC]/50">•</span>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#A055FF]" />
              <span className="text-[#C4B5FD]">Instant MON Settlement</span>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Orbital Diagram 01 -> 02 -> 03 -> 04 */}
        <div className="lg:col-span-6 hidden lg:block relative py-8">
          
          {/* Outer Orbital Ring 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] rounded-full orbital-ring-outer pointer-events-none -rotate-12 animate-pulse-glow" />

          {/* Inner Orbital Ring 2 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[240px] rounded-full orbital-ring-inner pointer-events-none rotate-6" />

          {/* Central Glass Card: Monad Purple Theme */}
          <div className="relative z-20 max-w-xs mx-auto p-6 rounded-3xl glass-eye-primary border border-[#8335EC]/40 shadow-glowPurple text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold text-white font-mono tracking-wider">
                {isConnected ? 'CONNECTED WALLET' : 'TOTAL LOCKED MON'}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#A055FF] animate-node-ping" />
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <Lock className="w-5 h-5 text-[#A055FF]" />
              <span className="text-3xl font-extrabold text-[#A055FF] lime-text-glow font-mono">
                {displayAmount}
              </span>
              <span className="text-xs font-bold text-[#C084FC] font-mono">MON</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#C4B5FD]">
                <span>STATUS</span>
                <span className="text-[#A055FF] font-bold">
                  {isConnected ? '● Wallet Connected' : '● Contract Escrow Active'}
                </span>
              </div>
              <p className="text-[10px] text-[#8B5CF6] font-mono">
                {isConnected ? 'Live Monad Wallet Balance' : 'Real Smart Contract State'}
              </p>
            </div>
          </div>

          {/* Orbital Floating Node 01: CREATE */}
          <div className="absolute top-6 left-12 z-30 flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-[#130924] border border-[#8335EC]/50 flex items-center justify-center text-white shadow-glowPurple hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5 text-[#A055FF]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#A055FF] mt-1">01</span>
            <span className="text-xs font-extrabold text-white">CREATE</span>
            <span className="text-[10px] text-[#8B5CF6]">Promise Created</span>
          </div>

          {/* Orbital Floating Node 02: LOCK */}
          <div className="absolute -top-4 right-32 z-30 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#130924] border border-[#C084FC]/50 flex items-center justify-center text-white shadow-glowEmerald hover:scale-110 transition-transform">
              <Lock className="w-5 h-5 text-[#C084FC]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#C084FC] mt-1">02</span>
            <span className="text-xs font-extrabold text-white">LOCK</span>
            <span className="text-[10px] text-[#8B5CF6]">Funds Secured</span>
          </div>

          {/* Orbital Floating Node 03: VERIFY */}
          <div className="absolute top-10 right-2 z-30 flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-[#130924] border border-[#8335EC]/50 flex items-center justify-center text-white shadow-glowPurple hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5 text-[#A055FF]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#A055FF] mt-1">03</span>
            <span className="text-xs font-extrabold text-white">VERIFY</span>
            <span className="text-[10px] text-[#8B5CF6]">Conditions Verified</span>
          </div>

          {/* Orbital Floating Node 04: RELEASE */}
          <div className="absolute bottom-2 left-44 z-30 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#130924] border border-[#C084FC]/50 flex items-center justify-center text-white shadow-glowEmerald hover:scale-110 transition-transform">
              <ArrowUpRightFromSquare className="w-5 h-5 text-[#C084FC]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#C084FC] mt-1">04</span>
            <span className="text-xs font-extrabold text-white">RELEASE</span>
            <span className="text-[10px] text-[#8B5CF6]">Funds Released</span>
          </div>

        </div>

      </div>
    </section>
  );
};
