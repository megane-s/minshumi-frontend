"use client"

import { FC, Fragment, ReactNode } from "react"
import { Flex, Stack, TextInput } from "@mantine/core"
import { Textarea } from "@/components/Textarea"
import { Art } from "../../type"
import { css } from "styled-system/css"
import { ImageInput } from "@/components/ImageInput"

interface ArtDetailFormProps {
    title: string
    onChangeTitle: (title: string) => void
    titleErrors: string[]
    disableTitle: boolean

    description: string
    onChangeDescription: (description: string) => void

    imageUrl: string
    onChangeImageUrl: (imageUrl: string) => void

    isValid: boolean

    actions: ReactNode
}
const ArtDetailForm: FC<ArtDetailFormProps> = ({
    title, onChangeTitle, titleErrors, disableTitle,
    description, onChangeDescription,
    imageUrl, onChangeImageUrl,
    isValid,
    actions,
}) => {

    return (
        <div>
            <Flex gap="sm" direction={{ base: "column", sm: "row" }}>

                <Flex justify="center" py="md">
                    <ImageInput
                        src={imageUrl}
                        alt="作品の画像"
                        type="background"
                        onUpload={(imageUrl) => onChangeImageUrl(imageUrl)}
                        imageProps={{
                            width: 200,
                            height: 200,
                            style: { width: 200, maxHeight: 200, objectFit: "cover" },
                        }}
                        withIndicator
                    />
                </Flex>

                <Stack className={css({ flexGrow: 1, flexShrink: 1 })}>
                    <TextInput
                        value={title}
                        onChange={e => onChangeTitle(e.target.value)}
                        label="タイトル"
                        error={!isValid && titleErrors.map((err, i) => <Fragment key={i}>{err}<br /></Fragment>)}
                        disabled={disableTitle}
                        description={disableTitle && "タイトルは作品を登録した人のみ編集できます。"}
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

export default ArtDetailForm

export const getTitleErrors = (title: Art["title"]) => {
    const errors: string[] = []
    if (title.trim().length === 0) errors.push("タイトルは必須です。")
    return errors
}
