import React from 'react';
import { GraduationCap, Calendar, Briefcase, Trophy, Target, CheckCircle2 } from 'lucide-react';

export type PromiseTypeKey = 'graduation' | 'date' | 'milestone' | 'competition' | 'custom';

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
      label: 'Graduation',
      icon: GraduationCap,
      description: 'Release when degree or cert is verified',
      isAvailable: true,
      color: 'from-[#D95B9A] to-[#A984C4]',
    },
    {
      key: 'date',
      label: 'Date / Time',
      icon: Calendar,
      description: 'Unlock automatically on a future date',
      isAvailable: true,
      color: 'from-[#C66B9B] to-[#765878]',
    },
    {
      key: 'milestone',
      label: 'Milestone',
      icon: Briefcase,
      description: 'Project deliverable approval',
      isAvailable: false,
      color: 'from-[#A984C4] to-[#4B304F]',
    },
    {
      key: 'competition',
      label: 'Competition',
      icon: Trophy,
      description: 'Winner prize pool distribution',
      isAvailable: false,
      color: 'from-[#E38BB5] to-[#7C647C]',
    },
    {
      key: 'custom',
      label: 'Custom',
      icon: Target,
      description: 'User-defined custom condition',
      isAvailable: false,
      color: 'from-[#765878] to-[#211722]',
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-[#8F8991] uppercase tracking-wider">
        Promise Type
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((opt) => {
          const IconComp = opt.icon;
          const isSelected = selectedType === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              disabled={!opt.isAvailable}
              onClick={() => opt.isAvailable && onSelectType(opt.key)}
              className={`relative flex flex-col p-3.5 rounded-2xl transition-all duration-300 text-left ${
                !opt.isAvailable
                  ? 'opacity-40 cursor-not-allowed bg-white/[0.02] border border-white/5'
                  : isSelected
                  ? 'bg-gradient-to-br from-[#342031] via-[#211722] to-[#151118] border-2 border-[#D95B9A] shadow-glowPink'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#D95B9A] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}

              {/* Coming Soon Tag */}
              {!opt.isAvailable && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/10 text-[#8F8991]">
                  Soon
                </span>
              )}

              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${opt.color} p-[1px] mb-2.5`}>
                <div className="w-full h-full bg-[#121016] rounded-[11px] flex items-center justify-center">
                  <IconComp className="w-4 h-4 text-white" />
                </div>
              </div>

              <span className="text-xs font-bold text-white mb-0.5">{opt.label}</span>
              <span className="text-[10px] text-[#C8C1C9] leading-tight">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
