import React from 'react';
import { GraduationCap, Calendar, Briefcase, Trophy, Target, CheckCircle2 } from 'lucide-react';

export type PromiseTypeKey = 'graduation' | 'milestone' | 'competition' | 'date' | 'custom';

interface PromiseTypeOption {
  key: PromiseTypeKey;
  label: string;
  icon: React.ElementType;
  description: string;
  badge: string;
  color: string;
  glowColor: string;
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
      badge: '🎓 Education',
      color: 'from-[#CFFF00] via-[#B8F000] to-[#19D98B]',
      glowColor: 'shadow-glowLime',
    },
    {
      key: 'milestone',
      label: 'Milestone',
      icon: Briefcase,
      description: 'Project deliverable or code approval',
      badge: '💼 Deliverable',
      color: 'from-[#19D98B] to-[#00C878]',
      glowColor: 'shadow-glowEmerald',
    },
    {
      key: 'competition',
      label: 'Competition',
      icon: Trophy,
      description: 'Winner prize pool distribution',
      badge: '🏆 Tournament',
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      glowColor: 'shadow-glowViolet',
    },
    {
      key: 'date',
      label: 'Date / Time',
      icon: Calendar,
      description: 'Unlock automatically on a future date',
      badge: '📅 Time-Lock',
      color: 'from-[#CFFF00] to-[#F4E04D]',
      glowColor: 'shadow-glowLime',
    },
    {
      key: 'custom',
      label: 'Custom Goal',
      icon: Target,
      description: 'User-defined goal or commitment',
      badge: '🎯 Personal',
      color: 'from-[#19D98B] via-[#8B5CF6] to-[#CFFF00]',
      glowColor: 'shadow-glowEmerald',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
          Select Promise Template
        </label>
        <span className="text-[11px] text-[#CFFF00] font-medium font-mono">5 Smart Templates Active</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {options.map((opt) => {
          const IconComp = opt.icon;
          const isSelected = selectedType === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectType(opt.key)}
              className={`relative flex flex-col justify-between p-4 rounded-2xl transition-all duration-300 text-left group overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#121820] via-[#0C1015] to-[#05070A] border-2 border-[#CFFF00] ' + opt.glowColor + ' transform -translate-y-1'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#CFFF00]/30 hover:-translate-y-0.5'
              }`}
            >
              {/* Subtle hover background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#CFFF00]/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity" />

              <div>
                {/* Top Badge & Checkmark */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-white/[0.05] text-[#9AA4B2] border border-white/10">
                    {opt.badge}
                  </span>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#CFFF00] text-[#05070A] flex items-center justify-center font-extrabold shadow-sm animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Template Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${opt.color} p-[1px] mb-3 shadow-md group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-[#0C1015] rounded-[11px] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-sm font-extrabold text-white mb-1 tracking-tight group-hover:text-[#CFFF00] transition-colors">
                  {opt.label}
                </h4>
                <p className="text-[11px] text-[#9AA4B2] leading-snug font-medium">
                  {opt.description}
                </p>
              </div>

              {/* Bottom active indicator bar */}
              <div className={`mt-3 h-1 w-full rounded-full transition-all duration-300 ${
                isSelected ? 'bg-gradient-to-r from-[#CFFF00] to-[#19D98B]' : 'bg-transparent'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
