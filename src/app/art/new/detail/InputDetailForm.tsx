"use client"

import { FC, useState } from "react"
import { Flex, Indicator, Stack, TextInput } from "@mantine/core"
import styles from "./styles.module.css"
import { Textarea } from "@/components/Textarea"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md";
import { uploadFile } from "@/file-upload/client"

interface InputDetailFormProps {
    defaultValues: { title: string, description: string, likePoint: string, imageUrl: string }
}
const InputDetailForm: FC<InputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useState(defaultValues.title)
    const [description, setDescription] = useState(defaultValues.description)
    const [likePoint, setLikePoint] = useState(defaultValues.likePoint)
    const [imageUrl, setImageUrl] = useState(defaultValues.imageUrl)
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
                    <Textarea
                        value={likePoint}
                        onChange={e => setLikePoint(e.target.value)}
                        label="好きなポイント"
                        rows={3}
                    />
                </Stack>

            </Flex>
        </div>
    )
}

export default InputDetailForm
