//検索結果画面
import { ArtListItem } from "@/app/tag/[tag_id]/ArtListItem"
import { FC } from "react"
import { searchArt } from "@/art/search"
import { } from "next/navigation"
import Image from 'next/image'
import { Flex } from "@mantine/core"
import { PageTitle } from "@/components/PageTitle"
import { SectionTitle } from "@/components/SectionTitle"

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
                <Flex justify="center" align="center" p={50}>
                    {/* TODO コメントない時に表示される内容を改善 */}
                    <center>
                        <Image
                            src="/404-notext.png"
                            alt='none'
                            width={200}
                            height={400}
                        />
                        <PageTitle style={{ color: 'red' }}>
                            作品の検索結果はありません
                        </PageTitle>
                        <SectionTitle>
                            検索条件を変えて検索してみてください
                        </SectionTitle>
                    </center>

                </Flex>
            }
        </div>
    )
}
