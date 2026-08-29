import React from 'react';
import { Plus, Compass, Lock, ShieldCheck, Zap, CheckCircle2, Edit3, ArrowUpRightFromSquare } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
  isConnected?: boolean;
  connectedBalance?: number;
  totalLocked?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCreate,
  onExplore,
  isConnected = false,
  connectedBalance = 0,
  totalLocked = 0,
}) => {
  const displayAmount = isConnected
    ? (typeof connectedBalance === 'number' && !isNaN(connectedBalance) ? connectedBalance : 0).toFixed(2)
    : (typeof totalLocked === 'number' && !isNaN(totalLocked) ? totalLocked : 0).toFixed(2);

  return (
    <section className="relative pt-6 pb-14 overflow-hidden">
      {/* Background Soft Glow Falloff */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[300px] bg-gradient-to-tr from-[#A3E635]/15 via-[#10B981]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Asymmetric 2-Column Desktop Composition (Matches Reference Image) */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline, Copy & CTAs */}
        <div className="lg:col-span-6 text-left">
          
          {/* Protocol Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold mb-6 backdrop-blur-md shadow-innerLight">
            <Zap className="w-3.5 h-3.5 text-[#A3E635] fill-[#A3E635]/20 animate-node-ping" />
            <span>Programmable Money on Monad Testnet</span>
          </div>

          {/* Headline (Matches Reference Image with "code" green text) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
            Make promises. <br className="hidden sm:inline" />
            Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981]">code</span> keep them.
          </h1>

          {/* Supporting Copy */}
          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-xl mb-8 font-medium leading-relaxed">
            Lock money today. Release it automatically when your promise is fulfilled.
          </p>

          {/* Action Buttons (Matches Reference Image) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
            <button
              onClick={onOpenCreate}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#A3E635] via-[#B8F000] to-[#10B981] text-[#05070A] font-extrabold text-sm shadow-glowLime hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-[#05070A]" />
              <span>+ Create Promise</span>
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-[#94A3B8] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-innerLight"
            >
              <Compass className="w-4 h-4 text-[#A3E635]" />
              <span>Explore Promises</span>
            </button>
          </div>

          {/* Core Value Micro Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#A3E635]" />
              <span className="text-[#94A3B8]">Smart Contract Escrow</span>
            </div>
            <span className="text-[#10B981]/40">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#94A3B8]">Verifiable Conditions</span>
            </div>
            <span className="text-[#10B981]/40">•</span>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#A3E635]" />
              <span className="text-[#94A3B8]">Instant MON Settlement</span>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Orbital Diagram 01 -> 02 -> 03 -> 04 (Matches Reference Image) */}
        <div className="lg:col-span-6 hidden lg:block relative py-8">
          
          {/* Outer Orbital Ring 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] rounded-full orbital-ring-outer pointer-events-none -rotate-12 animate-pulse-glow" />

          {/* Inner Orbital Ring 2 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[240px] rounded-full orbital-ring-inner pointer-events-none rotate-6" />

          {/* Central Glass Card: Real Calculated MON Data */}
          <div className="relative z-20 max-w-xs mx-auto p-6 rounded-3xl glass-eye-primary border border-[#A3E635]/30 shadow-card text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold text-white font-mono tracking-wider">
                {isConnected ? 'CONNECTED WALLET' : 'TOTAL LOCKED MON'}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] animate-node-ping" />
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <Lock className="w-5 h-5 text-[#A3E635]" />
              <span className="text-3xl font-extrabold text-[#A3E635] lime-text-glow">
                {displayAmount}
              </span>
              <span className="text-xs font-bold text-[#10B981] font-mono">MON</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8]">
                <span>STATUS</span>
                <span className="text-[#A3E635] font-bold">
                  {isConnected ? '● Wallet Connected' : '● Contract Escrow Active'}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] font-mono">
                {isConnected ? 'Live Monad Wallet Balance' : 'Real Smart Contract State'}
              </p>
            </div>
          </div>

          {/* Orbital Floating Node 01: CREATE */}
          <div className="absolute top-6 left-12 z-30 flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-[#0E1420] border border-[#A3E635]/40 flex items-center justify-center text-white shadow-glowLime hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5 text-[#A3E635]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#A3E635] mt-1">01</span>
            <span className="text-xs font-extrabold text-white">CREATE</span>
            <span className="text-[10px] text-[#64748B]">Promise Created</span>
          </div>

          {/* Orbital Floating Node 02: LOCK */}
          <div className="absolute -top-4 right-32 z-30 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#0E1420] border border-[#10B981]/40 flex items-center justify-center text-white shadow-glowEmerald hover:scale-110 transition-transform">
              <Lock className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#10B981] mt-1">02</span>
            <span className="text-xs font-extrabold text-white">LOCK</span>
            <span className="text-[10px] text-[#64748B]">Funds Secured</span>
          </div>

          {/* Orbital Floating Node 03: VERIFY */}
          <div className="absolute top-10 right-2 z-30 flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-[#0E1420] border border-[#A3E635]/40 flex items-center justify-center text-white shadow-glowLime hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5 text-[#A3E635]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#A3E635] mt-1">03</span>
            <span className="text-xs font-extrabold text-white">VERIFY</span>
            <span className="text-[10px] text-[#64748B]">Conditions Verified</span>
          </div>

          {/* Orbital Floating Node 04: RELEASE */}
          <div className="absolute bottom-2 left-44 z-30 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#0E1420] border border-[#10B981]/50 flex items-center justify-center text-white shadow-glowEmerald hover:scale-110 transition-transform">
              <ArrowUpRightFromSquare className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#10B981] mt-1">04</span>
            <span className="text-xs font-extrabold text-white">RELEASE</span>
            <span className="text-[10px] text-[#64748B]">Funds Released</span>
          </div>

        </div>

      </div>
    </section>
  );
};
