import { Dialog, DialogProps } from "@/components/Dialog"
import { FC, useState } from "react"
import InputTitle from "../title/InputTitle"
import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import { Art } from "@/art/type"

export interface AddArtDialogProps extends DialogProps {
    onConfirm: (art: Art) => void
}
const AddArtDialog: FC<AddArtDialogProps> = ({ onConfirm, ...props }) => {
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("/placeholder/300x200_blue.png")
    const onClickOk = () => {
        onConfirm({
            artId: "test-related-art" + Math.random(),
            title,
            imageUrl,
            description: "",
        })
        props.onClose()
        setTitle("")
        setImageUrl("/placeholder/300x200_blue.png")
    }
    return (
        <Dialog
            title="作品を入力"
            {...props}
        >
            <InputTitle
                title={title} onChangeTitle={setTitle}
            />

            <Flex justify="space-between" my="md">
                <Button variant="subtle" onClick={props.onClose}>
                    キャンセル
                </Button>
                <Button variant="filled" onClick={onClickOk}>
                    決定
                </Button>
            </Flex>
        </Dialog>
    )
}

export default AddArtDialog
