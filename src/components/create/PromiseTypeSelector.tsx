import React from 'react';
import { GraduationCap, Calendar, Briefcase, Trophy, Target, CheckCircle2 } from 'lucide-react';

export type PromiseTypeKey = 'graduation' | 'milestone' | 'competition' | 'date' | 'custom';

interface PromiseTypeOption {
  key: PromiseTypeKey;
  label: string;
  icon: React.ElementType;
  description: string;
  isAvailable: boolean;
  color: string;
}

interface PromiseTypeSelectorProps {
  selectedType: PromiseTypeKey;
  onSelectType: (type: PromiseTypeKey) => void;
}

export const PromiseTypeSelector: React.FC<PromiseTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const options: PromiseTypeOption[] = [
    {
      key: 'graduation',
      label: '🎓 Graduation',
      icon: GraduationCap,
      description: 'Release when degree or cert is verified',
      isAvailable: true,
      color: 'from-[#CFFF00] to-[#19D98B]',
    },
    {
      key: 'milestone',
      label: '💼 Milestone',
      icon: Briefcase,
      description: 'Project deliverable approval',
      isAvailable: true,
      color: 'from-[#19D98B] to-[#00C878]',
    },
    {
      key: 'competition',
      label: '🏆 Competition',
      icon: Trophy,
      description: 'Winner prize pool distribution',
      isAvailable: true,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
    },
    {
      key: 'date',
      label: '📅 Date / Time',
      icon: Calendar,
      description: 'Unlock automatically on a future date',
      isAvailable: true,
      color: 'from-[#CFFF00] to-[#B8F000]',
    },
    {
      key: 'custom',
      label: '🎯 Custom Goal',
      icon: Target,
      description: 'User-defined goal or commitment',
      isAvailable: true,
      color: 'from-[#19D98B] to-[#8B5CF6]',
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider">
        Promise Template
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((opt) => {
          const IconComp = opt.icon;
          const isSelected = selectedType === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectType(opt.key)}
              className={`relative flex flex-col p-3.5 rounded-2xl transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-gradient-to-br from-[#10151B] via-[#0C1015] to-[#05070A] border-2 border-[#CFFF00] shadow-glowLime'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#CFFF00] text-[#05070A] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}

              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${opt.color} p-[1px] mb-2.5`}>
                <div className="w-full h-full bg-[#0C1015] rounded-[11px] flex items-center justify-center">
                  <IconComp className="w-4 h-4 text-white" />
                </div>
              </div>

              <span className="text-xs font-bold text-white mb-0.5">{opt.label}</span>
              <span className="text-[10px] text-[#9AA4B2] leading-tight">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
