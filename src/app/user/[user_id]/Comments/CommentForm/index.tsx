import { FC } from "react"
import CommentFormContent from "./Content"
import { getSession } from "@/auth/server/auth"
import { UserId } from "@/user/type"

interface CommentFormProps {
    targetUserId: UserId
}
export const CommentForm: FC<CommentFormProps> = async ({ targetUserId }) => {
    const isLogin = await getSession().then(s => !!s)
    return (
        <CommentFormContent isLogin={isLogin} targetUserId={targetUserId} />
    )
}

