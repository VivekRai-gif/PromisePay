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
      color: 'from-[#CFFF00] to-[#19D98B]',
      borderColor: 'border-[#CFFF00]/40',
      badgeColor: 'bg-[#CFFF00]/10 text-[#CFFF00]',
      description: 'Define recipient wallet, native MON amount, and promise condition.',
      detail: 'The sender commits to a real-world promise by specifying clear release criteria.',
    },
    {
      id: 2,
      name: 'LOCK FUNDS',
      tag: 'STAGE 02',
      icon: Lock,
      color: 'from-[#19D98B] to-[#00C878]',
      borderColor: 'border-[#19D98B]/40',
      badgeColor: 'bg-[#19D98B]/15 text-[#19D98B]',
      description: 'MON is transferred & locked into the PromisePay smart contract.',
      detail: 'Funds are securely escrowed. No party can alter or withdraw arbitrarily.',
    },
    {
      id: 3,
      name: 'VERIFY CONDITION',
      tag: 'STAGE 03',
      icon: ShieldCheck,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      borderColor: 'border-[#8B5CF6]/40',
      badgeColor: 'bg-[#8B5CF6]/15 text-[#8B5CF6]',
      description: 'Predefined condition is verified on Monad Testnet.',
      detail: 'Verification state updates on-chain once milestone criteria are met.',
    },
    {
      id: 4,
      name: 'RELEASE & SETTLE',
      tag: 'STAGE 04',
      icon: CheckCircle2,
      color: 'from-[#CFFF00] to-[#B8F000]',
      borderColor: 'border-[#CFFF00]/40',
      badgeColor: 'bg-[#CFFF00]/15 text-[#CFFF00]',
      description: 'Recipient clicks Claim and receives native MON directly.',
      detail: 'Money remembers the promise and transfers automatically without manual chasing.',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-lime-primary shadow-card mb-10 border border-white/10">
      {/* Circuit background overlay */}
      <div className="absolute inset-0 circuit-grid pointer-events-none opacity-30" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#CFFF00] uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5 text-[#CFFF00]" />
            <span>Protocol Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Programmable Commitment Lifecycle
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-[#9AA4B2]">
          <Info className="w-3.5 h-3.5 text-[#8B5CF6]" />
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
                  ? 'bg-[#10151B]/90 border ' + step.borderColor + ' shadow-glowLime transform -translate-y-1'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
              }`}
            >
              {/* Top Tag & Connecting Arrow */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono ${step.badgeColor}`}>
                  {step.tag}
                </span>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF00] animate-node-pulse" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-3 shadow-md`}>
                <div className="w-full h-full bg-[#0C1015] rounded-[15px] flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-extrabold text-white mb-1 tracking-tight">{step.name}</h3>
              <p className="text-xs text-[#9AA4B2] font-normal leading-relaxed">{step.description}</p>

              {/* Detail drawer on hover */}
              {isSelected && (
                <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#CFFF00] font-medium animate-fadeIn">
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
