import React, { useState, useEffect } from 'react';
import {
  MOCK_STATS,
  INITIAL_PROMISES,
  INITIAL_ACTIVITIES,
} from './data/mockData';
import { PromiseItem, ActivityItem, StatsData } from './types';
import { useMonadWallet } from './hooks/useMonadWallet';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCard } from './components/StatsCard';
import { LifecycleVisual } from './components/LifecycleVisual';
import { QuickActions } from './components/QuickActions';
import { ActivePromises } from './components/ActivePromises';
import { WhyPromisePay } from './components/WhyPromisePay';
import { RecentActivity } from './components/RecentActivity';
import { BottomNavigation } from './components/BottomNavigation';
import { Toast } from './components/Toast';
import { CreatePromisePage } from './pages/CreatePromisePage';
import { PromiseDetailsPage } from './pages/PromiseDetailsPage';
import { ActivityPage } from './pages/ActivityPage';
import { ProfilePage } from './pages/ProfilePage';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function App() {
  // Real Wagmi + Viem + MetaMask Wallet Integration Hook
  const {
    walletState,
    isConnecting,
    isLoadingBalance,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    refetchBalance,
  } = useMonadWallet();

  const [stats, setStats] = useState<StatsData>(MOCK_STATS);
  const [promises, setPromises] = useState<PromiseItem[]>(INITIAL_PROMISES);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // App View Navigation State: 'home' | 'create' | 'detail' | 'activity' | 'profile'
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'detail' | 'activity' | 'profile'>('home');
  const [selectedPromise, setSelectedPromise] = useState<PromiseItem | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<string>('ALL');

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle/Connect Wallet Handler
  const handleToggleWallet = async () => {
    if (walletState.isConnected) {
      disconnectWallet();
      showToast('Wallet disconnected');
    } else {
      try {
        await connectWallet();
        showToast('Wallet connected to Monad Testnet');
      } catch (err: any) {
        showToast(err.message || 'User rejected wallet connection');
      }
    }
  };

  // View Promise Detail Handler
  const handleViewPromiseDetail = (promise: PromiseItem) => {
    setSelectedPromise(promise);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Handlers
  const handleOpenCreatePage = () => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateActivity = () => {
    setCurrentView('activity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateProfile = () => {
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create Promise Handler
  const handleCreatePromise = (newPromise: PromiseItem) => {
    setPromises([newPromise, ...promises]);
    setStats((prev) => ({
      ...prev,
      totalLocked: prev.totalLocked + newPromise.amount,
      activePromises: prev.activePromises + 1,
      totalPromised: prev.totalPromised + newPromise.amount,
    }));

    // Add activity timeline item
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'created',
      title: `Promise Created (${newPromise.condition})`,
      amount: newPromise.amount,
      timestamp: 'Just now',
      txHash: newPromise.txHash,
      promiseId: newPromise.id,
    };
    setActivities([newActivity, ...activities]);

    refetchBalance();
    showToast(`Locked ${newPromise.amount} MON on Monad Testnet! Tx: ${newPromise.txHash.slice(0, 10)}...`);
  };

  // Verify Promise Handler
  const handleVerifyPromise = (promise: PromiseItem) => {
    setPromises((prev) =>
      prev.map((p) => (p.id === promise.id ? { ...p, status: 'VERIFIED' as const } : p))
    );

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'verified',
      title: `Condition Verified (${promise.condition})`,
      amount: promise.amount,
      timestamp: 'Just now',
      txHash: promise.txHash || `0x${Math.random().toString(16).substring(2, 10)}...`,
      promiseId: promise.id,
    };
    setActivities([newActivity, ...activities]);

    showToast(`Condition for "${promise.title}" verified on Monad Testnet!`);
  };

  // Claim Promise Handler
  const handleClaimPromise = (promise: PromiseItem) => {
    setPromises((prev) =>
      prev.map((p) => (p.id === promise.id ? { ...p, status: 'FULFILLED' as const } : p))
    );

    setStats((prev) => ({
      ...prev,
      totalLocked: Math.max(0, prev.totalLocked - promise.amount),
      activePromises: Math.max(0, prev.activePromises - 1),
      fulfilled: prev.fulfilled + 1,
    }));

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'claimed',
      title: `Funds Claimed (${promise.title})`,
      amount: promise.amount,
      timestamp: 'Just now',
      txHash: promise.txHash || `0x${Math.random().toString(16).substring(2, 10)}...`,
      promiseId: promise.id,
    };
    setActivities([newActivity, ...activities]);

    refetchBalance();
    showToast(`Claimed ${promise.amount} MON! Settled on Monad Testnet.`);
  };

  // Scroll to active promises section
  const handleExplore = () => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('promises-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#08070D] text-slate-100 flex flex-col justify-between pb-24">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Network Warning Banner if connected to Wrong Network */}
      {walletState.isConnected && !walletState.isCorrectNetwork && (
        <div className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Wrong Network: Connected to Chain ID {walletState.chainId}. Please switch to Monad Testnet.</span>
            </div>
            <button
              onClick={switchNetwork}
              className="px-3 py-1 bg-white text-slate-900 rounded-lg text-xs font-extrabold hover:bg-slate-100 transition-all shadow-sm"
            >
              Switch to Monad Testnet
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        wallet={walletState}
        onToggleWallet={handleToggleWallet}
        onOpenCreate={handleOpenCreatePage}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigatePromises={handleExplore}
        onNavigateActivity={handleNavigateActivity}
        onNavigateProfile={handleNavigateProfile}
      />

      {/* View Switcher: Home vs Create vs Detail vs Activity vs Profile */}
      {currentView === 'create' ? (
        <CreatePromisePage
          onBack={handleNavigateHome}
          onCreatePromise={handleCreatePromise}
          userBalance={walletState.balance}
        />
      ) : currentView === 'detail' && selectedPromise ? (
        <PromiseDetailsPage
          promise={selectedPromise}
          onBack={handleNavigateHome}
          onVerifyPromise={handleVerifyPromise}
          onClaimPromise={handleClaimPromise}
        />
      ) : currentView === 'activity' ? (
        <ActivityPage
          activities={activities}
          onBack={handleNavigateHome}
        />
      ) : currentView === 'profile' ? (
        <ProfilePage
          wallet={walletState}
          stats={stats}
          onBack={handleNavigateHome}
          onToggleWallet={handleToggleWallet}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-4">
          {/* Hero Section */}
          <HeroSection
            onOpenCreate={handleOpenCreatePage}
            onExplore={handleExplore}
          />

          {/* Portfolio Stats Card */}
          <StatsCard stats={stats} />

          {/* Promise Lifecycle Visual */}
          <LifecycleVisual />

          {/* Quick Actions Horizontal Bar */}
          <QuickActions
            onOpenCreate={handleOpenCreatePage}
            onSelectFilter={(filter) => {
              setActiveFilterTab(filter);
              handleExplore();
            }}
            activeFilter={activeFilterTab}
          />

          {/* Active Promises Section */}
          <div id="promises-section">
            <ActivePromises
              promises={promises}
              onViewPromise={handleViewPromiseDetail}
              onClaimPromise={handleClaimPromise}
              onVerifyPromise={handleVerifyPromise}
              onOpenCreate={handleOpenCreatePage}
              activeFilterTab={activeFilterTab}
              setActiveFilterTab={setActiveFilterTab}
            />
          </div>

          {/* Why PromisePay Section */}
          <WhyPromisePay />

          {/* Recent Activity Timeline */}
          <RecentActivity activities={activities} />
        </main>
      )}

      {/* Floating Bottom Navigation */}
      <BottomNavigation
        activeTab={
          currentView === 'create'
            ? 'create'
            : currentView === 'detail'
            ? 'promises'
            : currentView === 'activity'
            ? 'activity'
            : currentView === 'profile'
            ? 'profile'
            : 'home'
        }
        setActiveTab={(tab) => {
          if (tab === 'home') handleNavigateHome();
          if (tab === 'create') handleOpenCreatePage();
          if (tab === 'promises') handleExplore();
          if (tab === 'activity') handleNavigateActivity();
          if (tab === 'profile') handleNavigateProfile();
        }}
        onOpenCreate={handleOpenCreatePage}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">PROMISEPAY</span>
            <span>• Monad Blitz New Delhi V4</span>
          </div>
          <p className="text-slate-400">
            Turn promises into programmable money. Smart Contracts on Monad Testnet.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
