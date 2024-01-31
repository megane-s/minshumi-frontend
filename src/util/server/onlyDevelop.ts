'use server'
import { isDev } from '@/debug/isDebug'
import { notFound } from 'next/navigation'

export const onlyDevelopPage = () => {
  if (!isDev) notFound()
}
