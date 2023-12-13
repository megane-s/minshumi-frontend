//
"use server"

import { CreateBusinessCardCommentParams, createBusinessCardComment } from "@/businessCard/comment/create"
import { deleteBusinessCardComment } from "@/businessCard/comment/delete"
import { cancelGoodBusinessCardCommentGood } from "@/businessCard/comment/good/cancel"
import { BusinessCardComment, BusinessCardCommentId } from "@/businessCard/comment/type"
import { UpdateBusinessCardComment, updateBusinessCardComment } from "@/businessCard/comment/update"
import { UserId } from "@/user/type"
import { goodToBusinessCardCommentGood } from "@/businessCard/comment/good/good"
import { serverAction } from "@/util/serverAction"
import { revalidatePath } from "next/cache"
import { getBusinessCardById } from "@/businessCard/getById"
import { notImplementError } from "@/util/notImplement"
import { BusinessCardId } from "@/businessCard/type"
import { getSession } from "@/auth/server/auth"
import { getBusinessCardComment } from "@/businessCard/comment/get"

const revalidateByBusinessCardId = async (businessCardId: BusinessCardId) => {
    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) throw notImplementError(`invalid businesscard (id=${businessCardId})`)
    revalidatePath(`/user/${businessCard.userId}`)
}

//コメント作成
export const postComment = async (params: Omit<CreateBusinessCardCommentParams, "commentUserId">) => {
    const session = await getSession()
    const loginUserId = session?.user.id
    if (!loginUserId) throw notImplementError("ログインしていないユーザはコメントできません")
    const newBusinessCardComment = await createBusinessCardComment({ ...params, commentUserId: loginUserId })
    await revalidateByBusinessCardId(newBusinessCardComment.businessCardId)
}

//コメントいいね
export const goodComment = serverAction(async (commentId: BusinessCardCommentId, by: UserId) => {
    await goodToBusinessCardCommentGood(commentId, by)
})

//コメントいいねキャンセル
export const cancelGoodComment = serverAction(async (commentId: BusinessCardCommentId, by: UserId) => {
    await cancelGoodBusinessCardCommentGood(commentId, by)
})

//コメント編集
export const updateComment = async (commentId: BusinessCardCommentId, params: UpdateBusinessCardComment) => {
    // ログインしていない場合はエラー
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")

    // 作成した本人以外は編集できない
    const loginUserId = session.user.id
    const comment = await getBusinessCardComment(commentId)
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    const newComment = await updateBusinessCardComment(commentId, params)

    await revalidateByBusinessCardId(newComment.businessCardId)
}

//コメント削除
export const deleteComment = async (comment: BusinessCardComment) => {
    // ログインしていない場合はエラー
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによるいいねです")

    // 作成した本人以外は削除できない
    const loginUserId = session.user.id
    if (loginUserId !== comment?.commentUserId) throw notImplementError("作成者以外はコメントを編集・削除できません")

    await deleteBusinessCardComment(comment.commentId)

    await revalidateByBusinessCardId(comment.businessCardId)
}

// export const BusinessGood = serverAction(async (commentId: CommnentId) => {
//     const session = await getSession()
//     if (!session) {
//         throw new Error("ログインしていません")
//     }
//     const userId = session.user.id

//     await goodToBusinessCardCommentGood(commentId, userId)


// })

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

