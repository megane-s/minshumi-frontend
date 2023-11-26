import { Dialog, DialogProps } from "@/components/Dialog"
import { FC, useState } from "react"
import InputTitle from "../title/InputTitle"
import { Button } from "@/components/Button"
import { Center, Flex, Indicator } from "@mantine/core"
import { Art } from "@/art/type"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md"
import styles from "./EditArtDialog.module.css"
import { uploadFile } from "@/file-upload/client"
import { SectionTitle } from "@/components/SectionTitle"

export interface EditArtDialogProps extends DialogProps {
    defaultValues: Partial<Art>
    onConfirm: (art: Pick<Art, "title" | "imageUrl">) => void
}
const EditArtDialog: FC<EditArtDialogProps> = ({ defaultValues, onConfirm, ...props }) => {
    const titleDefaultValue = defaultValues.title ?? ""
    const imageUrlDefaultValue = defaultValues.imageUrl ?? "/placeholder/300x200_blue.png"
    const [title, setTitle] = useState(titleDefaultValue)
    const [imageUrl, setImageUrl] = useState(imageUrlDefaultValue)
    const onClickOk = () => {
        onConfirm({
            title,
            imageUrl,
        })
        props.onClose()
        setTitle("")
        setImageUrl("/placeholder/300x200_blue.png")
    }

    const handleUpload = async () => {
        const { publicUrl } = await uploadFile()
        setImageUrl(publicUrl)
    }

    return (
        <Dialog
            title="作品を入力"
            {...props}
        >
            <SectionTitle ta="center">
                1. 関連作品のタイトル
            </SectionTitle>

            <InputTitle
                title={title} onChangeTitle={setTitle}
                autoFocus
            />

            <SectionTitle ta="center" my="md">
                2. 関連作品の画像
            </SectionTitle>

            <Center my="md">
                <Indicator
                    inline
                    label={<MdOutlineEdit />}
                    size={24}
                    position="bottom-end"
                    h="fit-content"
                    classNames={{ indicator: styles.imageIndicator }}
                    onClick={() => void handleUpload()}
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={200}
                        height={200}
                        style={{ height: "auto" }}
                    />
                </Indicator>
            </Center>

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

export default EditArtDialog
