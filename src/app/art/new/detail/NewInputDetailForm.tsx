"use client"

import { FC } from "react"
import { NewArtSession } from "@/art/newArtSession/type"
import InputDetailForm from "@/art/components/detail/ArtDetailForm"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { Art } from "@/art/type"
import { flex } from "styled-system/patterns"
import { IoCaretBack, IoCaretForward } from "react-icons/io5"
import LinkButton from "@/components/LinkButton"
import MutateButton from "@/components/MutateButton"

interface NewInputDetailFormProps {
    defaultValues: Pick<NewArtSession, "title" | "description" | "imageUrl">
}
const NewInputDetailForm: FC<NewInputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useInputNewArtSessionField("title", defaultValues.title ?? "", "/art/new/detail")
    const titleErrors = getTitleErrors(title)
    const [description, setDescription] = useInputNewArtSessionField("description", defaultValues.description ?? "", "/art/new/detail")
    const [imageUrl, setImageUrl] = useInputNewArtSessionField("imageUrl", defaultValues.imageUrl ?? "/placeholder/300x200_red.png", "/art/new/detail")

    const isValid = titleErrors.length === 0

    return (
        <InputDetailForm
            title={title} onChangeTitle={setTitle} titleErrors={titleErrors}
            description={description} onChangeDescription={setDescription}
            imageUrl={imageUrl} onChangeImageUrl={setImageUrl}
            isValid={isValid}
            actions={
                <div className={flex({ justify: "space-between", my: "md", wrap: "wrap" })}>
                    <LinkButton
                        variant="default"
                        leftSection={<IoCaretBack />}
                        href="/art/detail"
                        prefetch
                    >
                        戻る
                    </LinkButton>
                    <MutateButton
                        mutation={save}
                        variant="filled"
                        rightSection={<IoCaretForward />}
                    >
                        登録する
                    </MutateButton>
                </div>

            }
        />
    )
}

export default NewInputDetailForm

const getTitleErrors = (title: Art["title"]) => {
    const errors: string[] = []
    if (title.trim().length === 0) errors.push("タイトルは必須です。")
    return errors
}
