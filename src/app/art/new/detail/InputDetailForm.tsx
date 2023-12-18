"use client"

import { FC, Fragment } from "react"
import { Flex, Indicator, Stack, TextInput } from "@mantine/core"
import styles from "./styles.module.css"
import { Textarea } from "@/components/Textarea"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md";
import { uploadFile } from "@/file-upload/client"
import { NewArtSession } from "@/art/newArtSession/type"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { useMutate } from "@/util/client/useMutate"
import NewArtNavigation from "../Navigation"
import { Art } from "@/art/type"

interface InputDetailFormProps {
    defaultValues: Pick<NewArtSession, "title" | "description" | "imageUrl">
}
const InputDetailForm: FC<InputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useInputNewArtSessionField("title", defaultValues.title ?? "", "/art/new/detail")
    const titleErrors = getTitleErrors(title)
    const [description, setDescription] = useInputNewArtSessionField("description", defaultValues.description ?? "", "/art/new/detail")
    const [imageUrl, setImageUrl] = useInputNewArtSessionField("imageUrl", defaultValues.imageUrl ?? "/placeholder/300x200_red.png", "/art/new/detail")

    const isValid = titleErrors.length >= 1

    const handleUpload = useMutate(async () => {
        const { publicUrl } = await uploadFile()
        setImageUrl(publicUrl)
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
                        onChange={e => setTitle(e.target.value)}
                        label="タイトル"
                        error={isValid ? titleErrors.map((err, i) => <Fragment key={i}>{err}<br /></Fragment>) : null}
                    />
                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label="作品の概要"
                        rows={5}
                    />
                </Stack>

            </Flex>

            <NewArtNavigation
                prevHref="/art/new/title#"
                nextHref={isValid ? "#" : "/art/new/tag#"}
                nextButtonProps={{
                    disabled: isValid,
                }}
            />
        </div>
    )
}

export default InputDetailForm

const getTitleErrors = (title: Art["title"]) => {
    const errors: string[] = []
    if (title.trim().length === 0) errors.push("タイトルは必須です。")
    return errors
}
