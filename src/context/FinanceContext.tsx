/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {Account, Transaction, AccountWithBalance, DocumentItem} from "@/types/finance";
import { getAccountsWithBalances as computeAccountsWithBalances } from "@/lib/finance";
import { ACCOUNT_CATEGORIES } from "@/types/finance";

const ACC_KEY = "finance-accounts";
const TX_KEY = "finance-transactions";
const DOC_KEY = "finance-documents";

interface FinanceContextType {
  accounts: Account[];
  transactions: Transaction[];
  documents: DocumentItem[];
  isLoading: boolean;

  addAccount: (account: Account) => void;

  updateAccount: (
    accountId: string,
    updates: Pick<Account, "name" | "category" | "type">,
  ) => void;

  deleteAccount: (accountId: string) => void;

  addDocument: (doc: DocumentItem) => void;
  updateDocument: (docId: string, updates: Partial<Omit<DocumentItem, "id" | "createdAt" | "updatedAt">>) => void;
  deleteDocument: (docId: string) => void;

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

function makeId(): string {
  return typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeAccounts(raw: any[]): Account[] {
  return (raw || []).map((a) => {
    const type = a?.type === "liability" ? "liability" : "asset";
    const categoryList = ACCOUNT_CATEGORIES[type];
    return {
      id: typeof a?.id === "string" && a.id.trim() ? a.id : makeId(),
      name:
        typeof a?.name === "string" && a.name.trim()
          ? a.name.trim()
          : "Unnamed",
      type,
      category:
        typeof a?.category === "string" && a.category.trim()
          ? a.category
          : categoryList[0],
      createdAt: a?.createdAt ? new Date(a.createdAt) : new Date(),
    } satisfies Account;
  });
}

function normalizeTransactions(raw: any[]): Transaction[] {
  return (raw || []).map((t) => {
    const categoryRaw =
      typeof t?.category === "string" ? t.category.trim() : "";
    const legacyDefault =
      categoryRaw === "Income" ||
      categoryRaw === "Expense" ||
      categoryRaw === "Transfer";
    const category = !categoryRaw || legacyDefault ? undefined : categoryRaw;

    return {
      id: typeof t?.id === "string" && t.id.trim() ? t.id : makeId(),
      date:
        typeof t?.date === "string"
          ? t.date
          : new Date().toISOString().slice(0, 10),
      type: t?.type === "expense" || t?.type === "transfer" ? t.type : "income",
      amount: typeof t?.amount === "number" ? t.amount : Number(t?.amount ?? 0),
      fromAccountId:
        typeof t?.fromAccountId === "string" ? t.fromAccountId : undefined,
      toAccountId:
        typeof t?.toAccountId === "string" ? t.toAccountId : undefined,
      category,
      note: typeof t?.note === "string" ? t.note : undefined,
    };
  });
}

function normalizeDocuments(raw: any[]): DocumentItem[] {
  return (raw || []).map((d) => {
    const category =
      d?.category === "property" || d?.category === "valuables" || d?.category === "other"
        ? d.category
        : "insurance";

    const num = (v: any): number | undefined => {
      const n = typeof v === "number" ? v : Number(v);
      return Number.isFinite(n) ? n : undefined;
    };

    return {
      id: typeof d?.id === "string" && d.id.trim() ? d.id : makeId(),
      category,
      title: typeof d?.title === "string" && d.title.trim() ? d.title.trim() : "Untitled",
      provider: typeof d?.provider === "string" ? d.provider : undefined,
      referenceNo: typeof d?.referenceNo === "string" ? d.referenceNo : undefined,
      location: typeof d?.location === "string" ? d.location : undefined,
      medicalCoverage: num(d?.medicalCoverage),
      deathBenefit: num(d?.deathBenefit),
      areaSqm: num(d?.areaSqm),
      quantity: num(d?.quantity),
      estimatedValue: num(d?.estimatedValue),
      notes: typeof d?.notes === "string" ? d.notes : undefined,
      createdAt: d?.createdAt ? new Date(d.createdAt) : new Date(),
      updatedAt: d?.updatedAt ? new Date(d.updatedAt) : new Date(),
    } satisfies DocumentItem;
  });
}


export const FinanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accRaw = safeParse<any[]>(localStorage.getItem(ACC_KEY), []);
    const txRaw = safeParse<any[]>(localStorage.getItem(TX_KEY), []);
    const docRaw = safeParse<any[]>(localStorage.getItem(DOC_KEY), []);

    const acc = normalizeAccounts(accRaw);
    const txs = normalizeTransactions(txRaw);
    const docs = normalizeDocuments(docRaw);

    setAccounts(acc);
    setTransactions(txs);
    setDocuments(docs);

    localStorage.setItem(ACC_KEY, JSON.stringify(acc));
    localStorage.setItem(TX_KEY, JSON.stringify(txs));
    localStorage.setItem(DOC_KEY, JSON.stringify(docs));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(ACC_KEY, JSON.stringify(accounts));
  }, [accounts, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(TX_KEY, JSON.stringify(transactions));
  }, [transactions, isLoading]);

  const addAccount = (account: Account) => {
    const next: Account = {
      ...account,
      id: account?.id?.trim() ? account.id : makeId(),
      createdAt: account?.createdAt ? new Date(account.createdAt) : new Date(),
    };
    setAccounts((prev) => [...prev, next]);
  };

  const updateAccount = (
    accountId: string,
    updates: Pick<Account, "name" | "category" | "type">,
  ) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === accountId
          ? {
              ...a,
              name: updates.name.trim(),
              type: updates.type,
              category: updates.category,
            }
          : a,
      ),
    );
  };

  const deleteAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== accountId));
  };

  const addDocument = (doc: DocumentItem) => {
    const next: DocumentItem = {
      ...doc,
      id: doc?.id?.trim() ? doc.id : makeId(),
      createdAt: doc?.createdAt ? new Date(doc.createdAt) : new Date(),
      updatedAt: new Date(),
    };
    setDocuments((prev) => [next, ...prev]);
  };

  const updateDocument = (
    docId: string,
    updates: Partial<Omit<DocumentItem, "id" | "createdAt" | "updatedAt">>,
  ) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              ...updates,
              title: typeof updates.title === "string" ? updates.title.trim() : d.title,
              updatedAt: new Date(),
            }
          : d,
      ),
    );
  };

  const deleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const addTransaction = (tx: Transaction) => {
    const next: Transaction = {
      ...tx,
      id: tx?.id?.trim() ? tx.id : makeId(),
    };
    setTransactions((prev) => [next, ...prev]);
  };

  const deleteTransaction = (txId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== txId));
  };

  const getAccountsWithBalances = () =>
    computeAccountsWithBalances(accounts, transactions);

  const exportData = () => {
    return JSON.stringify(
      {
        accounts,
        transactions,
        documents,
        exportedAt: new Date().toISOString(),
        version: 1,
      },
      null,
      2,
    );
  };

  const importData = (jsonText: string) => {
    const parsed = JSON.parse(jsonText);

    const acc = normalizeAccounts(
      Array.isArray(parsed?.accounts) ? parsed.accounts : [],
    );
    const txs = normalizeTransactions(
      Array.isArray(parsed?.transactions) ? parsed.transactions : [],
    );
    const docs = normalizeDocuments(
      Array.isArray(parsed?.documents) ? parsed.documents : [],
    );

    setAccounts(acc);
    setTransactions(txs);
    setDocuments(docs);

    localStorage.setItem(ACC_KEY, JSON.stringify(acc));
    localStorage.setItem(TX_KEY, JSON.stringify(txs));
    localStorage.setItem(DOC_KEY, JSON.stringify(docs));
  };

  const clearAllData = () => {
    setAccounts([]);
    setTransactions([]);
    setDocuments([]);
    localStorage.removeItem(ACC_KEY);
    localStorage.removeItem(TX_KEY);
    localStorage.removeItem(DOC_KEY);
  };

  const value: FinanceContextType = useMemo(
    () => ({
      accounts,
      transactions,
      documents,
      isLoading,
      addAccount,
      updateAccount,
      deleteAccount,
      addDocument,
      updateDocument,
      deleteDocument,
      addTransaction,
      deleteTransaction,
      getAccountsWithBalances,
      exportData,
      importData,
      clearAllData,
    }),
    [accounts, transactions, documents, isLoading],
  );

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};
