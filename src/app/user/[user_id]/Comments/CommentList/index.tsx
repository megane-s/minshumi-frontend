import { UserId } from "@/user/type"
import { FC } from "react"
import { CommentListContent } from "./Content"
import { getSession } from "@/auth/server/auth"

interface CommentListProps {
    userId: UserId
}
export const CommentList: FC<CommentListProps> = async ({ userId }) => {
    const session = await getSession()
    console.log("CommentList session", session)
    return (
        <CommentListContent
            userId={userId}
            loginUser={session?.user}
        />
    )
}
