'use client';

import React, { useMemo, useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import type { TransactionType, AccountType } from '@/types/finance';
import { useCurrency } from '@/context/CurrencyContext';
import { normalizeYMD } from '@/lib/finance';
import { useLocale } from '@/context/LocaleContext';

export const RecordBalances: React.FC = () => {
  const { accounts, transactions, addTransaction, deleteTransaction, getAccountsWithBalances } =
    useFinance();
  const { formatCurrency } = useCurrency();
  const { t } = useLocale();
  const accountsWithBalances = getAccountsWithBalances();

  const [form, setForm] = useState<{
    date: string;
    type: TransactionType;
    amount: string;
    fromAccountId: string;
    toAccountId: string;
    category: string;
    note: string;
  }>({
    date: normalizeYMD(new Date()),
    type: 'expense',
    amount: '',
    fromAccountId: '',
    toAccountId: '',
    category: '',
    note: '',
  });

  const parseAmount = (v: string) => {
    const cleaned = v.replace(/,/g, '').trim();
    if (cleaned === '') return null;
    const n = Number(cleaned);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const assetAccounts = useMemo(() => accounts.filter((a) => a.type === 'asset'), [accounts]);
  const liabilityAccounts = useMemo(() => accounts.filter((a) => a.type === 'liability'), [accounts]);

  const recentTx = useMemo(() => {
    return [...transactions]
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
      .slice(0, 30);
  }, [transactions]);

  const tAccountType = (type: AccountType) => {
    const key = type === 'asset' ? 'accounts.asset' : 'accounts.liability';
    return t(key);
  };

  const tTxTypeLabel = (type: TransactionType) => {
    if (type === 'income') return t('tx.type.income');
    if (type === 'expense') return t('tx.type.expense');
    return t('tx.type.transfer');
  };

  const defaultCategoryByType = (type: TransactionType) => {
    if (type === 'income') return t('tx.defaultCategory.income');
    if (type === 'expense') return t('tx.defaultCategory.expense');
    return t('tx.defaultCategory.transfer');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseAmount(form.amount);
    if (amount == null) return;

    const date = normalizeYMD(form.date);
    const category = form.category?.trim() ? form.category.trim() : defaultCategoryByType(form.type);
    const note = form.note || '';

    if (form.type === 'income') {
      if (!form.toAccountId) return;
      addTransaction({
        date,
        type: 'income',
        amount,
        toAccountId: form.toAccountId,
        category,
        note,
        id: '',
      });
    }

    if (form.type === 'expense') {
      if (!form.fromAccountId) return;
      addTransaction({
        date,
        type: 'expense',
        amount,
        fromAccountId: form.fromAccountId,
        category,
        note,
        id: '',
      });
    }

    if (form.type === 'transfer') {
      if (!form.fromAccountId || !form.toAccountId) return;
      if (form.fromAccountId === form.toAccountId) return;
      addTransaction({
        date,
        type: 'transfer',
        amount,
        fromAccountId: form.fromAccountId,
        toAccountId: form.toAccountId,
        category,
        note,
        id: '',
      });
    }

    setForm((f) => ({ ...f, amount: '', category: '', note: '' }));
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">{t('tx.noAccounts.title')}</div>
        <p className="text-gray-400">{t('tx.noAccounts.subtitle')}</p>
      </div>
    );
  }

  const fromOptions = [...assetAccounts, ...liabilityAccounts];
  const toOptions = [...assetAccounts, ...liabilityAccounts];

  const labelBalance = (accountId: string) => {
    const acc = accountsWithBalances.find((a) => a.id === accountId);
    if (!acc) return '';
    return ` • ${formatCurrency(acc.currentBalance)}`;
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-800 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('tx.title')}</h1>
          <p className="text-gray-600">{t('tx.helper.body')}</p>
          <p className="text-xs text-gray-500 mt-2">{t('tx.helper.tip')}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tx.date')}</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tx.type')}</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as TransactionType,
                    fromAccountId: '',
                    toAccountId: '',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="expense">{t('tx.type.expense')}</option>
                <option value="income">{t('tx.type.income')}</option>
                <option value="transfer">{t('tx.type.transfer')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tx.amount')}</label>
              <input
                type="text"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              />
            </div>
          </div>

          {form.type === 'income' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tx.toAccount')}
                </label>
                <select
                  value={form.toAccountId}
                  onChange={(e) => setForm({ ...form, toAccountId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('tx.selectAccount')}</option>
                  {toOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({tAccountType(a.type)}){labelBalance(a.id)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tx.category')} {t('common.optional')}
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder={t('tx.category.placeholder.income')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {form.type === 'expense' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tx.fromAccount')}
                </label>
                <select
                  value={form.fromAccountId}
                  onChange={(e) => setForm({ ...form, fromAccountId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('tx.selectAccount')}</option>
                  {fromOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({tAccountType(a.type)}){labelBalance(a.id)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">{t('tx.expense.liabilityHint')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tx.category')} {t('common.optional')}
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder={t('tx.category.placeholder.expense')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {form.type === 'transfer' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tx.from')}</label>
                <select
                  value={form.fromAccountId}
                  onChange={(e) => setForm({ ...form, fromAccountId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('tx.selectAccount')}</option>
                  {fromOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({tAccountType(a.type)}){labelBalance(a.id)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tx.to')}</label>
                <select
                  value={form.toAccountId}
                  onChange={(e) => setForm({ ...form, toAccountId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('tx.selectAccount')}</option>
                  {toOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({tAccountType(a.type)}){labelBalance(a.id)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">{t('tx.transfer.debtHint')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tx.category')} {t('common.optional')}
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder={t('tx.category.placeholder.transfer')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tx.note')} {t('common.optional')}
            </label>
            <input
              type="text"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder={t('tx.note.placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {t('tx.add')}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{t('tx.recent')}</h2>
          <div className="text-sm text-gray-500">
            {t('tx.totalCount').replace('{count}', String(transactions.length))}
          </div>
        </div>

        {recentTx.length === 0 ? (
          <div className="text-center py-10 text-gray-500">{t('tx.noTxYet')}</div>
        ) : (
          <div className="space-y-2">
            {recentTx.map((tx) => {
              const from = tx.fromAccountId ? accounts.find((a) => a.id === tx.fromAccountId) : null;
              const to = tx.toAccountId ? accounts.find((a) => a.id === tx.toAccountId) : null;

              const title =
                tx.type === 'income'
                  ? t('tx.recent.title.income').replace('{to}', to?.name ?? t('common.unknown'))
                  : tx.type === 'expense'
                    ? t('tx.recent.title.expense').replace(
                        '{from}',
                        from?.name ?? t('common.unknown')
                      )
                    : t('tx.recent.title.transfer')
                        .replace('{from}', from?.name ?? t('common.unknown'))
                        .replace('{to}', to?.name ?? t('common.unknown'));

              return (
                <div
                  key={tx.id}
                  className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-800 truncate">
                      {title}
                      {tx.category ? (
                        <span className="text-gray-500 font-normal"> • {tx.category}</span>
                      ) : null}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {tx.date}
                      {tx.note ? ` • ${tx.note}` : ''}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{formatCurrency(tx.amount)}</div>
                      <div className="text-xs text-gray-500">{tTxTypeLabel(tx.type)}</div>
                    </div>

                    <button
                      onClick={() => {
                        const ok = window.confirm(t('tx.deleteConfirm'));
                        if (ok) deleteTransaction(tx.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      title={t('tx.deleteTitle')}
                      aria-label={t('tx.deleteTitle')}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
