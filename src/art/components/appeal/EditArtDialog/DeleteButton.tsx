import { Button } from "@/components/Button"
import { Dialog, useDialog } from "@/components/Dialog"
import { Flex, Text } from "@mantine/core"
import { FC, ReactNode } from "react"

interface ArtDeleteButtonProps {
    confirmMessage?: ReactNode
    onDelete: () => void
}
const ArtDeleteButton: FC<ArtDeleteButtonProps> = ({ onDelete, confirmMessage = "削除してもよろしいですか？" }) => {
    const confirmDialog = useDialog()
    return (
        <>
            <Button variant="outline" color="error" onClick={confirmDialog.onOpen}>
                削除
            </Button>
            <Dialog {...confirmDialog.dialogProps}>
                <Text my="md">
                    {confirmMessage}
                </Text>
                <Flex justify="space-between">
                    <Button variant="outline" color="error" onClick={confirmDialog.onClose}>
                        キャンセル
                    </Button>
                    <Button
                        variant="filled"
                        color="error"
                        onClick={() => {
                            onDelete()
                            confirmDialog.onClose()
                        }}
                    >
                        削除
                    </Button>
                </Flex>
            </Dialog>
        </>
    )
}

export default ArtDeleteButton
