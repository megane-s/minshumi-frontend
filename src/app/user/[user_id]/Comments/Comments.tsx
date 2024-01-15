import { BusinessCard } from "@/businessCard/type"
import { getUserCommentsByUserId } from "@/user/comment/get"
import { UserId } from "@/user/type"
import { Divider, Flex } from "@mantine/core"
import { FC, Suspense } from "react"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { User } from "next-auth"
import { CenterLoader } from "@/components/CenterLoader"
import { css } from "styled-system/css"

interface CommentsProps {
  userId: UserId
  businessCard: BusinessCard | undefined
  isLogin: boolean
  loginUser: User | undefined
}
export const Comments: FC<CommentsProps> = async ({ userId, businessCard, isLogin, loginUser }) => {
  const comments = businessCard && await getUserCommentsByUserId(userId)
  return (
    comments && <>
      <Divider />

      {businessCard &&
        <CommentForm
          isLogin={isLogin}
        />
      }

      コメント {comments.length}件

      <Suspense fallback={<CenterLoader className={css({ my: "md" })} />}>
        <CommentList
          userId={userId}
          isLogin={isLogin}
          loginUser={loginUser}
        />
      </Suspense>

      {comments.length === 0 &&
        <Flex justify="center" align="center" p={50}>
          {/* TODO コメントない時に表示される内容を改善 */}
          コメントないぜ
        </Flex>
      }
    </>
  )
}
