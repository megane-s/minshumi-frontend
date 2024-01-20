import { FC } from "react"
import CommentFormContent from "./Content"
import { getSession } from "@/auth/server/auth"

interface CommentFormProps {

}
export const CommentForm: FC<CommentFormProps> = async () => {
    const isLogin = await getSession().then(s => !!s)
    return (
        <CommentFormContent isLogin={isLogin} />
    )
}

