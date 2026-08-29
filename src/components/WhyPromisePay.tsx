import React from 'react';
import { Lock, GitBranch, Zap, Sparkles } from 'lucide-react';

export const WhyPromisePay: React.FC = () => {
  const cards = [
    {
      title: 'Trustless',
      description: 'Funds are committed upfront and locked inside Monad smart contracts.',
      icon: Lock,
      gradient: 'from-[#CFFF00]/15 via-[#19D98B]/10 to-transparent',
      iconColor: 'text-[#CFFF00]',
      borderColor: 'group-hover:border-[#CFFF00]/40',
      bgCard: 'bg-gradient-to-br from-[#10151B] to-[#05070A]',
    },
    {
      title: 'Conditional',
      description: 'Money moves only when predefined milestones or criteria are verified.',
      icon: GitBranch,
      gradient: 'from-[#19D98B]/15 via-[#00C878]/10 to-transparent',
      iconColor: 'text-[#19D98B]',
      borderColor: 'group-hover:border-[#19D98B]/40',
      bgCard: 'bg-gradient-to-br from-[#10151B] to-[#05070A]',
    },
    {
      title: 'Automatic',
      description: 'No chasing. No reminders. No manual settlement or follow-ups.',
      icon: Zap,
      gradient: 'from-[#8B5CF6]/15 via-[#7C3AED]/10 to-transparent',
      iconColor: 'text-[#8B5CF6]',
      borderColor: 'group-hover:border-[#8B5CF6]/40',
      bgCard: 'bg-gradient-to-br from-[#10151B] to-[#05070A]',
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFF00]/10 text-[#CFFF00] text-xs font-semibold mb-2 border border-[#CFFF00]/30 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why PromisePay</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Money that remembers your promises.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const IconComp = card.icon;

          return (
            <div
              key={idx}
              className={`group p-6 rounded-3xl ${card.bgCard} backdrop-blur-xl border border-white/10 ${card.borderColor} transition-all duration-300 hover:-translate-y-1 shadow-card`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 border border-white/10`}>
                <IconComp className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-xs text-[#9AA4B2] font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
