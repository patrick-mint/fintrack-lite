'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

const WelcomeScreen: React.FC = () => {
  const { t } = useLocale();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('welcome.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('welcome.subtitle')}</p>
        </div>

        {/* Privacy Banner */}
        <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <span className="text-2xl mr-3">🔒</span>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-medium text-green-800">{t('welcome.privacy.heading')}</h2>
              <p className="mt-1 text-green-700">{t('welcome.privacy.body')}</p>
            </div>
          </div>
        </div>

        {/* Quick Start Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">1️⃣</div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">{t('welcome.step1.title')}</h3>
            <p className="text-blue-700 mb-4 text-sm">{t('welcome.step1.desc')}</p>
            <Link
              href="/add-account"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
            >
              {t('welcome.step1.cta')}
            </Link>
          </div>

          {/* Step 2 */}
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">2️⃣</div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">{t('welcome.step2.title')}</h3>
            <p className="text-green-700 mb-4 text-sm">{t('welcome.step2.desc')}</p>
            <Link
              href="/record-balances"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
            >
              {t('welcome.step2.cta')}
            </Link>
          </div>

          {/* Step 3 */}
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">3️⃣</div>
            <h3 className="text-lg font-semibold text-purple-800 mb-3">{t('welcome.step3.title')}</h3>
            <p className="text-purple-700 mb-4 text-sm">{t('welcome.step3.desc')}</p>
            <Link
              href="/historical"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
            >
              {t('welcome.step3.cta')}
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{t('welcome.features.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">📊</span>
                <span>{t('welcome.features.f1')}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📈</span>
                <span>{t('welcome.features.f2')}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">💰</span>
                <span>{t('welcome.features.f3')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">🔒</span>
                <span>{t('welcome.features.f4')}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📤</span>
                <span>{t('welcome.features.f5')}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>{t('welcome.features.f6')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
          <div className="flex items-start">
            <span className="text-lg mr-2">💡</span>
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">{t('welcome.notice.title')}</h3>
              <p className="text-yellow-700 text-sm">{t('welcome.notice.body')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/add-account"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors text-center flex-1"
          >
            🚀 {t('welcome.getStarted')}
          </Link>
          <Link
            href="/disclaimer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors text-center"
          >
            📋 {t('welcome.privacyInfo')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
