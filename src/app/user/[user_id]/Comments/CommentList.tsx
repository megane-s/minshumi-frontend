import { getUserCommentsByUserId } from "@/user/comment/get"
import { isUserCommentGooded } from "@/user/comment/good/isGooded"
import { getUser } from "@/user/get"
import { UserId } from "@/user/type"
import { FC } from "react"
import { CommentListItem } from "./CommentListItem"
import { User } from "next-auth"

interface CommentListProps {
  userId: UserId
  loginUser: User | undefined
  isLogin: boolean
}
export const CommentList: FC<CommentListProps> = async ({ userId, loginUser, isLogin }) => {
  const comments = await getUserCommentsByUserId(userId)
  // const commentUsers = comments && await Promise.all(
  //   comments.map(comment => getUser(comment.commentUserId))
  // ) as User[]
  // const commentIsGoodeds = comments && await Promise.all(
  //   comments.map(comment =>
  //     loginUser
  //       ? isUserCommentGooded(comment.commentId, loginUser.id)
  //       : false
  //   )
  // )
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
