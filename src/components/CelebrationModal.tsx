import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ExternalLink, Sparkles, X, PartyPopper } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  txHash?: string;
  amount?: number | string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  title = 'Transaction Successful!',
  message = 'Your transaction has been executed and confirmed on Monad Testnet.',
  txHash,
  amount,
}) => {
  useEffect(() => {
    if (isOpen) {
      // 1. Launch Party Popper Confetti Cannon
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Party Popper bursts from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#8335EC', '#A055FF', '#C084FC', '#FF55D2', '#FFC800', '#00F0FF'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8335EC', '#A055FF', '#C084FC', '#FF55D2', '#FFC800', '#00F0FF'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const balloons = [
    { id: 1, emoji: '🎈', color: '#8335EC', left: '8%', delay: '0s', duration: '6s' },
    { id: 2, emoji: '🎈', color: '#A055FF', left: '22%', delay: '0.4s', duration: '5.5s' },
    { id: 3, emoji: '🎉', color: '#FF55D2', left: '38%', delay: '0.2s', duration: '6.2s' },
    { id: 4, emoji: '🎈', color: '#C084FC', left: '55%', delay: '0.7s', duration: '5.8s' },
    { id: 5, emoji: '🎈', color: '#8335EC', left: '72%', delay: '0.1s', duration: '6.5s' },
    { id: 6, emoji: '🥳', color: '#FFC800', left: '86%', delay: '0.5s', duration: '5.2s' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07040D]/85 backdrop-blur-md animate-fadeIn overflow-hidden">
      
      {/* Floating Celebration Balloons Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {balloons.map((b) => (
          <div
            key={b.id}
            className="absolute text-4xl sm:text-5xl animate-balloon-float"
            style={{
              left: b.left,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>

      {/* Main Glass Celebration Pop-up Card */}
      <div className="relative z-20 w-full max-w-md rounded-3xl p-6 sm:p-8 glass-eye-primary border border-[#8335EC]/50 shadow-glowPurple text-center transform transition-all scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#C4B5FD] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Party Popper Badge */}
        <div className="relative mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-tr from-[#8335EC] via-[#A055FF] to-[#C084FC] p-[2px] shadow-glowPurple flex items-center justify-center animate-bounce">
          <div className="w-full h-full rounded-full bg-[#130924] flex items-center justify-center">
            <PartyPopper className="w-10 h-10 text-[#A055FF]" />
          </div>
        </div>

        {/* Header Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
          <span>🎉</span>
          <span>{title}</span>
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-[#C4B5FD] font-medium leading-relaxed mb-6">
          {message}
        </p>

        {/* Amount Badge if present */}
        {amount && (
          <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-2xl bg-[#8335EC]/20 border border-[#8335EC]/40 mb-6 shadow-glowPurple font-mono">
            <span className="text-2xl font-extrabold text-[#A055FF] lime-text-glow">
              {amount}
            </span>
            <span className="text-xs font-bold text-[#C084FC]">MON</span>
          </div>
        )}

        {/* Transaction Hash Explorer Link */}
        {txHash && (
          <div className="mb-6 p-3 rounded-2xl bg-[#07040D]/80 border border-[#8335EC]/30 flex items-center justify-between text-xs font-mono">
            <span className="text-[#8B5CF6]">Tx Hash:</span>
            <a
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#A055FF] hover:underline font-bold"
            >
              <span>{txHash.length > 16 ? `${txHash.slice(0, 8)}...${txHash.slice(-6)}` : txHash}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Awesome CTA Button */}
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#8335EC] via-[#A055FF] to-[#C084FC] hover:opacity-95 text-white font-extrabold text-xs shadow-glowPurple transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Awesome! Continue 🚀</span>
        </button>

      </div>
    </div>
  );
};
