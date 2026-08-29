import React from 'react';
import { Lock, GitBranch, Zap, Sparkles } from 'lucide-react';

export const WhyPromisePay: React.FC = () => {
  const cards = [
    {
      title: 'Trustless',
      description: 'Funds are committed upfront and locked inside Monad smart contracts.',
      icon: Lock,
      gradient: 'from-[#D95B9A]/20 via-[#C66B9B]/15 to-transparent',
      iconColor: 'text-[#E38BB5]',
      borderColor: 'group-hover:border-[#D95B9A]/40',
      bgCard: 'bg-gradient-to-br from-[#211722] to-[#151118]',
    },
    {
      title: 'Conditional',
      description: 'Money moves only when predefined milestones or criteria are verified.',
      icon: GitBranch,
      gradient: 'from-[#C66B9B]/20 via-[#4B304F]/20 to-transparent',
      iconColor: 'text-[#E38BB5]',
      borderColor: 'group-hover:border-[#C66B9B]/40',
      bgCard: 'bg-gradient-to-br from-[#342031] to-[#19121A]',
    },
    {
      title: 'Automatic',
      description: 'No chasing. No reminders. No manual settlement or follow-ups.',
      icon: Zap,
      gradient: 'from-[#A984C4]/20 via-[#765878]/20 to-transparent',
      iconColor: 'text-[#A984C4]',
      borderColor: 'group-hover:border-[#A984C4]/40',
      bgCard: 'bg-gradient-to-br from-[#3A2338] to-[#171118]',
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#342031]/80 text-[#E38BB5] text-xs font-semibold mb-2 border border-[#D95B9A]/30">
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
              <p className="text-xs text-[#C8C1C9] font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
