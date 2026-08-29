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
      <div className="flex items-center justify-around p-2.5 rounded-3xl bg-[#130924]/90 backdrop-blur-3xl border border-[#8335EC]/35 shadow-card">
        
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'bg-[#8335EC]/25 text-[#A055FF] font-bold border border-[#8335EC]/40 shadow-glowPurple'
              : 'text-[#8B5CF6] hover:text-white'
          }`}
        >
          <Home className="w-4 h-4 text-[#A055FF]" />
          <span className="text-xs">Home</span>
        </button>

        {/* My Promises Tab */}
        <button
          onClick={() => setActiveTab('promises')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all ${
            activeTab === 'promises'
              ? 'bg-[#8335EC]/25 text-[#A055FF] font-bold border border-[#8335EC]/40 shadow-glowPurple'
              : 'text-[#8B5CF6] hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span className="text-xs">Promises</span>
        </button>

        {/* Center Floating Create Action Button */}
        <button
          onClick={onOpenCreate}
          className="relative -top-5 flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-[#8335EC] via-[#A055FF] to-[#C084FC] p-3.5 text-white shadow-glowPurple hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-[#07040D]"
        >
          <Plus className="w-6 h-6 stroke-[3] text-white" />
        </button>

        {/* Activity Tab */}
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all ${
            activeTab === 'activity'
              ? 'bg-[#8335EC]/25 text-[#A055FF] font-bold border border-[#8335EC]/40 shadow-glowPurple'
              : 'text-[#8B5CF6] hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span className="text-xs">Activity</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all ${
            activeTab === 'profile'
              ? 'bg-[#8335EC]/25 text-[#A055FF] font-bold border border-[#8335EC]/40 shadow-glowPurple'
              : 'text-[#8B5CF6] hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-xs">Profile</span>
        </button>

      </div>
    </nav>
  );
};
