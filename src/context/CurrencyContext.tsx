'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

// Keep at least THB available so first run never crashes.
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'THB', name: 'Thailand Baht', symbol: '฿', locale: 'th-TH' },
  { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
  { code: 'EUR', name: 'Euro', symbol: '€', locale: 'en-IE' },
];

type CurrencyContextType = {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'finance-currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(SUPPORTED_CURRENCIES[0]);

  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (!savedCode) return;

      const found = SUPPORTED_CURRENCIES.find((c) => c.code === savedCode);
      if (found) setSelectedCurrencyState(found);
    } catch {
      // ignore
    }
  }, []);

  const setSelectedCurrency = (currency: Currency) => {
    setSelectedCurrencyState(currency);
    try {
      localStorage.setItem(STORAGE_KEY, currency.code);
    } catch {
      // ignore
    }
  };

  const formatCurrency = useMemo(() => {
    return (amount: number) =>
      new Intl.NumberFormat(selectedCurrency.locale, {
        style: 'currency',
        currency: selectedCurrency.code,
      }).format(amount);
  }, [selectedCurrency.code, selectedCurrency.locale]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
};
