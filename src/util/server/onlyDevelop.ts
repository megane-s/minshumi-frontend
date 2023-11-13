'use server'
import { notFound } from 'next/navigation'

export const onlyDevelopPage = () => {
  if (process.env.NODE_ENV !== 'development') notFound()
}
