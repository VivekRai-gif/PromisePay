import React from 'react';
import { PromiseTypeKey } from './PromiseTypeSelector';
import { Calendar, GraduationCap, Briefcase, Trophy, Target, Info } from 'lucide-react';

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
      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider">
        Condition Details
      </label>

      {/* Template 1: Graduation */}
      {promiseType === 'graduation' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-lime-primary border border-[#CFFF00]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#CFFF00]">
            <GraduationCap className="w-4 h-4 text-[#CFFF00]" />
            <span>🎓 Graduation Verification Template</span>
          </div>
          <p className="text-xs text-[#9AA4B2] leading-relaxed font-medium">
            Funds become claimable after degree completion or certification is verified on Monad Testnet.
          </p>

          <div className="pt-2">
            <label className="block text-[11px] text-[#64748B] font-semibold mb-1">
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

      {/* Template 2: Milestone */}
      {promiseType === 'milestone' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-lime-primary border border-[#19D98B]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#19D98B]">
            <Briefcase className="w-4 h-4 text-[#19D98B]" />
            <span>💼 Project Milestone Template</span>
          </div>
          <p className="text-xs text-[#9AA4B2] leading-relaxed font-medium">
            Escrowed MON is unlocked upon approval of a specific project milestone or code deliverable.
          </p>

          <div className="pt-2">
            <label className="block text-[11px] text-[#64748B] font-semibold mb-1">
              Milestone Objective:
            </label>
            <input
              type="text"
              value={customConditionText}
              onChange={(e) => onCustomConditionChange(e.target.value)}
              placeholder="e.g. Complete V1 Production Deployment & Audit"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>
      )}

      {/* Template 3: Competition */}
      {promiseType === 'competition' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-lime-primary border border-[#8B5CF6]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B5CF6]">
            <Trophy className="w-4 h-4 text-[#8B5CF6]" />
            <span>🏆 Competition Prize Pool Template</span>
          </div>
          <p className="text-xs text-[#9AA4B2] leading-relaxed font-medium">
            Locked prize pool automatically distributed to verified tournament or hackathon winners.
          </p>

          <div className="pt-2">
            <label className="block text-[11px] text-[#64748B] font-semibold mb-1">
              Tournament / Track Name:
            </label>
            <input
              type="text"
              value={customConditionText}
              onChange={(e) => onCustomConditionChange(e.target.value)}
              placeholder="e.g. Monad Blitz New Delhi V4 Winner"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>
      )}

      {/* Template 4: Date / Time-Lock */}
      {promiseType === 'date' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-lime-primary border border-[#CFFF00]/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#CFFF00]">
            <Calendar className="w-4 h-4 text-[#CFFF00]" />
            <span>📅 Time-Locked Date Template</span>
          </div>

          <div>
            <label className="block text-[11px] text-[#64748B] font-semibold mb-1">
              Unlock On Date:
            </label>
            <input
              type="date"
              value={unlockDate}
              onChange={(e) => onUnlockDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs font-semibold text-white color-scheme-dark"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#9AA4B2]">
            <Info className="w-3.5 h-3.5 text-[#CFFF00]" />
            <span>Funds will automatically become claimable after {unlockDate || '2026-08-29'}.</span>
          </div>
        </div>
      )}

      {/* Template 5: Goal / Custom */}
      {promiseType === 'custom' && (
        <div className="p-4 sm:p-5 rounded-2xl glass-lime-primary border border-[#19D98B]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#19D98B]">
            <Target className="w-4 h-4 text-[#19D98B]" />
            <span>🎯 Custom Goal Template</span>
          </div>
          <p className="text-xs text-[#9AA4B2] leading-relaxed font-medium">
            Lock funds against any personal achievement, fitness milestone, or community commitment.
          </p>

          <div className="pt-2">
            <label className="block text-[11px] text-[#64748B] font-semibold mb-1">
              Goal Commitment Description:
            </label>
            <input
              type="text"
              value={customConditionText}
              onChange={(e) => onCustomConditionChange(e.target.value)}
              placeholder="e.g. Complete 30-Day Open Source Coding Streak"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>
      )}

    </div>
  );
};
