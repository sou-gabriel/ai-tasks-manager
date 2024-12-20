'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { getQueryClient } from '@/lib/query-client'

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={getQueryClient()}>
        {children}
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
