import LinkButton from "@/components/LinkButton"
import { Box, Divider, Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { LikeArtImage } from "./LikeArtImage";
import { getUser } from "@/user/get";
import { getWatchingArts } from "@/art/watching/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { CommentForm } from "./CommentForm";
import { getCommentsByBusinessCard } from "@/businessCard/comment/getByBusinessCard";
import { getRecommendArtsByUser } from "@/art/recommend/getByUser";
import { ArtImage } from "./ArtImage";
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
    const WatchingArts = await getWatchingArts(userId)
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
            <Flex justify="space-between" >
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
                <Box w="1em" />
                {userFollowersCount}
                フォロワー
            </Flex>

            {/* TODO 作品表示の部分をカルーセルを使う */}
            <SectionTitle mt="md">
                今見ている作品
            </SectionTitle>
            <Flex gap="xs" my="xl" rowGap="100px" columnGap="sm" w="100%" className={css({ overflow: "auto" })}>
                {WatchingArts.map(art =>
                    <ArtImage
                        key={art.artId}
                        art={art}
                    />
                )}
                {/* TODO 0件の時の表示 */}
            </Flex>

            <SectionTitle mt="md">
                好きな作品
            </SectionTitle>
            {/* TODO 作品表示の部分をカルーセルを使う */}
            <Flex gap="xs" my="xl" rowGap="100px" columnGap="sm" w="100%" className={css({ overflow: "auto" })}>
                {recommendArts.map(art =>
                    <LikeArtImage
                        key={art.artId}
                        art={art}
                    />
                )}
                {/* TODO 0件の時の表示 */}
            </Flex>

            {comments && <>
                <Divider />
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