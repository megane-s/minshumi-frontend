"use server"

import { deleteArtAppeal } from "@/art/appeal/delete"
import { ArtId } from "@/art/type"
import { removeWatchingArt } from "@/art/watching/remove"
import { getSession } from "@/auth/server/auth"
import { CreateUserCommentParams, createUserComment } from "@/user/comment/create"
import { UserComment, UserCommentId } from "@/user/comment/type"
import { UpdateUserComment, updateUserComment } from "@/user/comment/update"
import { cancelFollow } from "@/user/follow/cancel"
import { follow } from "@/user/follow/follow"
import { getFollowings } from "@/user/follow/getFollowings"
import { getUserComment } from "@/user/comment/get"
import { UserId } from "@/user/type"
import { notImplementError } from "@/util/notImplement"
import { revalidatePath } from "next/cache"
import { deleteUserComment } from "@/user/comment/delete"
import { goodToUserCommentGood } from "@/user/comment/good/good"
import { cancelGoodUserCommentGood } from "@/user/comment/good/cancel"

const revalidateSessionUserProfilePage = async () => {
    const session = await getSession()
    if (session) revalidatePath(`/user/${session.user.id}`)
}

export const postComment = async (params: Omit<CreateUserCommentParams, "commentUserId">) => {
    const session = await getSession()
    const loginUserId = session?.user.id
    if (!loginUserId) throw notImplementError("ログインしていないユーザはコメントできません")
    const newUserComment = await createUserComment({ ...params, commentUserId: loginUserId })
    await revalidateSessionUserProfilePage()
    return newUserComment
}

export const updateComment = async (commentId: UserCommentId, params: UpdateUserComment) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによる名刺の更新です")

    const loginUserId = session.user.id
    const comment = await getUserComment(commentId)
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    const newComment = await updateUserComment(commentId, params)

    await revalidateSessionUserProfilePage()
    return newComment
}

export const deleteComment = async (comment: UserComment) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるコメントの削除です")

    const loginUserId = session.user.id
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    await deleteUserComment(comment.commentId)

    await revalidateSessionUserProfilePage()
}

export const handleGood = async (commentId: UserCommentId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")
    const loginUserId = session.user.id
    await goodToUserCommentGood(commentId, loginUserId)
}

export const handleCancelGood = async (commentId: UserCommentId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねのキャンセルです")
    const loginUserId = session.user.id
    await cancelGoodUserCommentGood(commentId, loginUserId)
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

export const handleDeleteAppeal = async (artId: ArtId) => {
    const session = await getSession()
    if (!session) throw notImplementError(`ログインする必要があります。`)
    await deleteArtAppeal(session.user.id, artId)
    revalidatePath(`/user/${session.user.id}`)
}

export const handleDeleteWatchingArt = async (artId: ArtId) => {
    const session = await getSession()
    if (!session) throw notImplementError(`ログインする必要があります。`)
    await removeWatchingArt(session.user.id, artId)
    revalidatePath(`/user/${session.user.id}`)
}
