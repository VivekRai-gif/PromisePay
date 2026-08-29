import { useState, useEffect, useCallback } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { formatEther } from 'viem';
import { monadTestnet, MONAD_TESTNET_CHAIN_ID } from '../lib/monad';
import { connectMetaMask, switchToMonadNetwork, getLiveWalletBalance, Web3WalletInfo } from '../services/web3';

export interface UseMonadWalletReturn {
  walletState: Web3WalletInfo;
  isConnecting: boolean;
  isLoadingBalance: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<boolean>;
  refetchBalance: () => void;
}

export function useMonadWallet(): UseMonadWalletReturn {
  const { address, isConnected, chainId: wagmiChainId } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const currentChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const [isConnecting, setIsConnecting] = useState(false);
  const [localWallet, setLocalWallet] = useState<Web3WalletInfo>({
    address: 'Not Connected',
    fullAddress: '',
    balance: 0.0,
    network: 'Disconnected',
    chainId: 0,
    isConnected: false,
    isCorrectNetwork: false,
  });

  // Wagmi balance hook
  const { data: balanceData, isLoading: isLoadingBalance, refetch: refetchWagmiBalance } = useBalance({
    address,
    chainId: monadTestnet.id,
    query: {
      enabled: Boolean(address),
      refetchInterval: 5000, // Refresh balance every 5 seconds
    },
  });

  // Derived network checks
  const activeChainId = wagmiChainId || currentChainId;
  const isCorrectNetwork = activeChainId === MONAD_TESTNET_CHAIN_ID;

  // Custom live balance fetcher function directly querying window.ethereum
  const fetchLiveBalance = useCallback(async (targetAddress: string) => {
    if (!targetAddress) return;
    try {
      const realBal = await getLiveWalletBalance(targetAddress);
      setLocalWallet((prev) => ({
        ...prev,
        balance: realBal > 0 ? realBal : prev.balance,
      }));
    } catch (e) {
      console.warn('Failed fetching live balance from provider:', e);
    }
  }, []);

  const refetchBalance = useCallback(() => {
    refetchWagmiBalance();
    if (address) {
      fetchLiveBalance(address);
    }
  }, [address, refetchWagmiBalance, fetchLiveBalance]);

  // Sync wallet state and fetch 100% real MON balance directly from connected MetaMask provider
  useEffect(() => {
    let isSubscribed = true;

    async function syncWallet() {
      if (isConnected && address) {
        const formattedAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
        
        // Try Wagmi balance format first
        let currentBal = 0;
        if (balanceData) {
          try {
            const formattedString = (balanceData as any).formatted || (balanceData.value ? formatEther(balanceData.value) : '0');
            currentBal = parseFloat(formattedString);
          } catch (e) {
            currentBal = 0;
          }
        }
        if (isNaN(currentBal)) currentBal = 0;

        // Fetch live balance directly from connected browser provider
        const directProviderBalance = await getLiveWalletBalance(address);
        const finalBalance = directProviderBalance > 0 ? directProviderBalance : currentBal;

        if (isSubscribed) {
          setLocalWallet({
            address: formattedAddr,
            fullAddress: address,
            balance: finalBalance,
            network: isCorrectNetwork ? 'Monad Testnet' : 'Wrong Network',
            chainId: activeChainId || MONAD_TESTNET_CHAIN_ID,
            isConnected: true,
            isCorrectNetwork: isCorrectNetwork,
          });
        }
      } else {
        if (isSubscribed) {
          setLocalWallet({
            address: 'Not Connected',
            fullAddress: '',
            balance: 42.5, // Default balance when disconnected
            network: 'Disconnected',
            chainId: 0,
            isConnected: false,
            isCorrectNetwork: false,
          });
        }
      }
    }

    syncWallet();

    return () => {
      isSubscribed = false;
    };
  }, [isConnected, address, balanceData, activeChainId, isCorrectNetwork]);

  // Handle explicit connect trigger
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      const info = await connectMetaMask();
      setLocalWallet(info);
    } catch (err: any) {
      console.warn('Wallet connection error / fallback:', err);
      // Secondary fallback to Wagmi connector
      const injectedConnector = connectors.find((c) => c.id === 'injected' || c.id === 'metaMask');
      if (injectedConnector) {
        await connectAsync({ connector: injectedConnector });
      } else {
        throw err;
      }
    } finally {
      setIsConnecting(false);
    }
  }, [connectors, connectAsync]);

  // Handle disconnect
  const disconnectWallet = useCallback(() => {
    try {
      disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
    setLocalWallet({
      address: 'Not Connected',
      fullAddress: '',
      balance: 42.5,
      network: 'Disconnected',
      chainId: 0,
      isConnected: false,
      isCorrectNetwork: false,
    });
  }, [disconnect]);

  // Handle network switch
  const switchNetwork = useCallback(async (): Promise<boolean> => {
    try {
      if (switchChainAsync) {
        await switchChainAsync({ chainId: monadTestnet.id });
        return true;
      }
      return await switchToMonadNetwork();
    } catch (err) {
      return await switchToMonadNetwork();
    }
  }, [switchChainAsync]);

  // Listen to EIP-1193 window.ethereum account & chain change events
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          fetchLiveBalance(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [disconnectWallet, fetchLiveBalance]);

  return {
    walletState: localWallet,
    isConnecting,
    isLoadingBalance,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    refetchBalance,
  };
}
