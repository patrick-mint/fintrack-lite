import type { Account, Transaction, AccountWithBalance } from '@/types/finance';

function parseYMD(dateStr: string): Date {
  // expects YYYY-MM-DD
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function normalizeYMD(input: string | Date): string {
  if (typeof input === 'string') {
    // already YMD or ISO
    const m = input.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
    const d = new Date(input);
    if (!Number.isFinite(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  }
  return input.toISOString().split('T')[0];
}

/**
 * Returns a POSITIVE balance for both assets and liabilities:
 * - asset: money you have
 * - liability: outstanding debt
 *
 * Rules:
 * - asset: to += amount, from -= amount
 * - liability: to -= amount, from += amount
 */
export function computeAccountBalance(
  accountId: string,
  accounts: Account[],
  transactions: Transaction[],
  upToDateInclusive?: string // YYYY-MM-DD
): number {
  const acc = accounts.find(a => a.id === accountId);
  if (!acc) return 0;

  const cutoff = upToDateInclusive ? parseYMD(upToDateInclusive).getTime() : null;

  let bal = 0;
  for (const tx of transactions) {
    const txTime = parseYMD(tx.date).getTime();
    if (cutoff != null && txTime > cutoff) continue;

    if (tx.toAccountId === accountId) {
      bal += acc.type === 'asset' ? tx.amount : -tx.amount;
    }
    if (tx.fromAccountId === accountId) {
      bal += acc.type === 'asset' ? -tx.amount : tx.amount;
    }
  }

  // keep clean numeric
  return Number.isFinite(bal) ? bal : 0;
}

export function getAccountsWithBalances(
  accounts: Account[],
  transactions: Transaction[]
): AccountWithBalance[] {
  return accounts.map(a => ({
    ...a,
    currentBalance: computeAccountBalance(a.id, accounts, transactions),
  }));
}

export function computeNetWorth(
  accounts: Account[],
  transactions: Transaction[],
  upToDateInclusive?: string
): { assets: number; liabilities: number; netWorth: number } {
  let assets = 0;
  let liabilities = 0;

  for (const acc of accounts) {
    const bal = computeAccountBalance(acc.id, accounts, transactions, upToDateInclusive);
    if (acc.type === 'asset') assets += bal;
    else liabilities += bal; // already positive debt
  }

  return { assets, liabilities, netWorth: assets - liabilities };
}

export function listUniqueDates(transactions: Transaction[]): string[] {
  const set = new Set<string>();
  for (const tx of transactions) set.add(tx.date);
  return Array.from(set).sort();
}

export function computeNetWorthSeries(
  accounts: Account[],
  transactions: Transaction[],
  dateRangeStart?: string // YYYY-MM-DD
): { date: Date; assets: number; liabilities: number; netWorth: number }[] {
  const dates = listUniqueDates(transactions);
  const filtered = dateRangeStart ? dates.filter(d => d >= dateRangeStart) : dates;

  return filtered.map(d => {
    const res = computeNetWorth(accounts, transactions, d);
    return { date: parseYMD(d), ...res };
  });
}

export function computeAccountSeries(
  accountId: string,
  accounts: Account[],
  transactions: Transaction[],
  dateRangeStart?: string
): { date: Date; amount: number }[] {
  const dates = listUniqueDates(transactions);
  const filtered = dateRangeStart ? dates.filter(d => d >= dateRangeStart) : dates;

  return filtered.map(d => ({
    date: parseYMD(d),
    amount: computeAccountBalance(accountId, accounts, transactions, d),
  }));
}
