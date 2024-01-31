import { Art } from "@/art/type"
import { FC } from "react"
import { getTags } from "@/art/tag/getTags"
import ArtListItemContent from "./content"

interface ArtListItemProps {
    art: Art
    maxTags?: number
}
export const ArtListItem: FC<ArtListItemProps> = async ({ art, maxTags = 5 }) => {
    const tags = await getTags(art.artId)
    const limitedTags = tags.slice(0, maxTags)
    return (
        <ArtListItemContent
            art={art}
            tags={limitedTags}
        />
    );
};