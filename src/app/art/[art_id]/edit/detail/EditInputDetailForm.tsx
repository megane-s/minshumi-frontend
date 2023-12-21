"use client"

import { FC, useState } from "react"
import { NewArtSession } from "@/art/newArtSession/type"
import InputDetailForm, { getTitleErrors } from "@/art/components/detail/ArtDetailForm"
import { Flex } from "@mantine/core"
import { useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { sleep } from "@/util/sleep"

interface EditInputDetailFormProps {
    defaultValues: Pick<NewArtSession, "title" | "description" | "imageUrl">
}
const EditInputDetailForm: FC<EditInputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useState(defaultValues.title ?? "")
    const titleErrors = getTitleErrors(title)
    const [description, setDescription] = useState(defaultValues.description ?? "")
    const [imageUrl, setImageUrl] = useState(defaultValues.imageUrl ?? "/placeholder/1200x675_red.png")

    const isValid = titleErrors.length === 0

    const handleSave = useMutate(async () => {
        await sleep(1000)
    }, {
        loading: { toast: "更新中" },
        onSuccess: { toast: "更新しました！" },
        onError: { toast: "更新できませんでした..." },
    })

    return (
        <InputDetailForm
            title={title} onChangeTitle={setTitle} titleErrors={titleErrors}
            description={description} onChangeDescription={setDescription}
            imageUrl={imageUrl} onChangeImageUrl={setImageUrl}
            isValid={isValid}
            actions={<Flex mt="lg" justify="center">
                <MutateButton variant="filled" size="lg" mutation={handleSave}>
                    更新
                </MutateButton>
            </Flex>}
        />
    )
}

export default EditInputDetailForm

