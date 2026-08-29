import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { monadTestnet } from './monad';

/**
 * Centralized Wagmi Configuration for PromisePay
 * Supports injected wallet (MetaMask / EVM Wallets)
 */
export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected({
      target: 'metaMask',
    }),
  ],
  transports: {
    [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
  },
});
