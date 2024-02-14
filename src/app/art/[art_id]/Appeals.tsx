import { getArtAppealsByArt } from "@/art/appeal/getByArt"
import { getRelatedArts } from "@/art/getRelated"
import { ArtAppeal, ArtId } from "@/art/type"
import { Avatar } from "@/components/Avatar"
import { Card } from "@/components/Card"
import { CarouselSlide } from "@/components/Carousel"
import { Link } from "@/components/Link"
import { SectionTitle } from "@/components/SectionTitle"
import { getUser } from "@/user/get"
import { Carousel } from "@mantine/carousel"
import { Loader } from "@mantine/core"
import Image from "next/image"
import NextLink from "next/link"
import { FC, Suspense } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"

interface AppealsProps {
    artId: ArtId
}
const Appeals: FC<AppealsProps> = async ({ artId }) => {
    const appeals = await getArtAppealsByArt(artId)
    return (
        <div>
            <SectionTitle>
                アピール
            </SectionTitle>
            {appeals.length === 0
                ? <div>
                    まだアピールされていません
                </div>
                : appeals.map(appeal =>
                    <Suspense fallback={<Loader />} key={appeal.userId}>
                        <AppealItem appeal={appeal} />
                    </Suspense>
                )}
        </div>
    )
}

export default Appeals

interface AppealItemProps {
    appeal: ArtAppeal
}
const AppealItem: FC<AppealItemProps> = async ({ appeal }) => {
    const user = await getUser(appeal.userId)
    if (!user) return null
    return (
        <div className={flex({ w: "full", gap: "md", mb: "xl" })}>
            <NextLink
                href={`/user/${user.id}`}
                className={css({ mt: "md" })}
            >
                <Avatar
                    src={user.image}
                    alt={user.name ?? "ユーザ"}
                />
            </NextLink>

            <div className={flex({ flexDir: "column", gap: "sm", flexGrow: 1, flexShrink: 1 })}>
                <Card className={css({
                    flexShrink: 1,
                    w: "fit-content",
                })}>
                    <div className={css({ mb: "xs" })}>
                        <Link href={`/user/${user.id}`} className={css({ fontWeight: "bold !important" })}>
                            {user.name}
                        </Link>
                    </div>
                    <div>
                        {appeal.likePoint}
                    </div>
                </Card>
                <RelatedArtList
                    appeal={appeal}
                />
            </div>
        </div>
    )
}

interface RelatedArtListProps {
    appeal: ArtAppeal
}
const RelatedArtList: FC<RelatedArtListProps> = async ({ appeal }) => {
    const relatedArts = await getRelatedArts(appeal.artId, appeal.userId)
    if (relatedArts.length === 0) {
        return null
    }
    return (
        <div>
            関連作品
            <Carousel slideSize="fit-content" slideGap="sm" align="start" controlsOffset="-10px">
                {relatedArts.map(art =>
                    <CarouselSlide key={art.artId}>
                        <Link href={`/art/${art.artId}`}>
                            <Image
                                key={art.artId}
                                src={art.imageUrl}
                                alt={art.title}
                                width={1200 / 6}
                                height={675 / 6}
                                className={css({
                                    width: "auto",
                                    minW: "fit-content",
                                    height: "80px",
                                })}
                            />
                        </Link>
                    </CarouselSlide>
                )}
            </Carousel>
        </div>
    )
}

