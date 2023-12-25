"use client"

import { FC, useState } from "react"
import { BusinessCardComment } from "@/businessCard/comment/type"
import { ActionIcon, Avatar, Box, Divider, Flex, Menu } from "@mantine/core"
import { LikeButton } from "./LikeButton"
import { Textarea } from "@/components/Textarea"
import { IoMdMore } from "react-icons/io";
import { PiPencilSimple } from "react-icons/pi"
import { BsTrash } from "react-icons/bs"
import { Button } from "@/components/Button"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { updateComment as updateCommentAction, deleteComment as deleteCommentAction, handleGood, handleCancelGood } from "./actions"
import { Dialog, useDialog } from "@/components/Dialog"
import { login } from "@/auth/client/login"
import { User } from "next-auth"
import { DeleteConfirmCommentDialog } from "./DeleteConfirmCommentDialog"
import { css } from "styled-system/css"

interface CommentListItemProps {
    comment: BusinessCardComment
    commentUser: User
    defaultIsGooded: boolean
    isLogin: boolean
    loginUser: User | null
}
export const CommentListItem: FC<CommentListItemProps> = ({ comment, commentUser, defaultIsGooded, isLogin, loginUser }) => {
    const [mode, setMode] = useState<"view" | "edit">("view")
    const handleToggleMode = () => {
        if (!isLogin) return pleaseLoginDialog.onOpen()
        setMode(mode => mode === "view" ? "edit" : "view")
    }
    const [editingComment, setEditingComment] = useState(comment.content)
    const updateComment = useMutate(async () => {
        await updateCommentAction(comment.commentId, {
            content: editingComment,
        })
        setMode("view")
    }, {
        onSuccess: { toast: "コメントを編集しました" },
        onError: { toast: "コメントを編集できませんでした" },
    })
    const handleDeleteConfirm = () => {
        if (!isLogin) return pleaseLoginDialog.onOpen()
        deleteConfirmDialog.onOpen()
    }

    const deleteConfirmDialog = useDialog()
    const deleteComment = useMutate(async () => {
        await deleteCommentAction(comment)
    }, {
        onSuccess: { toast: "コメントを削除しました" },
        onError: { toast: "コメントを削除できませんでした" },
    })
    const isDeleted = deleteComment.isSuccess

    const pleaseLoginDialog = useDialog()

    const [isGooded, setIsGooded] = useState(defaultIsGooded)
    const handleGoodClick = useMutate(async () => {
        try {
            if (!isLogin) return pleaseLoginDialog.onOpen()
            setIsGooded(!isGooded)
            if (!isGooded) {
                await handleGood(comment.commentId)
            } else {
                await handleCancelGood(comment.commentId)
            }

        } catch (error) {
            setIsGooded(isGooded)
        }
    }, {
        onSuccess: { toast: "いいねを押しました" },
        onError: { toast: "いいねを押せませんでした" },
    })

    if (isDeleted) return
    return (
        <div>
            <Box py="md">
                <Flex justify="space-between" gap="xs" align="center">
                    <Flex gap="xs" className={`${css({ flexGrow: 1, flexShrink: 1 })}`}>
                        <Avatar
                            src={commentUser.image}
                            alt={commentUser.name ?? "コメントしたユーザ"}
                            className={css({ borderRadius: "9999px" })}
                        />
                        {commentUser.name}
                    </Flex>
                    <div>
                        {"2023/12/04"}
                    </div>
                </Flex>

                {mode === "view"
                    ? editingComment
                    : <>
                        <Textarea
                            size='xs'
                            value={editingComment}
                            onChange={e => setEditingComment(e.target.value)}
                            disabled={updateComment.isLoading}
                        />
                        <Flex justify="flex-end" my="xs" gap="xs">
                            <Button
                                onClick={() => {
                                    setMode("view")
                                    setEditingComment(comment.content)
                                }}
                            >
                                キャンセル
                            </Button>
                            <MutateButton mutation={updateComment} variant="filled">
                                更新
                            </MutateButton>
                        </Flex>
                    </>
                }

                <Flex justify="space-between">
                    <LikeButton
                        isGooded={isGooded}
                        onClick={() => void handleGoodClick.mutate(null)}
                    />
                    {loginUser?.id === comment.commentUserId &&
                        <CommentMenu
                            mode={mode}
                            onToggleMode={handleToggleMode}
                            onDeleteComment={handleDeleteConfirm}
                        />
                    }
                </Flex>

                <Dialog {...pleaseLoginDialog.dialogProps}>
                    ログインが必要です。
                    <Button
                        variant="outline"
                        size="lg"
                        w="100%"
                        onClick={() => void login()}
                    >
                        ログイン
                    </Button>
                </Dialog>

                <DeleteConfirmCommentDialog
                    comment={comment}
                    {...deleteConfirmDialog.dialogProps}
                />

            </Box>
            <Divider />
        </div>

    )
}

interface CommentMenuProps {
    mode: "view" | "edit"
    onToggleMode: () => void
    onDeleteComment: () => void
}
export const CommentMenu: FC<CommentMenuProps> = ({ onToggleMode, mode, onDeleteComment }) => {
    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon variant="light" radius="xl">
                    <IoMdMore />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                {mode === "view" &&
                    <Menu.Item leftSection={<PiPencilSimple />} onClick={onToggleMode}>
                        編集
                    </Menu.Item>
                }
                <Menu.Item leftSection={<BsTrash />} onClick={onDeleteComment}>
                    削除
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
