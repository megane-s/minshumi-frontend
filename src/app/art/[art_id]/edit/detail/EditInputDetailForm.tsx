"use client"

import { FC, useState } from "react"
import InputDetailForm, { getTitleErrors } from "@/art/components/detail/ArtDetailForm"
import { Flex } from "@mantine/core"
import { useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { handleSaveArtDetail } from "./actions"
import { Art, ArtId, CreateArtParams } from "@/art/type"

interface EditInputDetailFormProps {
    artId: ArtId
    defaultValues: Pick<CreateArtParams, "title" | "description" | "imageUrl">
    disableTitle: boolean
}
const EditInputDetailForm: FC<EditInputDetailFormProps> = ({ artId, defaultValues, disableTitle }) => {
    const [title, setTitle] = useState(defaultValues.title ?? "")
    const titleErrors = getTitleErrors(title)
    const [description, setDescription] = useState(defaultValues.description ?? "")
    const [imageUrl, setImageUrl] = useState(defaultValues.imageUrl ?? "/placeholder/1200x675_red.png")

    const errors = titleErrors
    const isValid = errors.length === 0

    const handleSave = useMutate(async () => {
        if (!isValid) {
            throw new Error("入力が不正です。")
        }
        const input: Partial<Art> = {
            description,
            imageUrl,
        }
        if (!disableTitle) {
            input.title = title
        }
        await handleSaveArtDetail(artId, input)
    }, {
        loading: { toast: "更新中" },
        onSuccess: { toast: "更新しました！" },
        onError: { toast: "更新できませんでした..." },
    })

    return (
        <InputDetailForm
            title={title} onChangeTitle={setTitle} titleErrors={titleErrors} disableTitle={disableTitle}
            description={description} onChangeDescription={setDescription}
            imageUrl={imageUrl} onChangeImageUrl={setImageUrl}
            isValid={isValid}
            actions={<Flex mt="lg" justify="center">
                <MutateButton variant="filled" size="lg" mutation={handleSave} disabled={!isValid}>
                    更新
                </MutateButton>
            </Flex>}
        />
    )
}

export default EditInputDetailForm

