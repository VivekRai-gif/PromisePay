export type PromiseStatus = 'LOCKED' | 'VERIFIED' | 'CLAIMABLE' | 'FULFILLED';

export type CategoryType = 'education' | 'freelance' | 'competition' | 'accountability' | 'other';

export interface PromiseItem {
  id: string;
  title: string;
  recipient: string;
  sender: string;
  amount: number;
  token: string;
  condition: string;
  status: PromiseStatus;
  createdAt: string;
  category: CategoryType;
  txHash: string;
  verifiedAt?: string;
  claimedAt?: string;
  description?: string;
}

export type ActivityStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

export interface ActivityItem {
  id: string;
  type: 'created' | 'verified' | 'claimed';
  title: string;
  amount: number;
  timestamp: string;
  txHash: string;
  promiseId: string;
  status?: ActivityStatus;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  fullAddress?: string;
  balance: number;
  network: string;
  chainId: number;
  isCorrectNetwork?: boolean;
}

export interface StatsData {
  totalLocked: number;
  activePromises: number;
  fulfilled: number;
  totalPromised: number;
}
