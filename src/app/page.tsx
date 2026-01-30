"use client";

import { useRef } from "react";
import ClientOnly from "@/components/ClientOnly";
import { BalanceSheet } from "@/components/BalanceSheet";
import { DashboardDocumentsCard } from "@/components/DashboardDocumentsCard";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useFinance } from "@/context/FinanceContext";

export default function Home() {
  const exportRef = useRef<HTMLDivElement>(null);
  const { accounts, documents, transactions, isLoading } = useFinance();

  if (isLoading) {
    return (
      <ClientOnly>
        <div className="min-h-screen bg-white" />
      </ClientOnly>
    );
  }

  const hasAnyData =
    (accounts?.length ?? 0) > 0 ||
    (transactions?.length ?? 0) > 0 ||
    (documents?.length ?? 0) > 0;

  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-6 space-y-4">
          {!hasAnyData ? (
            <WelcomeScreen />
          ) : (
            <>
              <div ref={exportRef} className="space-y-4 bg-white">
                <DashboardDocumentsCard />
                <BalanceSheet />
              </div>
            </>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
