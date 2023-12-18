//検索結果画面
import { ArtListItem } from "@/app/tag/[tag_id]/ArtListItem"
import { FC } from "react"
import { searchArt } from "@/art/search"
import { } from "next/navigation"

export const revalidate = 0

interface SearchResultListProps {
    query: string
}
export const SearchResultList: FC<SearchResultListProps> = async ({ query }) => {
    const searchResult = await searchArt(query)
    return (
        <div>
            {searchResult.map(art =>
                <ArtListItem
                    key={art.artId}
                    art={art}
                />
            )}
            {searchResult.length === 0 &&
                <div>検索結果が0件です。</div>
            }
        </div>
    )
}
