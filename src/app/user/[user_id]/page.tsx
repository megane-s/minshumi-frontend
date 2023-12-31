import LinkButton from "@/components/LinkButton"
import { Divider, Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { getUser } from "@/user/get";
import { getWatchingArts } from "@/art/watching/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { CommentForm } from "./CommentForm";
import { getCommentsByBusinessCard } from "@/businessCard/comment/getByBusinessCard";
import { getRecommendArtsByUser } from "@/art/recommend/getByUser";
import { CommentListItem } from "./CommentListItem";
import { getFollowers } from "@/user/follow/getFollowers";
import { getFollowings } from "@/user/follow/getFollowings";
import { getSession } from "@/auth/server/auth";
import { User } from "@/user/type";
import { isBusinessCardCommentGooded } from "@/businessCard/comment/good/isGooded";
import { SectionTitle } from "@/components/SectionTitle";
import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";
import { BusinessCard } from "@/businessCard/type";
import { FollowButton } from "./FollowButton";
import { css } from "styled-system/css";
import { WatchingArtList } from "./WatchingArtList";
import { LikeArtList } from "./LikeArtList";

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

    const recommendArts = await getRecommendArtsByUser(userId)
    const watchingArts = await getWatchingArts(userId)
    const businessCards = await getBusinessCardByUser(userId)
    const businessCard = businessCards[0] as BusinessCard | null
    const comments = businessCard && await getCommentsByBusinessCard(businessCard.businessCardId)
    const commentUsers = comments && await Promise.all(
        comments.map(comment => getUser(comment.commentUserId))
    ) as User[]
    const commentIsGoodeds = comments && await Promise.all(
        comments.map(comment =>
            loginUser
                ? isBusinessCardCommentGooded(comment.commentId, loginUser.id)
                : false
        )
    )
    // TODO 数だけ取得するmodelを用意すべき
    const userFollowings = await getFollowings(userId)
    const userFollowingsCount = userFollowings.length
    const userFollowers = await getFollowers(userId)
    const userFollowersCount = userFollowers.length

    // TODO フォローしているかどうかを判定する関数を用意する
    const isLoginUserFollow = userFollowers
        .some(userFollower => userFollower.id === loginUser?.id)

    return (
        <div>
            {/* TODO 名刺を表示する */}
            <Image
                src="/placeholder/1200x675_red.png"
                alt="名刺手s津尾"
                width={800}
                height={675 * 800 / 1200}
                style={{ width: "100%", height: "auto" }}
            />
            <Flex justify="space-between" className={css({ mt: "lg", mb: "sm" })}>
                <PageTitle>
                    {user.name}
                </PageTitle>
                {loginUser && (user.id === loginUser?.id
                    ? <LinkButton href="/settings">
                        編集する
                    </LinkButton>
                    : <FollowButton
                        userId={userId}
                        defaultIsLoginUserFollow={isLoginUserFollow}
                    />
                )}
            </Flex>

            <Flex w="100%" justify="flex-start">
                {userFollowingsCount}
                フォロー
                <div className={css({ w: "1em" })} />
                {userFollowersCount}
                フォロワー
            </Flex>

            {/* TODO 作品表示の部分をカルーセルを使う */}
            <SectionTitle my="md">
                今見ている作品
            </SectionTitle>
            <WatchingArtList arts={watchingArts} />
            {/* TODO 0件の時の表示 */}

            <SectionTitle my="md">
                好きな作品
            </SectionTitle>
            <LikeArtList
                arts={recommendArts}
            />
            {/* TODO 0件の時の表示 */}

            {comments && <>
                <Divider className={css({ my: "md" })} />
                コメント {comments.length}件

                {businessCard &&
                    <CommentForm
                        businessCardId={businessCard.businessCardId}
                        isLogin={isLogin}
                    />
                }

                {commentUsers && commentIsGoodeds &&
                    comments.map((comment, index) =>
                        <CommentListItem
                            key={comment.commentId}
                            comment={comment}
                            commentUser={commentUsers[index]}
                            defaultIsGooded={commentIsGoodeds[index]}
                            isLogin={isLogin}
                            loginUser={loginUser ?? null}
                        />
                    )
                }

                {comments.length === 0 &&
                    <Flex justify="center" align="center" p={50}>
                        {/* TODO コメントない時に表示される内容を改善 */}
                        コメントないぜ
                    </Flex>
                }
            </>}

        </div >
    )
}
export default UserProfilePage 