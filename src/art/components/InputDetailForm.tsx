"use client"

import { FC, Fragment, ReactNode } from "react"
import { Flex, Indicator, Stack, TextInput } from "@mantine/core"
import styles from "./InputDetailForm.module.css"
import { Textarea } from "@/components/Textarea"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md";
import { uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import { Art } from "../type"

interface InputDetailFormProps {
    title: string
    onChangeTitle: (title: string) => void
    titleErrors: string[]

    description: string
    onChangeDescription: (description: string) => void

    imageUrl: string
    onChangeImageUrl: (imageUrl: string) => void

    isValid: boolean

    actions: ReactNode
}
const InputDetailForm: FC<InputDetailFormProps> = ({
    title, onChangeTitle, titleErrors,
    description, onChangeDescription,
    imageUrl, onChangeImageUrl,
    isValid,
    actions,
}) => {

    const handleUpload = useMutate(async () => {
        const { publicUrl } = await uploadFile()
        onChangeImageUrl(publicUrl)
    }, {
        loading: { button: "アップロード中..." },
        onSuccess: { toast: "アップロードしました！" },
        onError: { toast: "アップロードできませんでした..." },
    })
    return (
        <div>
            <Flex gap="sm" direction={{ base: "column", sm: "row" }}>

                <Flex justify="center" py="md">
                    <Indicator
                        inline
                        label={<MdOutlineEdit />}
                        size={24}
                        position="bottom-end"
                        h="fit-content"
                        classNames={{ indicator: styles.imageIndicator }}
                        onClick={handleUpload.mutate}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={200}
                            height={200}
                            style={{ height: "auto" }}
                        />
                    </Indicator>
                </Flex>

                <Stack className={`${styles.flexGrow} ${styles.flexShrink}`}>
                    <TextInput
                        value={title}
                        onChange={e => onChangeTitle(e.target.value)}
                        label="タイトル"
                        error={!isValid && titleErrors.map((err, i) => <Fragment key={i}>{err}<br /></Fragment>)}
                    />
                    <Textarea
                        value={description}
                        onChange={e => onChangeDescription(e.target.value)}
                        label="作品の概要"
                        rows={5}
                    />
                </Stack>

            </Flex>

            <div>
                {actions}
            </div>
        </div>
    )
}

export default InputDetailForm

export const getTitleErrors = (title: Art["title"]) => {
    const errors: string[] = []
    if (title.trim().length === 0) errors.push("タイトルは必須です。")
    return errors
}
