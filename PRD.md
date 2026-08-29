# PromisePay — Product Requirements Document (PRD)

**Event:** Monad Blitz New Delhi V4  
**Project:** PromisePay  
**Tagline:** Turn promises into programmable money.  
**Network:** Monad Testnet  
**MVP Target:** 6-hour hackathon build  
**Primary Goal:** Working on-chain demo + maximum judging score  

---

## 1. Product Vision

PromisePay is a programmable money protocol that enables individuals and organizations to lock funds against a promise or condition, releasing those funds automatically when the condition is verified.

### Current Problem
Traditional promises and commitments suffer from reliance on:
- Human trust & memory
- Manual transfers & follow-ups
- Intermediaries & friction

*Example:* "I'll give you 10 MON when you complete your certification." Today, someone has to remember and manually execute the transfer.

### The PromisePay Solution
```
PROMISE ➔ LOCK MONEY ➔ VERIFY CONDITION ➔ RELEASE MONEY
```
The funds are committed upfront in a smart contract, making the commitment trustless, transparent, and enforceable.

---

## 2. Target Users

### Primary Users (Individuals)
- **Parents & Students:** Milestone-based rewards (e.g., graduation, grade incentives).
- **Friends & Peer Groups:** Bet execution, informal challenges, accountability stakes.
- **Freelancers & Clients:** Milestone payment release upon deliverable approval.
- **Creators & Supporters:** Performance-contingent tips or funding.

### Secondary Users (Organizations)
- **DAOs & Web3 Teams:** Contributor bounty payouts upon task verification.
- **Employers & Startups:** Vesting/performance bonuses unlocked via milestones.
- **Hackathons & Event Organizers:** Automated prize pool distribution.

---

## 3. Core Use Cases

1. **🎓 Education & Achievements:** "10 MON when you graduate."
2. **💼 Freelancing & Services:** "Payment releases when deliverable is verified."
3. **🏆 Competitions & Gaming:** "Prize automatically releases to the verified winner."
4. **🎯 Personal Accountability:** "Stake 5 MON against completing a 30-day fitness challenge."
5. **🚀 Startup Milestones:** "Contributor tokens/MON unlock post-launch."

---

## 4. MVP Scope (Must Have)

To succeed within the hackathon timeframe, the MVP scope is strictly constrained:

### A. Connect Wallet
- MetaMask wallet integration via Wagmi / Viem.
- Display wallet address (`0xABC...123`) and native MON balance.

### B. Create Promise
- Form input fields:
  - **Recipient:** Address (`0x...`)
  - **Amount:** MON value (e.g., `1.0 MON`)
  - **Condition:** Human-readable string (e.g., "Graduation", "Milestone 1 complete")
- Action: **[ CREATE PROMISE ]**

### C. Lock Funds
- Smart contract accepts native `MON` with `payable` transaction.
- State transitions immediately to `🔒 LOCKED`.

### D. Verify Condition
- Simple demonstrable verifier for hackathon demonstration.
- Action: **[ VERIFY CONDITION ]**
- State transitions to `✅ VERIFIED`.

### E. Claim Funds
- Recipient can execute **[ CLAIM ]**.
- Contract sends locked native MON to the recipient address.
- State updates to `🔓 FULFILLED`.

---

## 5. Promise Lifecycle State Machine

```
┌──────────┐
│ CREATED  │
└────┬─────┘
     ↓
┌──────────┐
│  LOCKED  │
└────┬─────┘
     ↓
┌──────────┐
│ VERIFIED │
└────┬─────┘
     ↓
┌──────────┐
│ CLAIMED  │ (FULFILLED)
└──────────┘
```

---

## 6. Smart Contract Requirements

Minimal, secure, and gas-efficient Solidity contract (`PromisePay.sol`).

### Core Data Structure
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

### Key Functions
- `createPromise(address payable recipient, string memory condition) external payable returns (uint256 promiseId)`
- `verifyPromise(uint256 promiseId) external`
- `claim(uint256 promiseId) external`
- `getPromise(uint256 promiseId) external view returns (Promise memory)`
- `getUserPromises(address user) external view returns (Promise[] memory)`

---

## 7. Security Requirements

- **Strict Recipient Access Control:** Only designated recipient (`msg.sender == promise.recipient`) can call `claim()`.
- **Reentrancy Protection:** Use CEI (Checks-Effects-Interactions) pattern or OpenZeppelin `ReentrancyGuard`.
- **Double-Claim Prevention:** Require `promise.status == PromiseStatus.VERIFIED` before transferring, then update state before transfer.
- **Verification Integrity:** Prevent verifying already claimed promises.
- **Fund Safety:** Direct native transfer safely handling execution failures (`(bool success, ) = recipient.call{value: amount}("")`).

---

## 8. Frontend & User Experience Requirements

- **Design Aesthetic:** High-contrast, modern dark mode with Monad purple accent themes, smooth glassmorphism cards, and micro-interactions.
- **Home View:** Hero section header, value proposition, quick action CTA `[ CREATE PROMISE ]`, and `[ CONNECT WALLET ]`.
- **Create View:** Clean form, real-time validation, gas estimate indication, and confirmation modal.
- **Dashboard View:** List of user's sent and received promises categorized by status (`🔒 LOCKED`, `✅ VERIFIED`, `🔓 CLAIMED`), featuring live Monad Explorer transaction links.

---

## 9. Monad Testnet Integration

- **Network Name:** Monad Testnet
- **Currency Symbol:** MON
- **RPC URL:** Custom Monad Testnet RPC
- **Chain ID:** Monad Testnet Chain ID
- **Explorer:** Monad Block Explorer
- **Artifacts Needed:** Contract address, ABI, verified smart contract source on explorer.

---

## 10. Hackathon 3-Minute Demo Flow

1. **Step 1:** Connect MetaMask wallet (Display MON balance).
2. **Step 2:** Fill out Promise form: Recipient = Demo Address, Amount = 1 MON, Condition = "Graduation".
3. **Step 3:** Click **[ CREATE PROMISE ]**, confirm in MetaMask, show live Monad transaction on explorer.
4. **Step 4:** Dashboard updates to `🔒 1 MON LOCKED`.
5. **Step 5:** Click **[ VERIFY CONDITION ]** -> Dashboard reflects `✅ VERIFIED`.
6. **Step 6:** Recipient account triggers **[ CLAIM ]**.
7. **Step 7:** Recipient wallet balance increases by +1 MON.
8. **Step 8:** Show final explorer transaction link confirming native MON settlement.

---

## 11. Differentiation

- **Promise-First UX:** Rather than framing features around technical terminology like "escrow", "vesting schedule", or "multi-sig vaults", PromisePay focuses on human commitments: *"I want to make a promise."*
- **Programmable Trust:** Money enforces the commitment so human memory and manual follow-ups are unnecessary.

---

## 12. Future Roadmap

### V2 — Multi-Condition Engine
- Time-based locks (expiry/cliff release)
- Multi-oracle verification (Chainlink, Pyth, GitHub API webhooks)
- Credential checks (Galxe, Gitcoin Passport, ZK proofs)

### V3 — Multi-Party Commitments
- Group pools (100 users stake MON towards shared target)
- Automated settlement and reward redistribution

### V4 — Developer Infrastructure & API
- SDK & API endpoint (`createPromise`, `verifyCondition`, `releaseFunds`) allowing external dApps to integrate PromisePay into their platforms.

---

## 13. Business Model

1. **Protocol Fee:** 0.25% - 1.00% fee on successful promise settlements.
2. **Developer / API Subscriptions:** Enterprise APIs for automated business escrow payouts.
3. **Premium Verification:** Automated oracle and ZK-verification integrations.

---

## 14. Judging Score Strategy (Target: 400/400 Points)

| Category | Points Target | Strategy |
| :--- | :--- | :--- |
| **Basic Requirements** | 100/100 | Public GitHub repo, detailed README, Monad Testnet deployment, live hosted app. |
| **Project Working** | 100/100 | Working Create/Verify/Claim flow, live native MON transactions, verified contract source code, seamless local setup. |
| **Build in Public** | 100/100 | Active posts on X/socials (`#MonadBlitz`), demo video, community engagement/waitlist. |
| **Bonus Points** | 100/100 | Mainnet readiness (+25), custom domain (+15), PMF user evidence (+20), clear business model (+20), innovative promise-first UX (+20). |

---

## 15. MVP Scope Freeze (Out of Scope for Hackathon Build)

- ❌ Custom ERC-20 tokens or NFTs
- ❌ DAO governance mechanisms
- ❌ Complex AI or multi-chain oracles
- ❌ Native mobile apps
- ❌ Over-engineered authentication / backend databases
