'use client';

import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import Settings from '@/components/Settings';

export default function Page() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-6">
          <Settings />
        </div>
      </div>
    </ClientOnly>
  );
}
