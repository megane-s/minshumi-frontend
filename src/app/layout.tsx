import "@mantine/core/styles.css"
import { ColorSchemeScript } from "@mantine/core"
import { Inter } from 'next/font/google'

import type { Metadata } from 'next'

import { Providers } from "./provider"
import BaseLayout from "./BaseLayout/BaseLayout"
import { getMetadata } from "@/seo/getMetadata"

import "@/style/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <BaseLayout>
            {children}
          </BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
