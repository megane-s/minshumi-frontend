"use client"

import { Textarea } from "@/components/Textarea"
import { ActionIcon, Flex } from "@mantine/core"
import { FC, useState } from "react"
import { postComment } from "./actions"
import { BusinessCardId } from "@/businessCard/type"
import { useMutate } from "@/util/client/useMutate"
import { IoSendOutline } from "react-icons/io5"
import { Loader } from "@/components/Loader"
import { Button } from "@/components/Button"
import { login } from "@/auth/client/login"
import { css } from "styled-system/css"

interface CommentFormProps {
    businessCardId: BusinessCardId
    isLogin: boolean
}
export const CommentForm: FC<CommentFormProps> = ({ businessCardId, isLogin, }) => {
    const [comment, setComment] = useState("")
    const isOkComment = comment.trim().length >= 1
    const handleClickPostButton = useMutate(async () => {
        await postComment({ businessCardId: businessCardId, content: comment })
        setComment("")
    }, {
        onSuccess: { toast: "コメントを追加しました！" },
        onError: { toast: "コメントを送信できませんでした..." },
    })

    return isLogin ? (
        <Flex justify="left" align="center" gap="xs">
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
        </ Flex>
    ) : (
        <Flex justify="center">
            <div>
                ログインするとコメントを送信できるようになります
                <Button variant="outline" onClick={() => void login()}>
                    ログイン
                </Button>
            </div>
        </Flex>
    )
}





