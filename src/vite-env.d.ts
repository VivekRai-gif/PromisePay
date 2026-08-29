/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MONAD_TESTNET_RPC: string;
  readonly VITE_PROMISE_PAY_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
