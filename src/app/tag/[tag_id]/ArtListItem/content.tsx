import { FC } from "react"
import { Art, ArtTag } from "@/art/type"
import { Flex, Text } from "@mantine/core"
import Image from "next/image"
import Link from 'next/link'
import { css } from "styled-system/css"
import { Tags } from "@/art/tag/components/Tags"
import { Loader } from "@/components/Loader"

interface ArtListItemContentProps {
    art: Art
    tags: ArtTag[]
    maxTags?: number
    isLoadingTags?: boolean
}
const ArtListItemContent: FC<ArtListItemContentProps> = ({ art, tags, maxTags = Number.MAX_SAFE_INTEGER, isLoadingTags = false }) => {
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
                        {isLoadingTags
                            ? <Loader />
                            : <Tags tags={limitedTags} />
                        }
                    </Flex>
                </div>

            </Flex>
        </Link>
    );
}

export default ArtListItemContent
