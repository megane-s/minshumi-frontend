import { Art } from "@/art/type"
import { FC } from "react"
import { Box, Flex, Text } from "@mantine/core"
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
                <Box
                    component={Image}
                    className={css({
                        width: "100px",
                        height: "fit-content",
                        lg: { width: "200px" },
                    })}
                    src={art.imageUrl}
                    alt={art.title}
                    width={200} height={200}
                />
                <div>
                    <Text fw="bold">
                        {art.title}
                    </Text>
                    <Flex gap="xs" wrap={"wrap-reverse"}>
                        {tags.map(tag =>
                            <Box key={tag}>
                                <Badge key={tag} variant="filled" color="primary.1">
                                    {tag}
                                </Badge>
                            </Box>
                        )}
                    </Flex>
                </div>

            </Flex>
        </Link>
    );
};