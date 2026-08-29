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
    <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Promise Lifecycle Tracker
        </h3>
        <span className="text-xs font-mono text-[#E38BB5]">
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
                    step.isDone ? 'bg-[#D95B9A]/60' : 'bg-white/10'
                  }`}
                />
              )}

              {/* Step Circle Icon */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.isDone
                    ? 'bg-gradient-to-r from-[#D95B9A] to-[#A984C4] text-white shadow-glowPink'
                    : step.isActive
                    ? 'bg-[#E38BB5] text-[#0B0A0D] ring-4 ring-[#E38BB5]/30 animate-pulse'
                    : 'bg-white/[0.05] text-[#8F8991] border border-white/10'
                }`}
              >
                <IconComp className="w-4 h-4" />
              </div>

              {/* Step Info */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold tracking-tight ${
                      step.isDone || step.isActive ? 'text-white' : 'text-[#8F8991]'
                    }`}
                  >
                    {step.label}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      step.isDone
                        ? 'bg-[#342031] text-[#E38BB5] border border-[#D95B9A]/30'
                        : step.isActive
                        ? 'bg-[#4B304F] text-[#E38BB5]'
                        : 'bg-white/[0.03] text-[#8F8991]'
                    }`}
                  >
                    {step.statusText}
                  </span>
                </div>
                <p className="text-xs text-[#C8C1C9] mt-0.5 font-normal">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
