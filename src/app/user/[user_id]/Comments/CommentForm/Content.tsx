"use client"

import { useMutate } from "@/util/client/useMutate"
import { FC, useState } from "react"
import { postComment } from "../../actions"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { Textarea } from "@/components/Textarea"
import { ActionIcon } from "@/components/ActionIcon"
import { Loader } from "@/components/Loader"
import { IoSendOutline } from "react-icons/io5"
import { Button } from "@/components/Button"
import { login } from "@/auth/client/login"

interface CommentFormContentProps {
    isLogin: boolean
}
const CommentFormContent: FC<CommentFormContentProps> = ({ isLogin }) => {
    const [comment, setComment] = useState("")
    const isOkComment = comment.trim().length >= 1
    const handleClickPostButton = useMutate(async () => {
        await postComment({ content: comment })
        setComment("")
    }, {
        onSuccess: { toast: "コメントを追加しました！" },
        onError: { toast: "コメントを送信できませんでした..." },
    })

    return isLogin ? (
        <div className={flex({ justify: "left", align: "center", gap: "xs" })}>
            <Textarea
                className={css({ flexGrow: 1 })}
                size='xs'
                value={comment}
                onChange={e => setComment(e.target.value)}
                disabled={handleClickPostButton.isLoading}
                placeholder="コメントを入力"
            />
            <ActionIcon
                onClick={() => void handleClickPostButton.mutate(null)}
                size='md'
                disabled={!isOkComment || handleClickPostButton.isLoading}
            >
                {handleClickPostButton.isLoading
                    ? <Loader size="sm" />
                    : <IoSendOutline />
                }

            </ActionIcon>
        </div>
    ) : (
        <div className={flex({ justify: "center" })}>
            <div>
                ログインするとコメントを送信できるようになります
                <Button variant="outline" onClick={() => void login()}>
                    ログイン
                </Button>
            </div>
        </div>
    )

}

export default CommentFormContent
