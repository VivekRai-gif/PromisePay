import React from 'react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { Calendar, GraduationCap, ShieldCheck, Info } from 'lucide-react';

interface ConditionSelectorProps {
  promiseType: PromiseTypeKey;
  unlockDate: string;
  onUnlockDateChange: (date: string) => void;
  customConditionText: string;
  onCustomConditionChange: (text: string) => void;
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  promiseType,
  unlockDate,
  onUnlockDateChange,
  customConditionText,
  onCustomConditionChange,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        Condition Details
      </label>

      {promiseType === 'date' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-pink-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-pink-300">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>Time-Locked Condition</span>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 font-semibold mb-1">
              Unlock On Date:
            </label>
            <input
              type="date"
              value={unlockDate}
              onChange={(e) => onUnlockDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs font-semibold text-white color-scheme-dark"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-pink-400" />
            <span>Funds will automatically become claimable after {unlockDate || '2026-08-29'}.</span>
          </div>
        </div>
      )}

      {promiseType === 'graduation' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-purple-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Graduation Verification</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Funds become claimable after the graduation condition is verified by the verifier or designated authority.
          </p>

          <div className="pt-2">
            <label className="block text-[11px] text-slate-400 font-semibold mb-1">
              Degree / Institution Note (Optional):
            </label>
            <input
              type="text"
              value={customConditionText}
              onChange={(e) => onCustomConditionChange(e.target.value)}
              placeholder="e.g. B.Tech Computer Science 2026"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};
