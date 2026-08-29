import React from 'react';
import { Plus, Compass, Lock, ShieldCheck, Zap, ArrowUpRight, Sparkles, CheckCircle2, Coins } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreate, onExplore }) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Soft Ambient Mauve & Plum Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[300px] bg-gradient-to-tr from-[#5A2A61]/35 via-[#D9579D]/20 to-[#3A1E3B]/30 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[280px] bg-gradient-to-br from-[#A982C4]/25 via-[#C25D8E]/15 to-[#121017]/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Asymmetric 2-Column Desktop Composition */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline, Copy & CTAs */}
        <div className="lg:col-span-7 text-left">
          
          {/* Protocol Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A1E3B]/80 border border-[#D9579D]/35 text-[#E89AC1] text-xs font-semibold mb-6 shadow-innerGlow backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#D9579D] fill-[#D9579D]/20 animate-node-pulse" />
            <span>Programmable Money Protocol on Monad</span>
          </div>

          {/* Headline (EXACTLY UNCHANGED) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
            Make promises. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E89AC1] to-[#A982C4]">
              Let code keep them.
            </span>
          </h1>

          {/* Supporting Copy (EXACTLY UNCHANGED) */}
          <p className="text-[#AAA3AF] text-sm sm:text-base md:text-lg max-w-xl mb-8 font-medium leading-relaxed">
            Lock money today. Release it automatically when your promise is fulfilled.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
            <button
              onClick={onOpenCreate}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D9579D] via-[#E89AC1] to-[#A982C4] text-white font-bold text-sm shadow-glowPink hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-white" />
              <span>+ Create Promise</span>
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-[#AAA3AF] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-innerGlow"
            >
              <Compass className="w-4 h-4 text-[#A982C4]" />
              <span>Explore Promises</span>
            </button>
          </div>

          {/* Value Micro Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[#726B77] font-medium">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#A982C4]" />
              <span className="text-[#AAA3AF]">Smart Contract Escrow</span>
            </div>
            <span className="text-[#5A2A61]">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[#AAA3AF]">Verifiable Conditions</span>
            </div>
            <span className="text-[#5A2A61]">•</span>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D9579D]" />
              <span className="text-[#AAA3AF]">Instant MON Settlement</span>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Futuristic Protocol Live Card (Desktop) */}
        <div className="lg:col-span-5 hidden lg:block relative">
          
          {/* Decorative Circuit Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D9579D]/40 via-[#A982C4]/30 to-[#3A1E3B]/50 rounded-3xl blur-xl opacity-75 animate-pulse-slow" />

          {/* Glass Protocol Card */}
          <div className="relative rounded-3xl p-6 sm:p-7 glass-protocol-primary shadow-card border border-white/15 animate-float-slow">
            
            {/* Header Tag */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9579D] animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  PROMISEPAY CONTRACT
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-[#3A1E3B] text-[#E89AC1] border border-[#D9579D]/30">
                🔒 LOCKED ESCROW
              </span>
            </div>

            {/* Promise Visual Representation */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#241426]/80 to-[#0C0A14]/90 border border-white/10 mb-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">🎓 Graduation Promise</h3>
                  <p className="text-xs text-[#AAA3AF] font-mono">To: 0x829F...A91C</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-white mon-glow block">10.00</span>
                  <span className="text-xs font-bold text-[#E89AC1]">MON</span>
                </div>
              </div>

              {/* Protocol Flow Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#E89AC1]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9579D]" />
                  <span>Condition: Graduation</span>
                </div>
                <span className="text-emerald-400 font-bold">MONAD TESTNET</span>
              </div>
            </div>

            {/* Micro Live Network Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#726B77] block font-medium">Smart Contract</span>
                <span className="font-mono text-white text-[11px] font-bold block mt-0.5 truncate">
                  0x829F...A91C
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#726B77] block font-medium">State Machine</span>
                <span className="font-semibold text-emerald-300 text-[11px] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified & Ready
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
