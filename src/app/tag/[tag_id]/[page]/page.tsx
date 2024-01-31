//タグごとの作品一覧
import { getArtsWithTag, getArtsWithTagCount, getTagArtsCount } from "@/art/tag/getArts"
import { ArtListItem } from "../ArtListItem"
import { PageTitle } from "@/components/PageTitle"
import Image from 'next/image'
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"
import { getMetadata } from "@/seo/getMetadata"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { ArrowRightIcon } from "@/components/icon/ArrowRight"
import { ArrowLeftIcon } from "@/components/icon/ArrowLeft"
import { notFound } from "next/navigation"
export async function generateMetadata({ params: { tag_id } }: { params: { tag_id: string } }) {
    const tag = decodeURI(tag_id)

    const artsCount = await getTagArtsCount(tag)

    return getMetadata({
        title: `${tag} | みんしゅみ`,
        description: `${artsCount}件の作品が登録されています。`,
        // image: arts.imageUrl, // TODO 出来たら動的画像を生成したい
    })
}

const ARTS_PER_PAGE = 15

interface PageProps {
    params: {
        tag_id: string
        page: string
    }
}
const TagDetailPage = async ({ params }: PageProps) => {

    const tag = decodeURI(params.tag_id)
    const page = parseInt(params.page)

    if (isNaN(page) || page <= 0) {
        notFound()
    }

    const [arts, allCount] = await Promise.all([
        getArtsWithTag(tag, {
            offset: (page - 1) * ARTS_PER_PAGE,
            limit: ARTS_PER_PAGE,
        }),
        getArtsWithTagCount(tag),
    ])
    const maxPage = Math.ceil(allCount / ARTS_PER_PAGE)
    if (page > maxPage) {
        notFound()
    }

    const hasPrev = 2 <= page
    const hasNext = page < maxPage

    return (
        <div>
            <div className={css({ my: "xs", p: "lg" })}>
                <PageTitle>
                    {tag}
                </PageTitle>
                {page}
                {" / "}
                {maxPage}
            </div>

            {arts.map(art =>
                <ArtListItem key={art.artId} art={art} />
            )}

            {(page === 0 && arts.length === 0) &&
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

            <div className={flex({ w: "full", justify: "space-between", my: "lg" })}>
                <div>
                    {hasPrev &&
                        <LinkButton href={`/tag/${tag}/${page - 1}`} leftSection={<ArrowLeftIcon />}>
                            戻る
                        </LinkButton>
                    }
                </div>
                <div>
                    {hasNext &&
                        <LinkButton href={`/tag/${tag}/${page + 1}`} rightSection={<ArrowRightIcon />}>
                            次へ
                        </LinkButton>
                    }
                </div>
            </div>

        </div>
    )
}
export default TagDetailPage
