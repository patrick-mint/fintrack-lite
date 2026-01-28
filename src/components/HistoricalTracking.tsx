'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { BalanceChart } from './BalanceChart';
import { NetWorthChart } from './NetWorthChart';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';
import { computeAccountSeries } from '@/lib/finance';
import { useLocale } from '@/context/LocaleContext';
import type { AccountType } from '@/types/finance';

type DateRange = '7d' | '30d' | '90d' | '1y' | 'all';

export const HistoricalTracking: React.FC = () => {
  const { accounts, transactions, isLoading } = useFinance();
  const { formatCurrency } = useCurrency();
  const { t } = useLocale();

  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const tAccountType = (type: AccountType) => {
    return type === 'asset' ? t('accounts.asset') : t('accounts.liability');
  };

  const getDateRangeStart = (range: DateRange): string | undefined => {
    const now = new Date();
    const days =
      range === '7d'
        ? 7
        : range === '30d'
          ? 30
          : range === '90d'
            ? 90
            : range === '1y'
              ? 365
              : null;

    if (days == null) return undefined;

    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return start.toISOString().split('T')[0];
  };

  const dateRangeStart = useMemo(() => getDateRangeStart(dateRange), [dateRange]);

  const accountsWithAnyTx = useMemo(() => {
    const set = new Set<string>();
    for (const tx of transactions) {
      if (tx.fromAccountId) set.add(tx.fromAccountId);
      if (tx.toAccountId) set.add(tx.toAccountId);
    }
    return accounts.filter((a) => set.has(a.id));
  }, [accounts, transactions]);

  const seriesByAccount = useMemo(() => {
    const map = new Map<string, { date: Date; amount: number }[]>();
    for (const a of accountsWithAnyTx) {
      map.set(a.id, computeAccountSeries(a.id, accounts, transactions, dateRangeStart));
    }
    return map;
  }, [accountsWithAnyTx, accounts, transactions, dateRangeStart]);

  const getLatest = (accountId: string) => {
    const s = seriesByAccount.get(accountId) ?? [];
    return s.length ? s[s.length - 1].amount : 0;
  };

  const getChangeFromFirst = (accountId: string) => {
    const s = seriesByAccount.get(accountId) ?? [];
    if (s.length < 2) return 0;
    return s[s.length - 1].amount - s[0].amount;
  };

  const getChangePercent = (accountId: string) => {
    const s = seriesByAccount.get(accountId) ?? [];
    if (s.length < 2) return 0;
    const first = s[0].amount;
    const latest = s[s.length - 1].amount;
    if (first === 0) return 0;
    return ((latest - first) / Math.abs(first)) * 100;
  };

  const selectedAccountData = accounts.find((acc) => acc.id === selectedAccount);

  if (!isClient || isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('historical.title')}</h1>
            <p className="text-gray-600">{t('historical.loading')}</p>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">{t('historical.noData.title')}</div>
            <p className="text-gray-400">{t('historical.noData.subtitle')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('historical.title')}</h1>
          <p className="text-gray-600">{t('historical.subtitle')}</p>
        </div>

        <div className="mb-6 flex justify-end">
          <CurrencySelector size="sm" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label htmlFor="account-select" className="block text-sm font-medium text-gray-700 mb-2">
              {t('historical.selectAccount')}
            </label>
            <select
              id="account-select"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('historical.allAccounts')}</option>
              {accountsWithAnyTx.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} ({tAccountType(account.type)})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-2">
              {t('historical.timePeriod')}
            </label>
            <select
              id="date-range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">{t('historical.range.7d')}</option>
              <option value="30d">{t('historical.range.30d')}</option>
              <option value="90d">{t('historical.range.90d')}</option>
              <option value="1y">{t('historical.range.1y')}</option>
              <option value="all">{t('historical.range.all')}</option>
            </select>
          </div>
        </div>

        {selectedAccount === 'all' ? (
          <div className="space-y-8">
            <div className="mb-8">
              <NetWorthChart
                accounts={accounts}
                transactions={transactions}
                dateRangeStart={dateRangeStart}
                height={400}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('historical.summary.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {accountsWithAnyTx.map((account) => {
                const latestBalance = getLatest(account.id);
                const change = getChangeFromFirst(account.id);
                const changePercent = getChangePercent(account.id);

                return (
                  <div key={account.id} className="bg-gray-50 rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-800 mb-2">{account.name}</h3>
                    <div className="text-lg font-bold mb-1 text-gray-900">
                      {formatCurrency(latestBalance)}
                    </div>
                    <div
                      className={`text-sm flex items-center space-x-2 ${
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      <span>{change >= 0 ? '↗' : '↘'}</span>
                      <span>
                        {formatCurrency(Math.abs(change))} ({Math.abs(changePercent).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(seriesByAccount.get(account.id) ?? []).length} {t('historical.points')}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-8">
              {accountsWithAnyTx.map((account) => (
                <div key={account.id} className="border rounded-lg p-4">
                  <BalanceChart account={account} series={seriesByAccount.get(account.id) ?? []} height={300} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          selectedAccountData && (
            <div>
              <BalanceChart
                account={selectedAccountData}
                series={seriesByAccount.get(selectedAccount) ?? []}
                height={500}
              />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {t('historical.card.currentBalance')}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(getLatest(selectedAccount))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t('historical.card.change')}</h3>
                  <div
                    className={`text-2xl font-bold ${
                      getChangeFromFirst(selectedAccount) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(getChangeFromFirst(selectedAccount))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {t('historical.card.dataPoints')}
                  </h3>
                  <div className="text-2xl font-bold text-gray-600">
                    {(seriesByAccount.get(selectedAccount) ?? []).length}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
