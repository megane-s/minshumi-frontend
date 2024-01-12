import { Art } from "@/art/type"
import { FC } from "react"
import { Flex, Text } from "@mantine/core"
import Image from "next/image"
import Link from 'next/link'
import { getTags } from "@/art/tag/getTags"
import { css } from "styled-system/css"
import { Tags } from "@/art/tag/components/Tags"

interface ArtListItemProps {
    art: Art
    maxTags?: number
}
export const ArtListItem: FC<ArtListItemProps> = async ({ art, maxTags = 5 }) => {
    const tags = await getTags(art.artId)
    const limitedTags = tags.slice(0, maxTags)
    return (
        <Link href={`/art/${art.artId}`} className={css({ color: "inherit", textDecoration: "inherit" })}>
            <Flex key={art.artId} py="sm" gap="md">
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={200} height={200}
                    className={css({
                        width: "100px",
                        height: "fit-content",
                        lg: { width: "200px" },
                    })}
                />
                <div>
                    <Text fw="bold">
                        {art.title}
                    </Text>
                    <Flex gap="4px" wrap="wrap">
                        <Tags tags={limitedTags} />
                    </Flex>
                </div>

            </Flex>
        </Link>
    );
};