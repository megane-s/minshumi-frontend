"use client"

import { FC, ReactNode } from "react"
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
