"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useFinance } from "@/context/FinanceContext";
import { useLocale } from "@/context/LocaleContext";

export const DashboardDocumentsCard: React.FC = () => {
  const { documents } = useFinance();
  const { t } = useLocale();

  const counts = useMemo(() => {
    const total = documents.length;
    const insurance = documents.filter(
      (d) => d.category === "insurance",
    ).length;
    const property = documents.filter((d) => d.category === "property").length;
    const valuables = documents.filter(
      (d) => d.category === "valuables",
    ).length;
    const other = documents.filter((d) => d.category === "other").length;
    return { total, insurance, property, valuables, other };
  }, [documents]);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">
            {t("dashboard.docs.title")}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {t("dashboard.docs.desc")}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
              {t("dashboard.docs.total")}: {counts.total}
            </span>
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">
              {t("dashboard.docs.insurance")}: {counts.insurance}
            </span>
            <span className="px-2 py-1 rounded bg-green-50 text-green-700">
              {t("dashboard.docs.property")}: {counts.property}
            </span>
            <span className="px-2 py-1 rounded bg-purple-50 text-purple-700">
              {t("dashboard.docs.valuables")}: {counts.valuables}
            </span>
            <span className="px-2 py-1 rounded bg-slate-50 text-slate-700">
              {t("dashboard.docs.other")}: {counts.other}
            </span>
          </div>
        </div>

        <Link
          href="/documents"
          className="print:hidden shrink-0 inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          📂 {t("dashboard.docs.cta")}
        </Link>
      </div>
    </div>
  );
};
