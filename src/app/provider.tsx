"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import StyleProvider from "@/style/provider"
import { LazyMotion, domAnimation } from "framer-motion"

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        <SessionProvider>
          <Toaster
            position="bottom-center"
          />
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </SessionProvider>
      </StyleProvider>
    </QueryClientProvider>
  )
}
