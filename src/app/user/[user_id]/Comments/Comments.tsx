import { getUserCommentsByUserId } from "@/user/comment/get"
import { UserId } from "@/user/type"
import { Flex } from "@mantine/core"
import { FC, Suspense } from "react"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { CenterLoader } from "@/components/CenterLoader"
import { css } from "styled-system/css"
import Image from 'next/image'
import { PageTitle } from "@/components/PageTitle"
import { SectionTitle } from "@/components/SectionTitle"

interface CommentsProps {
  userId: UserId
}
export const Comments: FC<CommentsProps> = async ({ userId }) => {
  const comments = await getUserCommentsByUserId(userId)
  return (
    comments && <>

      コメント {comments.length}件

      <CommentForm
        targetUserId={userId}
      />

      <Suspense fallback={<CenterLoader className={css({ my: "md" })} />}>
        <CommentList
          userId={userId}
        />
      </Suspense>

      {comments.length === 0 &&
        <Flex justify="center" align="center" p={50}>
          <center>
            <Image
              src="/cat.png"
              alt='none'
              width={200}
              height={400}
            />
            <PageTitle >
              コメントがまだ無いようです...
            </PageTitle>
            <SectionTitle>
              コメントを投稿してみましょう
            </SectionTitle>
          </center>
        </Flex>
      }
    </>
  )
}
