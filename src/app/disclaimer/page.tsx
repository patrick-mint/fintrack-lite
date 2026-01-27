'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

const DisclaimerPage: React.FC = () => {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">{t('disclaimer.title')}</h1>

        <div className="space-y-4 text-gray-700">
          <p>{t('disclaimer.p1')}</p>
          <p>{t('disclaimer.p2')}</p>
          <p>{t('disclaimer.p3')}</p>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
