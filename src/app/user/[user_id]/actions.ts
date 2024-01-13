"use server"

import { getSession } from "@/auth/server/auth"
import { CreateBusinessCardCommentParams, createBusinessCardComment } from "@/businessCard/comment/create"
import { deleteBusinessCardComment } from "@/businessCard/comment/delete"
import { getBusinessCardComment } from "@/businessCard/comment/get"
import { cancelGoodBusinessCardCommentGood } from "@/businessCard/comment/good/cancel"
import { goodToBusinessCardCommentGood } from "@/businessCard/comment/good/good"
import { BusinessCardComment, BusinessCardCommentId } from "@/businessCard/comment/type"
import { UpdateBusinessCardComment, updateBusinessCardComment } from "@/businessCard/comment/update"
import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardId } from "@/businessCard/type"
import { cancelFollow } from "@/user/follow/cancel"
import { follow } from "@/user/follow/follow"
import { getFollowings } from "@/user/follow/getFollowings"
import { UserId } from "@/user/type"
import { notImplementError } from "@/util/notImplement"
import { serverAction } from "@/util/serverAction"
import { revalidatePath } from "next/cache"

const revalidateByBusinessCardId = async (businessCardId: BusinessCardId) => {
    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) throw notImplementError(`invalid businesscard (id=${businessCardId})`)
    revalidatePath(`/user/${businessCard.userId}`)
}

export const postComment = async (params: Omit<CreateBusinessCardCommentParams, "commentUserId">) => {
    const session = await getSession()
    const loginUserId = session?.user.id
    if (!loginUserId) throw notImplementError("ログインしていないユーザはコメントできません")
    const newBusinessCardComment = await createBusinessCardComment({ ...params, commentUserId: loginUserId })
    await revalidateByBusinessCardId(newBusinessCardComment.businessCardId)
}

export const goodComment = serverAction(async (commentId: BusinessCardCommentId, by: UserId) => {
    await goodToBusinessCardCommentGood(commentId, by)
})

export const cancelGoodComment = serverAction(async (commentId: BusinessCardCommentId, by: UserId) => {
    await cancelGoodBusinessCardCommentGood(commentId, by)
})

export const updateComment = async (commentId: BusinessCardCommentId, params: UpdateBusinessCardComment) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")

    const loginUserId = session.user.id
    const comment = await getBusinessCardComment(commentId)
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    const newComment = await updateBusinessCardComment(commentId, params)

    await revalidateByBusinessCardId(newComment.businessCardId)
}

export const deleteComment = async (comment: BusinessCardComment) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")

    const loginUserId = session.user.id
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    await deleteBusinessCardComment(comment.commentId)

    await revalidateByBusinessCardId(comment.businessCardId)
}

export const handleGood = async (commentId: BusinessCardCommentId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")
    const loginUserId = session.user.id
    await goodToBusinessCardCommentGood(commentId, loginUserId)
}

export const handleCancelGood = async (commentId: BusinessCardCommentId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")
    const loginUserId = session.user.id
    await cancelGoodBusinessCardCommentGood(commentId, loginUserId)
}

export const handleFollow = async (followUserId: UserId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるフォローはできません")
    const loginUserId = session.user.id

    const followings = await getFollowings(loginUserId)
    const isFollowing = (followings
        .map(user => user.id)
        .includes(followUserId))
    if (isFollowing) return
    await follow(loginUserId, followUserId)
    revalidatePath(`/user/${followUserId}`)
}

export const handleCancelFollow = async (followUserId: UserId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるフォロー解除はできません")
    const loginUserId = session.user.id

    const followings = await getFollowings(loginUserId)
    const isFollowing = (followings
        .map(user => user.id)
        .includes(followUserId))
    if (!isFollowing) return
    await cancelFollow(followUserId, loginUserId)
    revalidatePath(`/user/${followUserId}`)
}
