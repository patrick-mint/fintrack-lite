'use client';

import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import {'HistoricalTracking'} from '@/components/HistoricalTracking';

export default function Page() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-6">
          <HistoricalTracking />
        </div>
      </div>
    </ClientOnly>
  );
}
