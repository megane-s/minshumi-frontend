import { PageTitle } from "@/components/PageTitle"
import { Container, Divider } from "@mantine/core"
import Image from "next/image"
import { GoodButton } from "./GoodButton"
import { getArt } from "@/art/get"
import { notFound } from "next/navigation"
import FullWidth from "@/app/BaseLayout/FullWidth"
import { getSession } from "@/auth/server/auth"
import { isArtGooded } from "@/art/good/isGooded"
import { getTags } from "@/art/tag/getTags"
import { css } from "styled-system/css"
import { Tags } from "@/art/tag/components/Tags"
import { getLastCreatedArtId } from "./cookie"
import AppealReminderDialog from "./AppealReminderDialog"
import LinkButton from "@/components/LinkButton"
import { flex } from "styled-system/patterns"
import { getArtAppeal } from "@/art/appeal/get"

// アピール済みアイコン
const AppealedIcon = () => (
    <span role="img" aria-label="Appealed" style={{ marginLeft: "0.5rem" }}>
        ✅
    </span>
);

interface ArtDetailPageProps {
    params: { art_id: string }
}

const ArtDetailPage = async ({ params }: ArtDetailPageProps) => {
    const artId = decodeURI(params.art_id)
    const [art, tags, session] = await Promise.all([
        getArt(artId),
        getTags(artId),
        getSession(),
    ])
    const isLogined = !!session
    const [isGooded, appeal] = await Promise.all([
        session ? isArtGooded(artId, session.user.id) : false,
        session && getArtAppeal(artId, session.user.id),
    ])

    if (!art) notFound()
    const lastCreatedArtId = getLastCreatedArtId()

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

            <FullWidth className={css({ bg: "background.2" })}>
                <Container className={css({ py: "md" })}>
                    {appeal && (
                        <div
                            style={{
                                textDecoration: "none",
                                color: "#8FCC5A",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "xl",
                                marginBottom: "8px"
                            }}>
                            <AppealedIcon />アピールしています
                        </div>
                    )}
                    <PageTitle>
                        {art.title}
                    </PageTitle>
                    {/* <div>
                        <Button variant="light">
                            ブックマーク
                        </Button>
                    </div> */}
                    <div className={css({ my: "md" })}>
                        <Tags tags={tags} />
                    </div>

                    <div className={flex({ flexDir: "row", flexWrap: "wrap", gap: "sm" })}>
                        {isLogined
                            ? <LinkButton href={`/art/${artId}/edit`}>
                                作品を編集
                            </LinkButton>
                            : null
                        }
                        {isLogined &&
                            <LinkButton href={`/art/${artId}/appeal`} variant="gradient">
                                {appeal ? (
                                    <>
                                        アピールを編集
                                    </>
                                ) : (
                                    "アピールする"
                                )}
                            </LinkButton>
                        }
                    </div>
                </Container>
                <Divider />
            </FullWidth>

            <div className={css({ py: "md" })}>
                {art.description}
            </div>

            <GoodButton artId={artId} isGooded={isGooded} isLogined={isLogined} />

            {/* アイデア:ここにこの作品をお勧めしている人上位3人を出す */}

            {lastCreatedArtId &&
                <AppealReminderDialog
                    art={art}
                />
            }
        </div>
    )
}
export default ArtDetailPage