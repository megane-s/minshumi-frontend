//タグごとの作品一覧
import { getArtsWithTag, getTagArtsCount } from "@/art/tag/getArts"
import { PageTitle } from "@/components/PageTitle"
import Image from 'next/image'
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"
import { getMetadata } from "@/seo/getMetadata"
import { css } from "styled-system/css"
import ArtList from "./ArtList"
export async function generateMetadata({ params: { tag_id } }: { params: { tag_id: string } }) {
    const tag = decodeURI(tag_id)

    const artsCount = await getTagArtsCount(tag)

    return getMetadata({
        title: `${tag} | みんしゅみ`,
        description: `${artsCount}件の作品が登録されています。`,
        // image: arts.imageUrl, // TODO 出来たら動的画像を生成したい
    })
}

interface PageProps {
    params: { tag_id: string }
}
const TagDetailPage = async ({ params }: PageProps) => {

    const tag = decodeURI(params.tag_id)

    const arts = await getArtsWithTag(tag, { offset: 0, limit: 10 })

    return (
        <div>
            <PageTitle mt="xs" mb="xs" px={20} py={20}>
                {tag}
            </PageTitle>

            <ArtList
                tag={tag}
                defaultArts={arts}
            />

            {arts.length === 0 &&
                <Flex justify="center" align="center" p={50} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={400}
                        />
                        <PageTitle my="md">
                            <div className={css({ display: { base: "block", sm: "inline" } })}>
                                作品が
                            </div>
                            無いようです....
                        </PageTitle>
                        <SectionTitle my="md">
                            作品を追加してみよう
                        </SectionTitle>
                        <LinkButton href="/art/new" leftSection={<AddIcon />} variant="gradient">
                            作品追加
                        </LinkButton>
                    </center>
                </Flex>
            }

        </div>
    )
}
export default TagDetailPage
