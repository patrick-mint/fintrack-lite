export type AccountType = 'asset' | 'liability';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  category: string; // e.g. Savings, Cash, Credit Cards, Loans, Mortgages
  createdAt: Date;
}

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  amount: number;

  fromAccountId?: string; // required for expense/transfer
  toAccountId?: string;   // required for income/transfer

  category?: string;      // spending / income category
  note?: string;
}

export interface AccountWithBalance extends Account {
  currentBalance: number; // always positive number (liability = outstanding debt)
}

export interface AccountWithHistory extends Account {
  balanceHistory: { date: Date; amount: number }[];
}

export interface ACCOUNT_CATEGORIES_TYPE {
  asset: string[];
  liability: string[];
}

export const ACCOUNT_CATEGORIES: ACCOUNT_CATEGORIES_TYPE = {
  asset: [
    'Savings',
    'Cash and Cash Equivalents',
    'Investments',
    'Real Estate',
    'Personal Property',
    'Other Assets',
  ],
  liability: [
    'Credit Cards',
    'Loans',
    'Mortgages',
    'Other Liabilities',
  ],
} as const;
export type DocumentCategory = 'insurance' | 'property' | 'valuables' | 'other';

export interface DocumentItem {
  id: string;
  category: DocumentCategory;

  // Human-friendly title (e.g., "AIA Life Policy", "Chanote - Chiang Mai", "Gold Bar")
  title: string;

  // Optional metadata
  provider?: string; // insurer / bank / office
  referenceNo?: string; // policy no / deed no / certificate no
  location?: string; // where it's kept / province / storage location

  // Insurance (optional)
  medicalCoverage?: number; // healthcare coverage
  deathBenefit?: number; // payout on death

  // Property / valuables (optional)
  areaSqm?: number; // land/house area
  quantity?: number; // e.g., rings count, grams
  estimatedValue?: number; // user-estimated value (base currency)

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}
