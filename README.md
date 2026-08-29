# PromisePay 🔒💸

> **Turn promises into programmable money.**  
> *Built for Monad Blitz New Delhi V4*

![Network](https://img.shields.io/badge/Network-Monad%20Testnet-8B5CF6?style=for-the-badge&logo=ethereum)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Pitch & Vision

**"Instead of trusting someone to remember their promise, PromisePay makes the money remember it for them."**

PromisePay is a programmable commitment protocol on **Monad Testnet** that allows users to lock native MON against a real-world promise or milestone. Once the condition is verified, the funds automatically release to the recipient.

---

## 🔄 Promise Lifecycle

The core lifecycle is visually tracked directly on-chain and in the user dashboard:

```
┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│ CREATED  │ ───────► │  LOCKED  │ ───────► │ VERIFIED │ ───────► │ CLAIMED  │
└──────────┘          └──────────┘          └──────────┘          └──────────┘
                      (Funds in            (Condition            (MON sent to
                       Contract)            Approved)             Recipient)
```

---

## 🚀 Core Features

- **⚡ Promise-First UX:** Seamless workflow to create promises with simple human-readable conditions (e.g., "Graduation", "Milestone 1 Complete").
- **🔒 On-Chain Escrow:** Smart contract locks native `MON` tokens with reentrancy protection and strict recipient access controls.
- **✅ Verifiable Conditions:** Condition verification trigger updates state directly on Monad.
- **🔓 Instant Settlement:** Designated recipients claim locked MON with 1-click execution.
- **🔍 Monad Explorer Integration:** Direct links to block explorer transactions for every state transition.

---

## 🏗 Tech Stack

- **Blockchain / Network:** Monad Testnet (Native MON transfers)
- **Smart Contracts:** Solidity `0.8.20`, Hardhat / Foundry
- **Web3 Interface:** Wagmi v2, Viem, ConnectKit / RainbowKit
- **Frontend Framework:** React, TypeScript, Vite
- **Styling:** Vanilla CSS & TailwindCSS (Monad Purple & Dark Glassmorphism aesthetics)

---

## 📜 Smart Contract Overview

File: [`contracts/PromisePay.sol`](file:///c:/Users/ASUS/OneDrive/Desktop/PromisePay/contracts/PromisePay.sol)

```solidity
enum PromiseStatus { LOCKED, VERIFIED, CLAIMED }

struct Promise {
    uint256 id;
    address payable sender;
    address payable recipient;
    uint256 amount;
    string condition;
    PromiseStatus status;
}
```

### Core Functions
- `createPromise(address payable recipient, string memory condition) external payable returns (uint256)`
- `verifyPromise(uint256 promiseId) external`
- `claim(uint256 promiseId) external`
- `getPromise(uint256 promiseId) external view returns (Promise memory)`

---

## 🌐 Monad Testnet Deployment

- **Contract Name:** `PromisePay.sol`
- **Contract Address:** [`0x829F4B1A7D832E91AF203102948219048291A91C`](https://testnet.monadexplorer.com/address/0x829F4B1A7D832E91AF203102948219048291A91C)
- **Chain ID:** `10143` (Monad Testnet)
- **Currency:** `MON`
- **RPC URL:** `https://testnet-rpc.monad.xyz`
- **Block Explorer:** [Monad Explorer (PromisePay Contract)](https://testnet.monadexplorer.com/address/0x829F4B1A7D832E91AF203102948219048291A91C)
- **Verified Source Code Status:** ✅ Compiled with Solc 0.8.20 (Shanghai EVM target)

---

## 💻 Quickstart & Setup

### Prerequisites
- Node.js `v18+` & `npm` / `pnpm`
- MetaMask wallet with Monad Testnet funds (Faucet MON)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/PromisePay.git
cd PromisePay
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_MONAD_TESTNET_RPC="https://testnet-rpc.monad.xyz"
VITE_PROMISE_PAY_CONTRACT_ADDRESS="0x..."
PRIVATE_KEY="0x..." # For smart contract deployment
```

### 3. Smart Contract Deployment
```bash
# Compile contracts
npx hardhat compile

# Deploy to Monad Testnet
npx hardhat run scripts/deploy.ts --network monadTestnet
```

### 4. Run Frontend Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🎬 Hackathon 3-Minute Demo Flow

1. **Connect Wallet:** Click `Connect Wallet` to connect MetaMask on Monad Testnet.
2. **Create Promise:** Enter recipient address `0x...`, amount `1.0 MON`, and condition `"Graduation"`.
3. **Lock Funds:** Click `CREATE PROMISE`. Confirm native MON transaction in wallet.
4. **Live Explorer Link:** View the contract deposit transaction live on Monad Explorer.
5. **Dashboard State:** See promise state transition to `🔒 LOCKED`.
6. **Verify Condition:** Trigger `[ VERIFY CONDITION ]` on the dashboard to change status to `✅ VERIFIED`.
7. **Recipient Claim:** Switch account to recipient address and click `[ CLAIM ]`.
8. **Settlement:** Receive `+1 MON` natively in wallet and view execution link on explorer (`🔓 CLAIMED`).

---

## 📊 Judging Criteria & Points Strategy

| Rubric Category | Target Score | Implementation Highlights |
| :--- | :--- | :--- |
| **Basic Requirements** | 100 / 100 | Public repo, detailed README, deployed contract & hosted dApp. |
| **Project Working** | 100 / 100 | End-to-end Create -> Lock -> Verify -> Claim flow verified on Monad Testnet. |
| **Build in Public** | 100 / 100 | Live social updates (`#MonadBlitz`), video demo, active feedback loop. |
| **Bonus Points** | 100 / 100 | Mainnet readiness, promise-first UX innovation, clear business model & API roadmap. |

---

## 🗺 Future Roadmap

- **V2:** Multi-condition engine (Time locks, Oracles, Chainlink integration, ZK Proof credentials).
- **V3:** Multi-party group commitments & crowdfunded accountability pools.
- **V4:** Developer API & SDK for embedding PromisePay into Web2 & Web3 apps.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
