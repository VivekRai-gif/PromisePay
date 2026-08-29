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
      color: 'from-purple-500 to-indigo-500',
    },
    {
      key: 'date',
      label: 'Date / Time',
      icon: Calendar,
      description: 'Unlock automatically on a future date',
      isAvailable: true,
      color: 'from-pink-500 to-rose-500',
    },
    {
      key: 'milestone',
      label: 'Milestone',
      icon: Briefcase,
      description: 'Project deliverable approval',
      isAvailable: false,
      color: 'from-amber-500 to-orange-500',
    },
    {
      key: 'competition',
      label: 'Competition',
      icon: Trophy,
      description: 'Winner prize pool distribution',
      isAvailable: false,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      key: 'custom',
      label: 'Custom',
      icon: Target,
      description: 'User-defined custom condition',
      isAvailable: false,
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
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
              className={`relative flex flex-col p-4 rounded-2xl transition-all duration-300 text-left ${
                !opt.isAvailable
                  ? 'opacity-40 cursor-not-allowed bg-white/[0.02] border border-white/5'
                  : isSelected
                  ? 'bg-gradient-to-br from-purple-950/80 via-purple-900/50 to-pink-950/70 border-2 border-purple-400 shadow-mauveGlow'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-purple-400 text-[#110D1B] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Coming Soon Tag */}
              {!opt.isAvailable && (
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/10 text-slate-400">
                  Soon
                </span>
              )}

              <div className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${opt.color} p-[1px] mb-3 shadow-md`}>
                <div className="w-full h-full bg-[#181226] rounded-[14px] flex items-center justify-center">
                  <IconComp className="w-4.5 h-4.5 text-white" />
                </div>
              </div>

              <span className="text-xs font-bold text-white mb-0.5">{opt.label}</span>
              <span className="text-[10px] text-slate-300 leading-tight">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
