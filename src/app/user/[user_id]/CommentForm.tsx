//コメント入力,送信
"use client"

import { Textarea } from "@/components/Textarea"
import { ActionIcon, Flex } from "@mantine/core"
import { FC, useState } from "react"
import styles from "./styles.module.css"
import { postComment } from "./actions"
import { BusinessCardId } from "@/businessCard/type"
import { useMutate } from "@/util/client/useMutate"
import { IoSendOutline } from "react-icons/io5"
import { Loader } from "@/components/Loader"

interface CommentFormProps {
    businessCardId: BusinessCardId
}
export const CommentForm: FC<CommentFormProps> = ({ businessCardId }) => {
    const [comment, setComment] = useState("")
    const isOkComment = comment.trim().length >= 1
    const handleClickPostButton = useMutate(async () => {
        await postComment({ businessCardId: businessCardId, content: comment })
        setComment("")
    }, {
        onSuccess: { toast: "コメントを追加しました！" },
        onError: { toast: "コメントを送信できませんでした..." },
    })
    return (
        <Flex justify="left" align="center" gap="xs">
            <Textarea
                className={styles.textarea}
                size='xs'
                value={comment}
                onChange={e => setComment(e.target.value)}
                disabled={handleClickPostButton.isLoading}
                placeholder="コメントを入力"
            />
            <ActionIcon
                className={styles.actionIcon}
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
    )
}
