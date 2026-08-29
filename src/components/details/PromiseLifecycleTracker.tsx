import React from 'react';
import { PromiseStatus } from '../../types';
import { CheckCircle2, Lock, ShieldCheck, Coins } from 'lucide-react';

interface PromiseLifecycleTrackerProps {
  status: PromiseStatus;
}

export const PromiseLifecycleTracker: React.FC<PromiseLifecycleTrackerProps> = ({ status }) => {
  const isCreatedDone = true;
  const isLockedDone = true;
  const isVerifiedDone = status === 'VERIFIED' || status === 'CLAIMABLE' || status === 'FULFILLED';
  const isClaimedDone = status === 'FULFILLED';

  const steps = [
    {
      label: 'Promise Created',
      description: 'Terms defined and initiated',
      statusText: 'Completed',
      isDone: isCreatedDone,
      isActive: false,
      icon: CheckCircle2,
    },
    {
      label: 'Funds Locked',
      description: 'MON escrowed in smart contract',
      statusText: 'Completed',
      isDone: isLockedDone,
      isActive: status === 'LOCKED',
      icon: Lock,
    },
    {
      label: 'Condition Verification',
      description: 'Graduation criteria verified',
      statusText: isVerifiedDone ? 'Completed' : 'Pending Action',
      isDone: isVerifiedDone,
      isActive: status === 'LOCKED',
      icon: ShieldCheck,
    },
    {
      label: 'Claim Funds',
      description: 'MON transferred to recipient',
      statusText: isClaimedDone ? 'Claimed & Settled' : isVerifiedDone ? 'Ready to Claim' : 'Waiting on Verification',
      isDone: isClaimedDone,
      isActive: isVerifiedDone && !isClaimedDone,
      icon: Coins,
    },
  ];

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-lime-primary border border-white/10 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Promise Lifecycle Tracker
        </h3>
        <span className="text-xs font-mono text-[#CFFF00]">
          State: <strong className="text-white">{status}</strong>
        </span>
      </div>

      {/* Vertical Step Timeline */}
      <div className="relative space-y-6">
        {steps.map((step, idx) => {
          const IconComp = step.icon;

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 w-0.5 h-full -ml-[1px] transition-colors duration-500 ${
                    step.isDone ? 'bg-[#CFFF00]/60' : 'bg-white/10'
                  }`}
                />
              )}

              {/* Step Circle Icon */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.isDone
                    ? 'bg-gradient-to-r from-[#CFFF00] to-[#19D98B] text-[#05070A] shadow-glowLime font-extrabold'
                    : step.isActive
                    ? 'bg-[#CFFF00] text-[#05070A] ring-4 ring-[#CFFF00]/30 animate-pulse font-extrabold'
                    : 'bg-white/[0.04] text-[#64748B] border border-white/10'
                }`}
              >
                <IconComp className="w-4 h-4" />
              </div>

              {/* Step Info */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold tracking-tight ${
                      step.isDone || step.isActive ? 'text-white' : 'text-[#64748B]'
                    }`}
                  >
                    {step.label}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      step.isDone
                        ? 'bg-[#CFFF00]/15 text-[#CFFF00] border border-[#CFFF00]/30'
                        : step.isActive
                        ? 'bg-[#19D98B]/15 text-[#19D98B]'
                        : 'bg-white/[0.03] text-[#64748B]'
                    }`}
                  >
                    {step.statusText}
                  </span>
                </div>
                <p className="text-xs text-[#9AA4B2] mt-0.5 font-normal">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
