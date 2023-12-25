import { Art } from "@/art/type"
import { FC } from "react"
import { Flex, Text } from "@mantine/core"
import { Badge } from "@/components/Badge"
import Image from "next/image"
import Link from 'next/link'
import { getTags } from "@/art/tag/getTags"
import { css } from "styled-system/css"

interface ArtListItemProps {
    art: Art
}
export const ArtListItem: FC<ArtListItemProps> = async ({ art }) => {
    const tags = await getTags(art.artId)
    return (
        <Link href={`/art/${art.artId}`} className={css({ color: "inherit", textDecoration: "inherit" })}>
            <Flex key={art.artId} p="sm" gap="md">
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
                    <Flex gap="xs" wrap={"wrap-reverse"}>
                        {tags.map(tag =>
                            <div key={tag}>
                                <Badge key={tag} variant="filled" color="primary.1">
                                    {tag}
                                </Badge>
                            </div>
                        )}
                    </Flex>
                </div>

            </Flex>
        </Link>
    );
};