import { Stack } from "@mantine/core"
import { FC } from "react"
import { InputRelatedArt } from "../type"
import Image from "next/image"

interface RelatedArtListItemProps {
    size?: "md" | "lg"
    artInput: InputRelatedArt
    onClickRelatedArt: () => void
}
const RelatedArtListItem: FC<RelatedArtListItemProps> = ({ size = "md", artInput, onClickRelatedArt }) => {
    return (
        <Stack
            align="center"
            gap="xs"
            ta="center"
            onClick={() => void onClickRelatedArt()}
        >
            <Image
                src={artInput.imageUrl}
                alt={artInput.title}
                width={150 * (size === "lg" ? 1.2 : 1)}
                height={100 * (size === "lg" ? 1.2 : 1)}
                style={{ width: 150, height: "auto" }}
            />
            {artInput.title}
        </Stack>
    )
}

export default RelatedArtListItem

