'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Account, Transaction, AccountWithBalance } from '@/types/finance';
import { getAccountsWithBalances as computeAccountsWithBalances } from '@/lib/finance';

const ACC_KEY = 'finance-accounts';
const TX_KEY = 'finance-transactions';

interface FinanceContextType {
  accounts: Account[];
  transactions: Transaction[];
  isLoading: boolean;

  addAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (accountId: string) => void;

  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (txId: string) => void;

  getAccountsWithBalances: () => AccountWithBalance[];

  exportData: () => string;
  importData: (jsonText: string) => void;
  clearAllData: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load
  useEffect(() => {
    const acc = safeParse<Account[]>(localStorage.getItem(ACC_KEY), []);
    const txs = safeParse<Transaction[]>(localStorage.getItem(TX_KEY), []);
    setAccounts(acc);
    setTransactions(txs);
    setIsLoading(false);
  }, []);

  // Persist
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(ACC_KEY, JSON.stringify(accounts));
  }, [accounts, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(TX_KEY, JSON.stringify(transactions));
  }, [transactions, isLoading]);

  const addAccount = (account: Account) => {
    setAccounts((prev) => [...prev, account]);
  };

  const updateAccount = (account: Account) => {
    setAccounts((prev) => prev.map((a) => (a.id === account.id ? account : a)));
  };

  const deleteAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== accountId));
    // Keep transactions (historical truth) OR optionally delete related txs.
    // Here we keep them, but UI may show missing account names as "—".
  };

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const deleteTransaction = (txId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== txId));
  };

  const getAccountsWithBalances = () => {
    return computeAccountsWithBalances(accounts, transactions);
  };

  const exportData = () => {
    return JSON.stringify(
      { accounts, transactions, exportedAt: new Date().toISOString(), version: 1 },
      null,
      2
    );
  };

  const importData = (jsonText: string) => {
    const parsed = JSON.parse(jsonText);

    const acc = Array.isArray(parsed?.accounts) ? (parsed.accounts as Account[]) : [];
    const txs = Array.isArray(parsed?.transactions) ? (parsed.transactions as Transaction[]) : [];

    setAccounts(acc);
    setTransactions(txs);

    localStorage.setItem(ACC_KEY, JSON.stringify(acc));
    localStorage.setItem(TX_KEY, JSON.stringify(txs));
  };

  const clearAllData = () => {
    setAccounts([]);
    setTransactions([]);
    localStorage.removeItem(ACC_KEY);
    localStorage.removeItem(TX_KEY);
  };

  const value: FinanceContextType = useMemo(
    () => ({
      accounts,
      transactions,
      isLoading,
      addAccount,
      updateAccount,
      deleteAccount,
      addTransaction,
      deleteTransaction,
      getAccountsWithBalances,
      exportData,
      importData,
      clearAllData,
    }),
    [accounts, transactions, isLoading]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};
