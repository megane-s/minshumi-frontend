import MutateButton from "@/components/MutateButton"
import { Flex, Button } from "@mantine/core"
import { FC } from "react"
import { Dialog, DialogProps } from "@/components/Dialog"
import { useMutate } from "@/util/client/useMutate"
import { deleteComment as deleteCommentAction } from "../actions";
import { UserComment } from "@/user/comment/type"

interface DeleteConfirmCommentDialogProps extends DialogProps {
    comment: UserComment
}
export const DeleteConfirmCommentDialog: FC<DeleteConfirmCommentDialogProps> = ({ comment, ...dialogProps }) => {
    const deleteComment = useMutate(async () => {
        await deleteCommentAction(comment)
    }, {
        onSuccess: { toast: "コメントを削除しました" },
        onError: { toast: "コメントを削除できませんでした" },
    })

    return (
        <Dialog {...dialogProps}>
            コメントを
            削除してもいいですか？
            <Flex justify="flex-end" gap="sm" mt="md">
                <Button
                    variant="default"
                    c="backgroundText"
                    onClick={dialogProps.onClose}
                >
                    NO
                </Button>
                <MutateButton
                    variant="filled"
                    mutation={deleteComment}
                >
                    OK
                </MutateButton>
            </Flex>
        </Dialog >
    )
}
