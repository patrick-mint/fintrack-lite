'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { AccountType, ACCOUNT_CATEGORIES } from '@/types/finance';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useLocale } from '@/context/LocaleContext';

interface AddAccountFormProps {
  onSuccess?: () => void;
}

export const AddAccountForm: React.FC<AddAccountFormProps> = ({ onSuccess }) => {
  const { addAccount } = useFinance();
  const { trackEvent } = useAnalytics();
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    type: 'asset' as AccountType,
    category: ACCOUNT_CATEGORIES.asset[0] as string,
  });

  const handleTypeChange = (newType: AccountType) => {
    setFormData({
      ...formData,
      type: newType,
      category: ACCOUNT_CATEGORIES[newType][0], // Set default category
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) return;

    addAccount({
      name: formData.name.trim(),
      type: formData.type,
      category: formData.category,
    });

    // Track account creation
    trackEvent('account_created', {
      account_type: formData.type,
      account_category: formData.category,
    });

    // Reset form
    setFormData({
      name: '',
      type: 'asset',
      category: ACCOUNT_CATEGORIES.asset[0],
    });

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
          {t('accounts.name')}
        </label>
        <input
          type="text"
          id="accountName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t('accounts.placeholder')}
          required
        />
      </div>

      <div>
        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
          {t('accounts.type')}
        </label>
        <select
          id="accountType"
          value={formData.type}
          onChange={(e) => handleTypeChange(e.target.value as AccountType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="asset">{t('accounts.asset')}</option>
          <option value="liability">{t('accounts.liability')}</option>
                  </select>
      </div>

      <div>
        <label htmlFor="accountCategory" className="block text-sm font-medium text-gray-700 mb-2">
          {t('accounts.category')}
        </label>
        <select
          id="accountCategory"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {ACCOUNT_CATEGORIES[formData.type].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {t('accounts.create')}
      </button>
    </form>
  );
};
