'use client';

import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import { RecordBalances } from '@/components/RecordBalances';

export default function Page() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-6">
          <RecordBalances />
        </div>
      </div>
    </ClientOnly>
  );
}
