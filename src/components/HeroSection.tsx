import React from 'react';
import { Plus, Compass, Lock, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreate, onExplore }) => {
  return (
    <section className="relative pt-6 pb-10 overflow-hidden">
      {/* Soft Mauve/Pink Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-gradient-to-tr from-[#7C647C]/30 via-[#C66B9B]/20 to-[#4B304F]/25 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#342031]/60 border border-[#D95B9A]/30 text-[#E38BB5] text-xs font-semibold mb-6 shadow-card backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#D95B9A] fill-[#D95B9A]/20 animate-pulse" />
          <span>Programmable Money on Monad Testnet</span>
        </div>

        {/* Large Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
          Make promises. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E38BB5] to-[#A984C4]">
            Let code keep them.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-[#C8C1C9] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Lock money today. Release it automatically when your promise is fulfilled.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenCreate}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D95B9A] via-[#C66B9B] to-[#A984C4] text-white font-bold text-sm shadow-glowPink hover:opacity-95 transition-all duration-300 active:scale-95 group"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-white" />
            <span>Create Promise</span>
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/12 text-[#C8C1C9] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#A984C4]" />
            <span>Explore Promises</span>
          </button>
        </div>

        {/* Core Value Micro Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#8F8991] font-medium">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#A984C4]" />
            <span>Smart Contract Escrow</span>
          </div>
          <span className="text-[#625E65] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Verifiable Conditions</span>
          </div>
          <span className="text-[#625E65] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D95B9A]" />
            <span>Instant MON Settlement</span>
          </div>
        </div>
      </div>
    </section>
  );
};
