import { DialogProps } from "@/components/Dialog"
import { Flex, Button } from "@mantine/core"
import { FC } from "react"

interface EditArtDialogFooterProps extends DialogProps {
    onClickOk: () => void
}
export const EditArtDialogFooter: FC<EditArtDialogFooterProps> = ({ onClickOk, ...props }) => {
    return (
        <Flex justify="space-between" my="md">
            <Button variant="subtle" onClick={props.onClose}>
                キャンセル
            </Button>
            <Button variant="filled" onClick={onClickOk}>
                決定
            </Button>
        </Flex>
    )
}
