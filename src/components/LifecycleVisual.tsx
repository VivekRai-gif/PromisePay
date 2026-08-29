import React, { useState } from 'react';
import { Sparkles, Lock, ShieldCheck, CheckCircle2, ArrowRight, Info, Cpu } from 'lucide-react';

export const LifecycleVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      name: 'CREATE PROMISE',
      tag: 'STAGE 01',
      icon: Sparkles,
      color: 'from-[#8335EC] to-[#A055FF]',
      borderColor: 'border-[#A055FF]/50',
      badgeColor: 'bg-[#8335EC]/25 text-[#A055FF]',
      description: 'Define recipient wallet, native MON amount, and promise condition.',
      detail: 'The sender commits to a real-world promise by specifying clear release criteria.',
    },
    {
      id: 2,
      name: 'LOCK FUNDS',
      tag: 'STAGE 02',
      icon: Lock,
      color: 'from-[#A055FF] to-[#C084FC]',
      borderColor: 'border-[#C084FC]/50',
      badgeColor: 'bg-[#A055FF]/25 text-[#C084FC]',
      description: 'MON is transferred & locked into the PromisePay smart contract.',
      detail: 'Funds are securely escrowed. No party can alter or withdraw arbitrarily.',
    },
    {
      id: 3,
      name: 'VERIFY CONDITION',
      tag: 'STAGE 03',
      icon: ShieldCheck,
      color: 'from-[#8335EC] to-[#9333EA]',
      borderColor: 'border-[#8335EC]/50',
      badgeColor: 'bg-[#8335EC]/25 text-[#A055FF]',
      description: 'Predefined condition is verified on Monad Testnet.',
      detail: 'Verification state updates on-chain once milestone criteria are met.',
    },
    {
      id: 4,
      name: 'RELEASE & SETTLE',
      tag: 'STAGE 04',
      icon: CheckCircle2,
      color: 'from-[#A055FF] to-[#C084FC]',
      borderColor: 'border-[#C084FC]/50',
      badgeColor: 'bg-[#C084FC]/25 text-[#C084FC]',
      description: 'Recipient clicks Claim and receives native MON directly.',
      detail: 'Money remembers the promise and transfers automatically without manual chasing.',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-eye-primary border border-[#8335EC]/35 shadow-card mb-10">
      {/* Circuit background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-hero-glow" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#A055FF] uppercase tracking-wider mb-1 font-mono">
            <Cpu className="w-3.5 h-3.5 text-[#A055FF]" />
            <span>Protocol Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Programmable Commitment Lifecycle
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#8335EC]/30 text-[11px] text-[#C4B5FD]">
          <Info className="w-3.5 h-3.5 text-[#A055FF]" />
          <span>Hover stages to inspect</span>
        </div>
      </div>

      {/* Circuit Protocol Nodes Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isSelected = activeStep === idx;

          return (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(idx)}
              className={`relative flex flex-col p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#180E2E]/90 border ' + step.borderColor + ' shadow-glowPurple transform -translate-y-1'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-[#8335EC]/30'
              }`}
            >
              {/* Top Tag & Connecting Arrow */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono ${step.badgeColor}`}>
                  {step.tag}
                </span>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A055FF] animate-node-ping" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-3 shadow-md`}>
                <div className="w-full h-full bg-[#130924] rounded-[15px] flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-extrabold text-white mb-1 tracking-tight">{step.name}</h3>
              <p className="text-xs text-[#C4B5FD] font-normal leading-relaxed">{step.description}</p>

              {/* Detail drawer on hover */}
              {isSelected && (
                <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#A055FF] font-medium animate-fadeIn">
                  {step.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
