import { FC } from "react"
import ArtListItemContent from "./content"
import { Art, ArtTagSchema } from "@/art/type"
import { useQuery } from "@tanstack/react-query"

interface ArtListItemProps {
    art: Art
    maxTags?: number
}
const ArtListItem: FC<ArtListItemProps> = ({
    art,
    maxTags = Number.MAX_SAFE_INTEGER,
}) => {
    const tags = useQuery({
        queryKey: ["art", art.artId, "tags"],
        queryFn: async () => {
            return await fetch(`/api/art/${art.artId}/tags`)
                .then(r => r.json())
                .then(r => ArtTagSchema.array().parse(r))
        },
    })
    return (
        <ArtListItemContent
            art={art}
            tags={tags.data ?? []}
            maxTags={maxTags}
        />
    )
}

export default ArtListItem
