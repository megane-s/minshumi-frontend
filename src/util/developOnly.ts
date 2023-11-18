import { notFound } from "next/navigation"

export const developOnlyPage = () => {
    const env: string = process.env.NODE_ENV
    const isDevelopment = env == "development" || env === "preview"
    if (isDevelopment) return
    notFound()
}
