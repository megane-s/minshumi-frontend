import { getUserCommentsByUserId } from "@/user/comment/get"
import { isUserCommentGooded } from "@/user/comment/good/isGooded"
import { getUser } from "@/user/get"
import { UserId } from "@/user/type"
import { FC } from "react"
import { CommentListItem } from "./CommentListItem"
import { User } from "next-auth"

interface CommentListContentProps {
    userId: UserId
    loginUser: User | undefined
}
export const CommentListContent: FC<CommentListContentProps> = async ({ userId, loginUser }) => {
    const isLogin = !!loginUser
    const comments = await getUserCommentsByUserId(userId)
    const [commentUsers, commentIsGoodeds] = await Promise.all([
        Promise.all(
            comments.map(comment =>
                getUser(comment.commentUserId)
            ),
        ),
        Promise.all(
            comments.map(comment =>
                loginUser
                    ? isUserCommentGooded(comment.commentId, loginUser.id)
                    : false,
            )
        ),
    ])
    return (
        commentUsers && commentIsGoodeds &&
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
    )
}
