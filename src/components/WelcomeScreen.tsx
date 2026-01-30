"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

const WelcomeScreen: React.FC = () => {
  const { t } = useLocale();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💼</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {t("welcome.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("welcome.subtitle")}
          </p>
        </div>

        {/* Privacy */}
        <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-10">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h2 className="text-lg font-semibold text-green-800">
              {t("welcome.privacy.heading")}
            </h2>
            <p className="text-green-700 mt-1">{t("welcome.privacy.body")}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-semibold text-blue-800 mb-2">
              {t("welcome.step1.title")}
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              {t("welcome.step1.desc")}
            </p>
            <Link href="/add-account" className="btn-primary">
              {t("welcome.step1.cta")}
            </Link>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-semibold text-green-800 mb-2">
              {t("welcome.step2.title")}
            </h3>
            <p className="text-sm text-green-700 mb-4">
              {t("welcome.step2.desc")}
            </p>
            <Link href="/record-balances" className="btn-success">
              {t("welcome.step2.cta")}
            </Link>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-semibold text-purple-800 mb-2">
              {t("welcome.step3.title")}
            </h3>
            <p className="text-sm text-purple-700 mb-4">
              {t("welcome.step3.desc")}
            </p>
            <Link href="/historical" className="btn-purple">
              {t("welcome.step3.cta")}
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            {t("welcome.features.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            <div>💰 {t("welcome.features.f1")}</div>
            <div>📊 {t("welcome.features.f2")}</div>
            <div>🏠 {t("welcome.features.f3")}</div>
            <div>🧾 {t("welcome.features.f4")}</div>
            <div>🔐 {t("welcome.features.f5")}</div>
            <div>📦 {t("welcome.features.f6")}</div>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
          <div className="flex gap-2">
            <span>💡</span>
            <div>
              <div className="font-medium text-yellow-800">
                {t("welcome.notice.title")}
              </div>
              <div className="text-sm text-yellow-700">
                {t("welcome.notice.body")}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/add-account" className="btn-primary flex-1 text-center text-gray-700">
            🚀 {t("welcome.getStarted")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
