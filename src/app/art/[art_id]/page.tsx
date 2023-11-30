import { Badge } from "@/components/Badge"
import { PageTitle } from "@/components/PageTitle"
import { Box, Divider, Flex } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { GoodButton } from "./GoodButton"
import { getArt } from "@/art/get"
import { notFound } from "next/navigation"
import FullWidth from "@/app/BaseLayout/FullWidth"
import { getSession } from "@/auth/server/auth"
import { isArtGooded } from "@/art/good/isGooded"
import { getTags } from "@/art/tag/getTags"


interface ArtDetailPageProps {
    params: { art_id: string }
}

const ArtDetailPage = async ({ params }: ArtDetailPageProps) => {
    const artId = decodeURI(params.art_id)
    const art = await getArt(artId)
    const tags = await getTags(artId)
    const session = await getSession()
    const isLogined = !!session
    const isGooded = session ? await isArtGooded(artId, session.user.id) : false

    if (!art) notFound()
    return (
        <div>

            <FullWidth>
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={300}
                    height={200}
                    style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "cover" }}
                />
            </FullWidth>

            <Box bg="background.2" px="sm" py="md">
                <PageTitle>
                    {art.title}
                </PageTitle>
                {/* <div>
                    <Button variant="light">
                        ブックマーク
                    </Button>
                </div> */}
                <Flex gap="xs" py="md" wrap="wrap" rowGap="0px" columnGap="xs">
                    {tags.map(tag =>
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
                {art.description}
            </Box>


            <GoodButton artId={artId} isGooded={isGooded} isLogined={isLogined} />

            {/* アイデア:ここにこの作品をお勧めしている人上位3人を出す */}

        </div>
    )
}
export default ArtDetailPage