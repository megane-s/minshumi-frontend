import { Art } from "@/art/type"
import { FC } from "react"
import styles from "./page.module.css"
import { Box, Flex, Text } from "@mantine/core"
import { Badge } from "@/components/Badge"
import Image from "next/image"
import Link from 'next/link'

interface ArtListItemProps {
    art: Art
}
export const ArtListItem: FC<ArtListItemProps> = async ({ art }) => {
    // const tags = await getTagsByArtId(art.artId)
    const tags = ["tag1", "tag2", "tag3", "tttttttttttttttttag4"]
    return (
        <Link href={`/art/${art.artId}`} className={styles.link}>
            <Flex key={art.artId} p="sm" gap="md">
                <Box
                    component={Image}
                    className={styles.listItemImage}
                    src={art.imageUrl}
                    alt={art.title}
                    width={200} height={200}
                />
                <div>
                    <Text fw="bold">
                        {art.title}
                    </Text>
                    <Flex gap="xs">
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