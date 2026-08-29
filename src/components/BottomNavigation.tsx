import React from 'react';
import { Home, Lock, Plus, Activity, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCreate: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate,
}) => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <div className="flex items-center justify-around p-2.5 rounded-3xl bg-[#0F0D1B]/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-950/40">
        
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'home' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* My Promises Tab */}
        <button
          onClick={() => setActiveTab('promises')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'promises' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-5 h-5" />
          <span className="text-[10px]">Promises</span>
        </button>

        {/* Center Floating Create Action Button */}
        <button
          onClick={onOpenCreate}
          className="relative -top-5 flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-pink-600 p-3.5 text-white shadow-glow hover:shadow-glowPink hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-[#0A0812]"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Activity Tab */}
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'activity' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px]">Activity</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === 'profile' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </nav>
  );
};
