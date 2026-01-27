'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLocale } from '@/context/LocaleContext';
import { CurrencySelector } from './CurrencySelector';

const Settings: React.FC = () => {
  const { importData, exportData, clearAllData } = useFinance();
  const { selectedCurrency } = useCurrency();
  const { locale, setLocale, t } = useLocale();

  const [importText, setImportText] = useState('');

  const onExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-finance-tracker.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const onImport = () => {
    try {
      importData(importText);
      setImportText('');
      alert(t('settings.import.success'));
    } catch (e) {
      alert(t('settings.import.error'));
    }
  };

  const onClear = () => {
    const ok = confirm(t('settings.clear.confirm'));
    if (ok) clearAllData();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">{t('settings.title')}</h1>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-medium">{t('settings.language.title')}</div>
            <div className="text-sm text-gray-500">{t('settings.language.desc')}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLocale('en')}
              className={`px-3 py-2 rounded text-sm ${
                locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLocale('th')}
              className={`px-3 py-2 rounded text-sm ${
                locale === 'th' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              ไทย
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <div className="font-medium">{t('settings.currencyPrefs.title')}</div>
        <div className="text-sm text-gray-500">
          {t('settings.currencyPrefs.currently')}{' '}
          <span className="font-medium">
            {selectedCurrency?.name ?? '—'} ({selectedCurrency?.symbol ?? ''})
          </span>
        </div>
        <CurrencySelector />
      </section>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <div className="font-medium">{t('settings.export.title')}</div>
        <div className="text-sm text-gray-500">{t('settings.export.desc')}</div>
        <button onClick={onExport} className="px-4 py-2 rounded bg-gray-900 text-white">
          {t('settings.export.button')}
        </button>
      </section>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <div className="font-medium">{t('settings.import.title')}</div>
        <div className="text-sm text-gray-500">{t('settings.import.desc')}</div>

        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          className="w-full border rounded p-2 text-sm h-40"
          placeholder={t('settings.import.placeholder')}
        />

        <div className="flex gap-2">
          <button onClick={onImport} className="px-4 py-2 rounded bg-blue-600 text-white">
            {t('settings.import.button')}
          </button>
          <button onClick={() => setImportText('')} className="px-4 py-2 rounded bg-gray-100">
            {t('common.clear')}
          </button>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <div className="font-medium text-red-700">{t('settings.clear.title')}</div>
        <div className="text-sm text-gray-500">{t('settings.clear.desc')}</div>
        <button onClick={onClear} className="px-4 py-2 rounded bg-red-600 text-white">
          {t('settings.clear.button')}
        </button>
      </section>
    </div>
  );
};

export default Settings;
