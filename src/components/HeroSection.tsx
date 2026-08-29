import React from 'react';
import { Plus, Compass, Lock, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreate, onExplore }) => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Soft floating background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-purple-600/25 via-pink-500/20 to-indigo-600/15 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-purple-400/30 text-purple-200 text-xs font-semibold mb-6 shadow-frostedCard backdrop-blur-xl">
          <Zap className="w-3.5 h-3.5 text-pink-400 fill-pink-400/20 animate-pulse" />
          <span>Programmable Money on Monad Testnet</span>
        </div>

        {/* Large Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
          Make promises. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-200">
            Let code keep them.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Lock money today. Release it automatically when your promise is fulfilled.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenCreate}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-sm shadow-mauveGlow hover:shadow-pinkGlow transition-all duration-300 active:scale-95 group"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>Create Promise</span>
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-slate-200 hover:text-white font-semibold text-sm backdrop-blur-xl transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Compass className="w-4 h-4 text-purple-300" />
            <span>Explore Promises</span>
          </button>
        </div>

        {/* Core Value Micro Pills */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Smart Contract Escrow</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verifiable Conditions</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <ArrowUpRight className="w-3.5 h-3.5 text-pink-400" />
            <span>Instant MON Settlement</span>
          </div>
        </div>
      </div>
    </section>
  );
};
