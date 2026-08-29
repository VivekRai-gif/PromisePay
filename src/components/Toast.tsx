import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex items-center gap-3 p-4 rounded-2xl bg-[#0F0D1B]/90 backdrop-blur-xl border border-purple-500/30 text-white shadow-2xl shadow-purple-950/50 animate-slideDown max-w-sm">
      <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <Sparkles className="w-4 h-4 text-purple-400" />
        )}
      </div>
      <span className="text-xs font-semibold text-slate-200 leading-snug">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
