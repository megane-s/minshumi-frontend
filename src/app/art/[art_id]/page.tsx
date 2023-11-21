import { Art, ArtTag } from "@/art/type"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { PageTitle } from "@/components/PageTitle"
import { Box, Divider, Flex } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { GoodButton } from "./GoodButton"

interface PageProps {
    params: { art_id: string }
}
const ArtDetailPage = async ({ params }: PageProps) => {
    const artId = params.art_id
    console.log("artId", artId)
    // const art = await getArt("10")
    const art: Art = {
        artId: "test-100",
        title: "鬼滅の刃",
        imageUrl: "/placeholder/1200x675_red.png",
    }
    const artDescription = "鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要鬼滅の刃の作品概要"
    const artTags: ArtTag[] = [
        "アクション",
        "ジャンプ",
        "SF",
    ]
    return (
        <div>

            <Image
                src={art.imageUrl}
                alt={art.title}
                width={300}
                height={200}
                style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "cover" }}
            />

            <Box bg="background.2" px="sm">
                <PageTitle>
                    {art.title}
                </PageTitle>
                <div>
                    <Button variant="light">
                        ブックマーク
                    </Button>
                </div>
                <Flex gap="xs" py="md" wrap="wrap" rowGap="0px" columnGap="xs">
                    {artTags.map(tag =>
                        <Link href={`/tag/${tag}`} key={tag}>
                            <Badge>
                                {tag}
                            </Badge>
                        </Link>
                    )}
                </Flex>
            </Box>

            <Divider />

            <Box p="md">
                {artDescription}
            </Box>

            <GoodButton />

            {/* アイデア:ここにこの作品をお勧めしている人上位3人を出す */}

        </div>
    )
}
export default ArtDetailPage