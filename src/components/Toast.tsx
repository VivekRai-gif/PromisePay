import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 lg:right-8 z-50 max-w-md animate-fadeIn">
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-lime-primary border border-[#CFFF00]/40 text-white shadow-glowLime text-xs font-semibold">
        <Sparkles className="w-4 h-4 text-[#CFFF00] shrink-0" />
        <span className="flex-1 font-mono text-[#F8FAFC]">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#9AA4B2] hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
