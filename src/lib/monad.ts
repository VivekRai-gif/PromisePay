import { defineChain } from 'viem';

export const MONAD_TESTNET_CHAIN_ID = 10143;
export const MONAD_TESTNET_HEX_ID = '0x279f';
export const MONAD_RPC_URL = (import.meta as any).env?.VITE_MONAD_TESTNET_RPC || 'https://testnet-rpc.monad.xyz';
export const MONAD_EXPLORER_URL = 'https://testnet.monadexplorer.com';

/**
 * Official Viem custom chain definition for Monad Testnet
 */
export const monadTestnet = defineChain({
  id: MONAD_TESTNET_CHAIN_ID,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [MONAD_RPC_URL],
    },
    public: {
      http: [MONAD_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: MONAD_EXPLORER_URL,
    },
  },
  testnet: true,
});
