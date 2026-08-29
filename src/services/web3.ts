import { ethers } from 'ethers';

// Contract configuration on Monad Testnet
export const CONTRACT_ADDRESS = '0x829F4B1A7D832E91AF203102948219048291A91C';
export const MONAD_TESTNET_CHAIN_ID = '0x279f'; // 10143 in hex
export const MONAD_RPC_URL = 'https://testnet-rpc.monad.xyz';
export const MONAD_EXPLORER = 'https://testnet.monadexplorer.com';

// Minimal ABI for PromisePay contract
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
  balance: number;
  network: string;
  chainId: number;
  isConnected: boolean;
}

/**
 * Connect to MetaMask and switch to Monad Testnet if necessary
 */
export async function connectMetaMask(): Promise<Web3WalletInfo> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask to interact with Monad Testnet.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // Request account permissions
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts selected in MetaMask');
  }

  const userAddress = accounts[0];

  // Switch to Monad Testnet
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: MONAD_TESTNET_CHAIN_ID }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: MONAD_TESTNET_CHAIN_ID,
            chainName: 'Monad Testnet',
            nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
            rpcUrls: [MONAD_RPC_URL],
            blockExplorerUrls: [MONAD_EXPLORER],
          },
        ],
      });
    }
  }

  // Fetch real MON balance
  const rawBalance = await provider.getBalance(userAddress);
  const formattedBalance = parseFloat(ethers.formatEther(rawBalance));

  return {
    address: `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
    balance: formattedBalance,
    network: 'Monad Testnet',
    chainId: 10143,
    isConnected: true,
  };
}

/**
 * Execute createPromise on Monad Testnet smart contract
 * Strictly requires confirmed transaction on Monad.
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

  console.log(`🚀 Invoking verifyPromise(${promiseId}) on Monad Testnet...`);
  const tx = await contract.verifyPromise(promiseId);
  
  console.log('⏳ Awaiting verification confirmation on Monad. Tx Hash:', tx.hash);
  const receipt = await tx.wait();
  console.log('✅ Verification confirmed in block:', receipt.blockNumber);

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

  console.log(`🚀 Invoking claim(${promiseId}) on Monad Testnet...`);
  const tx = await contract.claim(promiseId);
  
  console.log('⏳ Awaiting claim payout confirmation on Monad. Tx Hash:', tx.hash);
  const receipt = await tx.wait();
  console.log('✅ Claim payout confirmed in block:', receipt.blockNumber);

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
