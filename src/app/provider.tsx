"use client"

import { FC, ReactNode } from "react"
import { MantineProvider } from '@mantine/core'

interface ProvidersProps {
  children: ReactNode
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  )
}
