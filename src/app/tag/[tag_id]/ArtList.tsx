"use client"

import { Art, ArtSchema, ArtTag } from "@/art/type"
import { Button } from "@/components/Button"
import { Loader } from "@/components/Loader"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FC, useMemo } from "react"
import { center } from "styled-system/patterns"
import ArtListItem from "./ArtListItem/client"

interface ArtListProps {
    tag: ArtTag
    defaultArts: Art[]
    artsPerPage?: number
}
const ArtList: FC<ArtListProps> = ({ tag, defaultArts, artsPerPage = defaultArts.length }) => {
    const moreArts = useInfiniteQuery<Art[]>({
        queryKey: ["arts"],
        queryFn: async ({ pageParam }) => {
            console.log("pageParam", pageParam)
            const offset = pageParam as number
            const arts = await fetch(`/api/tag/${tag}/arts?offset=${offset}&limit=${artsPerPage}`)
                .then(r => r.json())
                .then(r => ArtSchema.array().parse(r))
            return arts
        },
        initialPageParam: defaultArts.length,
        getNextPageParam: (lastPage, pages) => {
            console.log("getNextPageParam", lastPage, pages)
            return lastPage.length === 0 ? null : defaultArts.length + pages.flat().length
        },
    })
    const arts = useMemo(() =>
        [...defaultArts, ...moreArts.data?.pages.flat() ?? []],
        [defaultArts, moreArts.data?.pages]
    )
    return (
        <div>
            {arts.map(art =>
                <ArtListItem
                    key={art.artId}
                    art={art}
                />
            )}
            {moreArts.hasNextPage &&
                <Button
                    variant="default"
                    className={center({ w: "full", my: "md" })}
                    onClick={() => moreArts.fetchNextPage()}
                    disabled={moreArts.isFetching}
                    leftSection={moreArts.isFetching && <Loader size="sm" />}
                >
                    もっと見る
                </Button>
            }
        </div>
    )
}

export default ArtList
