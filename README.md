# PromisePay 🔒💸

> **"Turn promises into programmable money."**  
> *Built for Monad Blitz New Delhi V4*

![Network](https://img.shields.io/badge/Network-Monad%20Testnet-8335EC?style=for-the-badge&logo=ethereum)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)
![AI-Powered](https://img.shields.io/badge/AI--Verifier-Google%20Gemini-A055FF?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Pitch & Vision

**"Instead of trusting someone to remember their promise, PromisePay makes the money remember it for them."**

PromisePay is a programmable commitment protocol on **Monad Testnet** enhanced with **server-side Google Gemini AI condition verification**. Users lock native `MON` tokens into smart contract escrows for real-world milestones. Once verified by smart-contract logic or AI evidence evaluation, funds are instantly released to the recipient.

---

## 🔄 Promise Lifecycle

The core lifecycle is visually tracked directly on-chain and in the Monad Blitz Electric Purple dashboard:

```
┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│  CREATE  │ ───────► │   LOCK   │ ───────► │  VERIFY  │ ───────► │  CLAIM   │
└──────────┘          └──────────┘          └──────────┘          └──────────┘
                      (Funds in             (AI / On-Chain        (MON Sent to
                       Contract)             Attestation)          Recipient)
```

---

## 🎯 5 Promise Templates & AI Evidence Verification

PromisePay supports 5 predefined template types:

1. 🎓 **Graduation**: Academic degree completion & honors.
2. 💼 **Milestone**: Project deliverables & freelance work.
3. 🏆 **Competition**: Hackathon bounties & competition prizes.
4. 📅 **Date**: Time-locked date release (*verified directly on-chain via block timestamp*).
5. 🎯 **Goal**: Custom goals & commitment streaks.

### 🤖 Gemini AI Verification Architecture
For non-time conditions (`Graduation`, `Milestone`, `Competition`, `Goal`), recipients submit evidence (document images, text descriptions, or proof URLs). 

```
[ Recipient Evidence ] ──► [ Server-Side Express API ] ──► [ Gemini 2.5 Flash AI ]
                                                                   │
[ MON Claim Payout ] ◄── [ Monad Smart Contract ] ◄── [ Attestation Signature ]
```

> **🛡️ Security Rule:** Gemini AI **NEVER** directly controls or transfers wallet funds. The AI generates a server-side signed attestation result (`verified: true/false`, `confidence: 96%`) which is submitted to the smart contract before recipient payout execution.

---

## 🚀 Core Features

- **⚡ Monad Blitz Electric Purple Theme:** High-end dark UI (`#07040D`, `#8335EC`, `#A055FF`) with orbital diagram visuals & glassmorphism.
- **🔒 On-Chain Escrow:** Smart contract locks native `MON` tokens with reentrancy protection and strict recipient access controls.
- **🎯 Precision Balance Display:** Preserves exact `bigint` raw balance from Viem/Ethers to display MON to **4 decimal places** (`49.0890 MON`).
- **🤖 Server-Side AI Verifier:** Integrates Google Gemini API securely without exposing private keys (`GEMINI_API_KEY`) on the client.
- **🔓 Instant MON Settlement:** Recipients claim verified locked funds with 1-click execution.
- **🔍 Monad Explorer Integration:** Direct block explorer transaction links for every creation, verification, and claim state transition.

---

## 🏗 Tech Stack

- **Blockchain / Network:** Monad Testnet (Chain ID: `10143`, Native MON transfers)
- **Smart Contracts:** Solidity `0.8.20`, Hardhat 3, Ethers v6
- **Web3 Interface:** Wagmi v2, Viem, MetaMask Injected EVM Provider
- **AI Engine:** Google Gemini 2.5 Flash API (`@google/genai`)
- **Backend Verifier:** Node.js Express server (`server/index.js`)
- **Frontend Framework:** React, TypeScript, Vite
- **Styling:** Monad Blitz Electric Purple Theme, TailwindCSS, Lucide Icons

---

## 📜 Smart Contract Overview

File: [`contracts/PromisePay.sol`](file:///c:/Users/ASUS/OneDrive/Desktop/PromisePay/contracts/PromisePay.sol)

```solidity
enum PromiseStatus { LOCKED, VERIFIED, CLAIMED, CANCELLED }

struct Promise {
    uint256 id;
    address payable sender;
    address payable recipient;
    uint256 amount;
    string condition;
    PromiseStatus status;
    uint256 createdAt;
    uint256 verifiedAt;
    uint256 claimedAt;
}
```

### Core Functions
- `createPromise(address payable recipient, string memory condition) external payable returns (uint256)`
- `verifyPromise(uint256 promiseId) external`
- `claim(uint256 promiseId) external`
- `cancelPromise(uint256 promiseId) external`
- `getPromise(uint256 promiseId) external view returns (Promise memory)`

---

## 🌐 Monad Testnet Deployment

- **Contract Name:** `PromisePay.sol`
- **Contract Address:** [`0x829F4B1A7D832E91AF203102948219048291A91C`](https://testnet.monadexplorer.com/address/0x829F4B1A7D832E91AF203102948219048291A91C)
- **Chain ID:** `10143` (Monad Testnet)
- **RPC URL:** `https://testnet-rpc.monad.xyz`
- **Block Explorer:** [Monad Explorer (PromisePay Contract)](https://testnet.monadexplorer.com/address/0x829F4B1A7D832E91AF203102948219048291A91C)
- **Verified Source Code Status:** ✅ Compiled with Solc 0.8.20 (Shanghai EVM target)

---

## 💻 Quickstart & Setup

### Prerequisites
- Node.js `v18+` & `npm` / `pnpm`
- MetaMask wallet connected to Monad Testnet (Faucet MON)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/VivekRai-gif/PromisePay.git
cd PromisePay
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Public Monad RPC & Contract
VITE_MONAD_TESTNET_RPC=https://testnet-rpc.monad.xyz
VITE_PROMISE_PAY_CONTRACT_ADDRESS=0x829F4B1A7D832E91AF203102948219048291A91C

# Server-Side Gemini API Key (Do NOT use VITE_ prefix for security)
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Run AI Verifier Server & Frontend
```bash
# Start backend Express AI Verifier on port 3001
npm run server

# Start frontend Vite server on port 5173
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Smart Contract Tests
```bash
# Run unit test suite
npx hardhat test
```

---

## 🎬 Cinematic Product Demo & Presentation

- **Tagline:** *"Don't just make a promise. Program it."*
- **Demo Script:** [`promisepay_demo_video_script.md`](file:///C:/Users/ASUS/.gemini/antigravity-ide/brain/84da2bad-76fb-4f14-8642-1372eb672811/promisepay_demo_video_script.md)

---

## 🗺 Future Roadmap

- **V2:** On-chain ECDSA signature verification (`verifyPromiseWithAttestation`) in Solidity contract.
- **V3:** Multi-condition engine (Chainlink Oracles, ZK Proof credentials).
- **V4:** Developer API & SDK for embedding PromisePay into Web2 & Web3 apps.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
Contact Details : 
email id: vivekrai2416@gmail.com
phone no. : +91 9354632327 
