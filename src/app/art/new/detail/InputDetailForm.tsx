"use client"

import { FC } from "react"
import { Flex, Indicator, Stack, TextInput } from "@mantine/core"
import styles from "./styles.module.css"
import { Textarea } from "@/components/Textarea"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md";
import { uploadFile } from "@/file-upload/client"
import { NewArtSession } from "@/art/newArtSession/type"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"

interface InputDetailFormProps {
    defaultValues: Pick<NewArtSession, "title" | "description" | "imageUrl">
}
const InputDetailForm: FC<InputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useInputNewArtSessionField("title", defaultValues.title, "/art/new/detail")
    const [description, setDescription] = useInputNewArtSessionField("description", defaultValues.description, "/art/new/detail")
    const [imageUrl, setImageUrl] = useInputNewArtSessionField("imageUrl", defaultValues.imageUrl, "/art/new/detail")
    const handleUpload = async () => {
        const { publicUrl } = await uploadFile()
        setImageUrl(publicUrl)
    }
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
                </Flex>

                <Stack className={`${styles.flexGrow} ${styles.flexShrink}`}>
                    <TextInput
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        label="タイトル"
                    />
                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label="作品の概要"
                        rows={5}
                    />
                </Stack>

            </Flex>
        </div>
    )
}

export default InputDetailForm
