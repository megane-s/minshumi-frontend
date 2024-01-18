import { UserId } from "@/user/type"
import { FC } from "react"
import { CommentListContent } from "./Content"
import { getSession } from "next-auth/react"

interface CommentListProps {
    userId: UserId
}
export const CommentList: FC<CommentListProps> = async ({ userId }) => {
    const session = await getSession()
    return (
        <CommentListContent
            userId={userId}
            loginUser={session?.user}
        />
    )
}
