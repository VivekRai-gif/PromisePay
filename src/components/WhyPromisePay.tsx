import React from 'react';
import { Lock, GitBranch, Zap, Sparkles } from 'lucide-react';

export const WhyPromisePay: React.FC = () => {
  const cards = [
    {
      title: 'Trustless',
      description: 'Funds are committed upfront and locked inside Monad smart contracts.',
      icon: Lock,
      gradient: 'from-purple-500/20 to-indigo-500/20',
      iconColor: 'text-purple-300',
      borderColor: 'group-hover:border-purple-400/40',
    },
    {
      title: 'Conditional',
      description: 'Money moves only when predefined milestones or criteria are verified.',
      icon: GitBranch,
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-300',
      borderColor: 'group-hover:border-pink-400/40',
    },
    {
      title: 'Automatic',
      description: 'No chasing. No reminders. No manual settlement or follow-ups.',
      icon: Zap,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-300',
      borderColor: 'group-hover:border-emerald-400/40',
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/15 text-purple-200 text-xs font-semibold mb-2 border border-purple-400/25">
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
              className={`group p-6 sm:p-7 rounded-3xl glass-panel border border-white/12 ${card.borderColor} transition-all duration-300 hover:-translate-y-1 shadow-frostedCard`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 border border-white/10`}>
                <IconComp className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
