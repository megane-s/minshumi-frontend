import { ReactNode } from "react"
import { getMetadata } from "@/seo/getMetadata"
import { Metadata } from "next"

export const metadata: Metadata = getMetadata({
    title: "作品、ユーザー検索 | みんしゅみ",
})

interface PageProps {
    children: ReactNode
}
const SearchLayout = ({ children }: PageProps) => {
    return (
        children
    )
}
export default SearchLayout