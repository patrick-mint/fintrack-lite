"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Account, AccountWithBalance } from "@/types/finance";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "./CurrencySelector";
import WelcomeScreen from "./WelcomeScreen";
import { ManageAccountModal } from "./ManageAccountModal";
import { useLocale } from "@/context/LocaleContext";
import { ExportPdfButton } from "@/components/ExportPdfButton";
import { getTodayString } from "@/util/createDate";

export const BalanceSheet: React.FC = () => {
  const { getAccountsWithBalances, deleteAccount, updateAccount, isLoading } =
    useFinance();
  const { formatCurrency } = useCurrency();
  const { t } = useLocale();

  const accountsWithBalances = getAccountsWithBalances();
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const exportRef = useRef<HTMLDivElement>(null);

  const handleSaveAccount = (
    updates: Pick<Account, "name" | "category" | "type">,
  ) => {
    if (!editingAccount) return;
    updateAccount(editingAccount.id, updates);
    setEditingAccount(null);
  };

  const tCategory = (category: string) => {
    const key = `accountCategory.${category}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const groupAccountsByType = (accounts: AccountWithBalance[]) => {
    return accounts.reduce(
      (groups, account) => {
        if (!groups[account.type]) groups[account.type] = {};
        if (!groups[account.type][account.category])
          groups[account.type][account.category] = [];
        groups[account.type][account.category].push(account);
        return groups;
      },
      {} as Record<string, Record<string, AccountWithBalance[]>>,
    );
  };

  const calculateTotalByType = (
    accounts: AccountWithBalance[],
    type: "asset" | "liability",
  ) => {
    return accounts
      .filter((account) => account.type === type)
      .reduce((total, account) => total + account.currentBalance, 0);
  };

  const groupedAccounts = useMemo(
    () => groupAccountsByType(accountsWithBalances),
    [accountsWithBalances],
  );

  const totalAssets = useMemo(
    () => calculateTotalByType(accountsWithBalances, "asset"),
    [accountsWithBalances],
  );

  const totalLiabilities = useMemo(
    () => calculateTotalByType(accountsWithBalances, "liability"),
    [accountsWithBalances],
  );

  const netWorth = totalAssets - totalLiabilities;

  const AccountSection: React.FC<{
    title: string;
    accounts: Record<string, AccountWithBalance[]>;
    total: number;
    type: "asset" | "liability";
  }> = ({ title, accounts, total, type }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
        {title}
      </h2>

      {Object.entries(accounts).map(([category, categoryAccounts]) => {
        const categoryLabel = tCategory(category);
        const categoryTotal = categoryAccounts.reduce(
          (sum, account) => sum + account.currentBalance,
          0,
        );

        return (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {categoryLabel}
            </h3>

            <div className="space-y-1">
              {categoryAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-800">{account.name}</span>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-medium ${
                        type === "asset" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(account.currentBalance)}
                    </span>

                    <button
                      onClick={() => setEditingAccount(account)}
                      className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      title={t("balanceSheet.editAccount")}
                    >
                      {t("balanceSheet.edit")}
                    </button>

                    <button
                      onClick={() => deleteAccount(account.id)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      title={t("balanceSheet.deleteAccount")}
                      aria-label={t("balanceSheet.deleteAccount")}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-2 mr-3">
              <span className="text-sm font-medium text-gray-600">
                {t("balanceSheet.categoryTotal")
                  .replace("{category}", categoryLabel)
                  .replace("{amount}", formatCurrency(categoryTotal))}
              </span>
            </div>
          </div>
        );
      })}

      <div className="text-right font-bold text-lg border-t border-gray-300 pt-2 mt-4">
        <span
          className={`${type === "asset" ? "text-green-700" : "text-red-700"}`}
        >
          {t("balanceSheet.totalSection")
            .replace("{title}", title)
            .replace("{amount}", formatCurrency(total))}
        </span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t("balanceSheet.loadingTitle")}
            </h1>
            <p className="text-gray-600">{t("balanceSheet.loadingSubtitle")}</p>
          </div>

          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (accountsWithBalances.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div ref={exportRef} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between gap-3 mb-8">
          <div className="min-w-0 text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t("balanceSheet.title")}
            </h1>
            <p className="text-gray-600" suppressHydrationWarning>
              {t("balanceSheet.asOf")} {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="shrink-0 print:hidden">
            <ExportPdfButton
              targetRef={exportRef}
              filename={`balance-sheet-${getTodayString()}.pdf`}
            />
          </div>
        </div>

        <div className="mb-8 flex justify-end">
          <CurrencySelector size="sm" />
        </div>

        {groupedAccounts.asset && (
          <AccountSection
            title={t("dashboard.assets")}
            accounts={groupedAccounts.asset}
            total={totalAssets}
            type="asset"
          />
        )}

        {groupedAccounts.liability && (
          <AccountSection
            title={t("dashboard.liabilities")}
            accounts={groupedAccounts.liability}
            total={totalLiabilities}
            type="liability"
          />
        )}

        <div className="border-t-2 border-gray-400 pt-6 mt-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-600">
                  {t("balanceSheet.totalAssets")}
                </div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(totalAssets)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  {t("balanceSheet.totalLiabilities")}
                </div>
                <div className="text-lg font-bold text-red-600">
                  {formatCurrency(totalLiabilities)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  {t("dashboard.netWorth")}
                </div>
                <div
                  className={`text-xl font-bold ${
                    netWorth >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {formatCurrency(netWorth)}
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-3 text-center">
            {t("balanceSheet.note")}
          </div>
        </div>
      </div>

      {editingAccount && (
        <ManageAccountModal
          account={editingAccount}
          onClose={() => setEditingAccount(null)}
          onSave={handleSaveAccount}
        />
      )}
    </div>
  );
};
