import LinkButton from "@/components/LinkButton"
import { Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { getUser } from "@/user/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { getSession } from "@/auth/server/auth";
import { SectionTitle } from "@/components/SectionTitle";
import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";
import { FollowButton } from "./FollowButton";
import { css } from "styled-system/css";
import { WatchingArtList } from "./WatchingArtList";
import { LikeArtList } from "./LikeArtList";
import { Comments } from "./Comments/Comments";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { CenterLoader } from "@/components/CenterLoader";

interface PageProps {
    params: { user_id: string }
}
const UserProfilePage = async ({ params }: PageProps) => {
    const session = await getSession()
    const loginUser = session?.user
    const isLogin = !!loginUser
    const userId = params.user_id
    const user = await getUser(userId)
    if (!user) notFound()

    const [
        businessCards,
    ] = await Promise.all([
        getBusinessCardByUser(userId),
    ])
    const businessCard = businessCards.find(b => b.businessCardId === user.pinnedBusinessCardId)

    return (
        <div className={css({ mb: "xl" })}>
            <Image
                src={businessCard
                    ? `/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`
                    : "/default_user_image.png"
                }
                alt="名刺"
                width={800}
                height={675 * 800 / 1200}
                style={{ width: "100%", height: "auto" }}
                priority
            />
            <Flex
                justify="space-between"
                className={css({ mt: "lg", mb: "sm", flexDir: { base: "column", md: "row" }, gap: "sm" })}
            >
                <PageTitle>
                    {user.name}
                </PageTitle>
                {loginUser && (user.id === loginUser?.id
                    ? <LinkButton href="/settings/user">
                        編集する
                    </LinkButton>
                    : <Suspense fallback={<Loader />}>
                        <FollowButton
                            userId={userId}
                            loginUser={loginUser}
                        />
                    </Suspense>
                )}
            </Flex>

            <Flex w="100%" justify="space-between" className={css({ mt: "lg", mb: "sm" })}>
                <SectionTitle >
                    アピール
                </SectionTitle>
                {loginUser && (user.id === loginUser?.id
                    ? <LinkButton href="/settings/appeals">
                        アピールの管理
                    </LinkButton>
                    : null
                )}
            </Flex>
            <Suspense fallback={<Loader />}>
                <LikeArtList userId={userId} />
            </Suspense>

            <Flex w="100%" justify="space-between" className={css({ mt: "lg", mb: "sm" })}>
                <SectionTitle >
                    今見ている作品
                </SectionTitle>
                {loginUser && (user.id === loginUser?.id
                    ? <LinkButton href="/settings/watching-arts">
                        編集
                    </LinkButton>
                    : null
                )}
            </Flex>
            <Suspense fallback={<Loader />}>
                <WatchingArtList userId={userId} />
            </Suspense>

            <Suspense fallback={<CenterLoader />}>
                <Comments
                    businessCard={businessCard}
                    isLogin={isLogin}
                    userId={userId}
                    loginUser={loginUser}
                />
            </Suspense>

        </div >
    )
}
export default UserProfilePage 