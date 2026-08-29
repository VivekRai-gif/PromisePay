import { useState, useEffect, useCallback } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { monadTestnet, MONAD_TESTNET_CHAIN_ID } from '../lib/monad';
import { connectMetaMask, switchToMonadNetwork, Web3WalletInfo } from '../services/web3';

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

  // Fetch real native MON balance using Wagmi useBalance
  const { data: balanceData, isLoading: isLoadingBalance, refetch: refetchBalance } = useBalance({
    address,
    chainId: monadTestnet.id,
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000, // Auto refresh balance every 10 seconds
    },
  });

  // Derived network checks
  const activeChainId = wagmiChainId || currentChainId;
  const isCorrectNetwork = activeChainId === MONAD_TESTNET_CHAIN_ID;

  // Sync wallet state
  useEffect(() => {
    if (isConnected && address) {
      const formattedAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
      const numericBalance = balanceData ? parseFloat(balanceData.formatted) : localWallet.balance;

      setLocalWallet({
        address: formattedAddr,
        fullAddress: address,
        balance: numericBalance,
        network: isCorrectNetwork ? 'Monad Testnet' : 'Wrong Network',
        chainId: activeChainId || MONAD_TESTNET_CHAIN_ID,
        isConnected: true,
        isCorrectNetwork: isCorrectNetwork,
      });
    } else {
      setLocalWallet({
        address: 'Not Connected',
        fullAddress: '',
        balance: 0.0,
        network: 'Disconnected',
        chainId: 0,
        isConnected: false,
        isCorrectNetwork: false,
      });
    }
  }, [isConnected, address, balanceData, activeChainId, isCorrectNetwork]);

  // Handle explicit connect trigger
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Primary: Try Wagmi injected connector
      const injectedConnector = connectors.find((c) => c.id === 'injected' || c.id === 'metaMask');
      if (injectedConnector) {
        await connectAsync({ connector: injectedConnector });
      } else {
        // Fallback: Direct EIP-1193 MetaMask service call
        const info = await connectMetaMask();
        setLocalWallet(info);
      }
    } catch (err: any) {
      console.warn('Wallet connection error / user rejected:', err);
      // Attempt fallback EIP-1193 request if Wagmi connector prompt was closed
      try {
        const info = await connectMetaMask();
        setLocalWallet(info);
      } catch (fallbackErr) {
        throw fallbackErr;
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
      balance: 0.0,
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
          refetchBalance();
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
  }, [disconnectWallet, refetchBalance]);

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
