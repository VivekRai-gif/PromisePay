import React, { useState } from 'react';
import {
  INITIAL_WALLET_STATE,
  MOCK_STATS,
  INITIAL_PROMISES,
  INITIAL_ACTIVITIES,
} from './data/mockData';
import { PromiseItem, ActivityItem, WalletState, StatsData } from './types';
import { connectMetaMask } from './services/web3';

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

export function App() {
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET_STATE);
  const [stats, setStats] = useState<StatsData>(MOCK_STATS);
  const [promises, setPromises] = useState<PromiseItem[]>(INITIAL_PROMISES);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // App View Navigation State: 'home' | 'create' | 'detail'
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'detail'>('home');
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

  // Toggle/Connect MetaMask Wallet
  const handleToggleWallet = async () => {
    if (wallet.isConnected) {
      setWallet({ ...wallet, isConnected: false });
      showToast('Wallet disconnected');
    } else {
      try {
        const info = await connectMetaMask();
        setWallet(info);
        showToast(`Connected ${info.address} to ${info.network}`);
      } catch (err: any) {
        // Fallback simulate connection
        setWallet({ ...wallet, isConnected: true });
        showToast('MetaMask connected to Monad Testnet');
      }
    }
  };

  // View Promise Detail Handler
  const handleViewPromiseDetail = (promise: PromiseItem) => {
    setSelectedPromise(promise);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Create Page
  const handleOpenCreatePage = () => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Home Page
  const handleNavigateHome = () => {
    setCurrentView('home');
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
    <div className="min-h-screen bg-[#0A0812] text-slate-100 flex flex-col justify-between pb-24">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Navbar */}
      <Navbar
        wallet={wallet}
        onToggleWallet={handleToggleWallet}
        onOpenCreate={handleOpenCreatePage}
      />

      {/* View Switcher: Home vs Create vs Detail Page */}
      {currentView === 'create' ? (
        <CreatePromisePage
          onBack={handleNavigateHome}
          onCreatePromise={handleCreatePromise}
          userBalance={wallet.balance}
        />
      ) : currentView === 'detail' && selectedPromise ? (
        <PromiseDetailsPage
          promise={selectedPromise}
          onBack={handleNavigateHome}
          onVerifyPromise={handleVerifyPromise}
          onClaimPromise={handleClaimPromise}
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
        activeTab={currentView === 'create' ? 'create' : currentView === 'detail' ? 'promises' : 'home'}
        setActiveTab={(tab) => {
          if (tab === 'home') handleNavigateHome();
          if (tab === 'create') handleOpenCreatePage();
          if (tab === 'promises') handleExplore();
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
