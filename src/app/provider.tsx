"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import StyleProvider from "@/style/provider"

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </StyleProvider>
    </QueryClientProvider>
  )
}
