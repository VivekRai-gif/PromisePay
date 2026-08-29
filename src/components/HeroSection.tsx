import React from 'react';
import { Plus, Compass, Lock, ShieldCheck, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreate, onExplore }) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Soft Ambient Neon Lime & Emerald Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[300px] bg-gradient-to-tr from-[#CFFF00]/15 via-[#19D98B]/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[280px] bg-gradient-to-br from-[#8B5CF6]/15 via-[#19D98B]/10 to-[#05070A]/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Asymmetric 2-Column Desktop Composition */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline, Copy & CTAs */}
        <div className="lg:col-span-7 text-left">
          
          {/* Protocol Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFFF00]/10 border border-[#CFFF00]/30 text-[#CFFF00] text-xs font-semibold mb-6 shadow-innerHighlight backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#CFFF00] fill-[#CFFF00]/20 animate-node-pulse" />
            <span>Programmable Money Protocol on Monad</span>
          </div>

          {/* Headline (EXACTLY UNCHANGED TEXT) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
            Make promises. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CFFF00] to-[#19D98B]">
              Let code keep them.
            </span>
          </h1>

          {/* Supporting Copy (EXACTLY UNCHANGED TEXT) */}
          <p className="text-[#9AA4B2] text-sm sm:text-base md:text-lg max-w-xl mb-8 font-medium leading-relaxed">
            Lock money today. Release it automatically when your promise is fulfilled.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
            <button
              onClick={onOpenCreate}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#CFFF00] via-[#B8F000] to-[#19D98B] text-[#05070A] font-extrabold text-sm shadow-glowLime hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-[#05070A]" />
              <span>+ Create Promise</span>
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/12 text-[#9AA4B2] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-innerHighlight"
            >
              <Compass className="w-4 h-4 text-[#CFFF00]" />
              <span>Explore Promises</span>
            </button>
          </div>

          {/* Value Micro Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#CFFF00]" />
              <span className="text-[#9AA4B2]">Smart Contract Escrow</span>
            </div>
            <span className="text-[#19D98B]/40">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#19D98B]" />
              <span className="text-[#9AA4B2]">Verifiable Conditions</span>
            </div>
            <span className="text-[#19D98B]/40">•</span>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="text-[#9AA4B2]">Instant MON Settlement</span>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Futuristic Protocol Live Card (Desktop) */}
        <div className="lg:col-span-5 hidden lg:block relative">
          
          {/* Decorative Circuit Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#CFFF00]/30 via-[#19D98B]/30 to-[#8B5CF6]/20 rounded-3xl blur-xl opacity-75 animate-pulse-slow" />

          {/* Glass Protocol Card */}
          <div className="relative rounded-3xl p-6 sm:p-7 glass-lime-primary shadow-card border border-[#CFFF00]/20 animate-float-slow">
            
            {/* Header Tag */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CFFF00] animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  PROMISEPAY CONTRACT
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-[#CFFF00]/15 text-[#CFFF00] border border-[#CFFF00]/30">
                🔒 LOCKED ESCROW
              </span>
            </div>

            {/* Promise Visual Representation */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#10151B] to-[#05070A] border border-white/10 mb-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">🎓 Graduation Promise</h3>
                  <p className="text-xs text-[#9AA4B2] font-mono">To: 0x829F...A91C</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#CFFF00] lime-glow block">10.00</span>
                  <span className="text-xs font-bold text-[#19D98B]">MON</span>
                </div>
              </div>

              {/* Protocol Flow Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#CFFF00]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19D98B]" />
                  <span>Condition: Graduation</span>
                </div>
                <span className="text-[#19D98B] font-bold">MONAD TESTNET</span>
              </div>
            </div>

            {/* Micro Live Network Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#64748B] block font-medium">Smart Contract</span>
                <span className="font-mono text-white text-[11px] font-bold block mt-0.5 truncate">
                  0x829F...A91C
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-[#64748B] block font-medium">State Machine</span>
                <span className="font-semibold text-[#19D98B] text-[11px] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19D98B]" />
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
