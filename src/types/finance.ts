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
