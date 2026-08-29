import React, { useState } from 'react';
import { Sparkles, Lock, ShieldCheck, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export const LifecycleVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      name: 'CREATE PROMISE',
      tag: 'Step 01',
      icon: Sparkles,
      color: 'from-[#D95B9A] to-[#A984C4]',
      borderColor: 'border-[#D95B9A]/40',
      badgeColor: 'bg-[#4B304F]/60 text-[#E38BB5]',
      description: 'Define recipient wallet, native MON amount, and promise condition.',
      detail: 'The sender commits to a real-world promise by specifying clear release criteria.',
    },
    {
      id: 2,
      name: 'LOCK FUNDS',
      tag: 'Step 02',
      icon: Lock,
      color: 'from-[#C66B9B] to-[#4B304F]',
      borderColor: 'border-[#C66B9B]/40',
      badgeColor: 'bg-[#342031]/80 text-[#E38BB5]',
      description: 'MON is transferred & locked into the PromisePay smart contract.',
      detail: 'Funds are securely escrowed. No party can alter or withdraw arbitrarily.',
    },
    {
      id: 3,
      name: 'VERIFY CONDITION',
      tag: 'Step 03',
      icon: ShieldCheck,
      color: 'from-[#A984C4] to-[#765878]',
      borderColor: 'border-[#A984C4]/40',
      badgeColor: 'bg-[#4B304F]/60 text-[#A984C4]',
      description: 'Predefined condition is verified on Monad Testnet.',
      detail: 'Verification state updates on-chain once milestone criteria are met.',
    },
    {
      id: 4,
      name: 'CLAIM & SETTLE',
      tag: 'Step 04',
      icon: CheckCircle2,
      color: 'from-emerald-400 to-teal-500',
      borderColor: 'border-emerald-500/40',
      badgeColor: 'bg-emerald-500/15 text-emerald-300',
      description: 'Recipient clicks Claim and receives native MON directly.',
      detail: 'Money remembers the promise and transfers automatically without manual chasing.',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-card mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E38BB5] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How PromisePay Works</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Programmable Commitment Lifecycle
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-[#C8C1C9]">
          <Info className="w-3.5 h-3.5 text-[#A984C4]" />
          <span>Hover steps to explore</span>
        </div>
      </div>

      {/* Grid of 4 Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isSelected = activeStep === idx;

          return (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(idx)}
              className={`relative flex flex-col p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#211722]/80 border ' + step.borderColor + ' shadow-glowPink'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
              }`}
            >
              {/* Top Tag & Connector Arrow (Desktop) */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${step.badgeColor}`}>
                  {step.tag}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-4 h-4 text-[#8F8991]" />
                )}
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} p-[1px] mb-3 shadow-md`}>
                <div className="w-full h-full bg-[#121016] rounded-[11px] flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-white mb-1 tracking-tight">{step.name}</h3>
              <p className="text-xs text-[#C8C1C9] font-normal leading-relaxed">{step.description}</p>

              {/* Detail drawer on hover */}
              {isSelected && (
                <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#E38BB5] animate-fadeIn">
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
