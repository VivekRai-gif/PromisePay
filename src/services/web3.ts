import { ethers } from 'ethers';
import { MONAD_TESTNET_CHAIN_ID, MONAD_TESTNET_HEX_ID, MONAD_RPC_URL, MONAD_EXPLORER_URL } from '../lib/monad';

// Public Contract configuration on Monad Testnet from Environment Variables
export const CONTRACT_ADDRESS = (import.meta as any).env?.VITE_PROMISE_PAY_CONTRACT_ADDRESS || '0x829F4B1A7D832E91AF203102948219048291A91C';
export const MONAD_EXPLORER = MONAD_EXPLORER_URL;

// Minimal ABI for PromisePay smart contract
export const PROMISE_PAY_ABI = [
  'function createPromise(address payable _recipient, string calldata _condition) external payable returns (uint256)',
  'function verifyPromise(uint256 _promiseId) external',
  'function claim(uint256 _promiseId) external',
  'function cancelPromise(uint256 _promiseId) external',
  'function getPromise(uint256 _promiseId) external view returns (tuple(uint256 id, address sender, address recipient, uint256 amount, string condition, uint8 status, uint256 createdAt, uint256 verifiedAt, uint256 claimedAt))',
  'function getUserPromises(address _user) external view returns (tuple(uint256 id, address sender, address recipient, uint256 amount, string condition, uint8 status, uint256 createdAt, uint256 verifiedAt, uint256 claimedAt)[])',
  'function promiseCount() external view returns (uint256)',
  'event PromiseCreated(uint256 indexed id, address indexed sender, address indexed recipient, uint256 amount, string condition)',
  'event PromiseVerified(uint256 indexed id, address indexed verifier)',
  'event PromiseClaimed(uint256 indexed id, address indexed recipient, uint256 amount)'
];

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Web3WalletInfo {
  address: string;
  fullAddress: string;
  balance: number;
  network: string;
  chainId: number;
  isConnected: boolean;
  isCorrectNetwork: boolean;
}

/**
 * Fetch live native MON balance directly from connected MetaMask window.ethereum provider
 */
export async function getLiveWalletBalance(address: string): Promise<number> {
  if (typeof window === 'undefined' || !window.ethereum || !address) return 0;
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const rawBalance = await provider.getBalance(address);
    const formatted = parseFloat(ethers.formatEther(rawBalance));
    return isNaN(formatted) ? 0 : formatted;
  } catch (err) {
    console.warn('Direct RPC balance fetch error:', err);
    return 0;
  }
}

/**
 * Connect to MetaMask / injected EVM wallet and switch to Monad Testnet
 */
export async function connectMetaMask(): Promise<Web3WalletInfo> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask or EVM provider is not installed. Please install MetaMask.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // Request account permissions
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts selected in wallet.');
  }

  const userAddress = accounts[0];

  // Get current network chain ID
  const network = await provider.getNetwork();
  const currentChainId = Number(network.chainId);
  let isCorrectChain = currentChainId === MONAD_TESTNET_CHAIN_ID;

  // Attempt to switch to Monad Testnet if on wrong network
  if (!isCorrectChain) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET_HEX_ID }],
      });
      isCorrectChain = true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: MONAD_TESTNET_HEX_ID,
                chainName: 'Monad Testnet',
                nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
                rpcUrls: [MONAD_RPC_URL],
                blockExplorerUrls: [MONAD_EXPLORER],
              },
            ],
          });
          isCorrectChain = true;
        } catch (addError) {
          console.warn('User rejected adding Monad Testnet:', addError);
        }
      }
    }
  }

  // Fetch real native MON balance
  const formattedBalance = await getLiveWalletBalance(userAddress);

  return {
    address: `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
    fullAddress: userAddress,
    balance: formattedBalance,
    network: isCorrectChain ? 'Monad Testnet' : 'Wrong Network',
    chainId: currentChainId,
    isConnected: true,
    isCorrectNetwork: isCorrectChain,
  };
}

/**
 * Switch wallet network to Monad Testnet
 */
export async function switchToMonadNetwork(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: MONAD_TESTNET_HEX_ID }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: MONAD_TESTNET_HEX_ID,
              chainName: 'Monad Testnet',
              nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
              rpcUrls: [MONAD_RPC_URL],
              blockExplorerUrls: [MONAD_EXPLORER],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.warn('User rejected network addition:', addError);
        return false;
      }
    }
    return false;
  }
}

/**
 * Execute createPromise on Monad Testnet smart contract
 */
export async function executeCreatePromiseOnChain(
  recipient: string,
  amountMON: string,
  condition: string
): Promise<{ txHash: string; explorerUrl: string }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is required to submit transactions on Monad Testnet.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PROMISE_PAY_ABI, signer);

  const parsedValue = ethers.parseEther(amountMON || '1.0');
  
  console.log('🚀 Invoking createPromise on Monad Testnet contract:', CONTRACT_ADDRESS);
  const tx = await contract.createPromise(recipient, condition, {
    value: parsedValue,
  });

  console.log('⏳ Awaiting transaction confirmation on Monad. Tx Hash:', tx.hash);
  const receipt = await tx.wait();
  console.log('✅ Transaction confirmed in block:', receipt.blockNumber);

  return {
    txHash: tx.hash,
    explorerUrl: `${MONAD_EXPLORER}/tx/${tx.hash}`,
  };
}

/**
 * Execute verifyPromise on Monad Testnet smart contract
 */
export async function executeVerifyPromiseOnChain(
  promiseId: number
): Promise<{ txHash: string; explorerUrl: string }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is required to verify promises on Monad Testnet.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PROMISE_PAY_ABI, signer);

  const tx = await contract.verifyPromise(promiseId);
  await tx.wait();

  return {
    txHash: tx.hash,
    explorerUrl: `${MONAD_EXPLORER}/tx/${tx.hash}`,
  };
}

/**
 * Execute claim on Monad Testnet smart contract
 */
export async function executeClaimPromiseOnChain(
  promiseId: number
): Promise<{ txHash: string; explorerUrl: string }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is required to claim MON funds on Monad Testnet.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PROMISE_PAY_ABI, signer);

  const tx = await contract.claim(promiseId);
  await tx.wait();

  return {
    txHash: tx.hash,
    explorerUrl: `${MONAD_EXPLORER}/tx/${tx.hash}`,
  };
}

/**
 * Read promise struct state directly from deployed Monad smart contract
 */
export async function readPromiseFromContract(promiseId: number) {
  const provider = new ethers.JsonRpcProvider(MONAD_RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PROMISE_PAY_ABI, provider);
  return await contract.getPromise(promiseId);
}
