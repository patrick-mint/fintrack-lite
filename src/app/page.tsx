'use client';

import { BalanceSheet } from "@/components/BalanceSheet";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-6">
          <BalanceSheet />
        </div>
      </div>
    </ClientOnly>
  );
}
