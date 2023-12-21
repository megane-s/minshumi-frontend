"use client"

import { FC } from "react"
import { NewArtSession } from "@/art/newArtSession/type"
import NewArtNavigation from "../Navigation"
import InputDetailForm from "@/art/components/detail/ArtDetailForm"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { Art } from "@/art/type"

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
                <NewArtNavigation
                    prevHref="/art/new/title#"
                    nextHref={!isValid ? "#" : "/art/new/tag#"}
                    nextButtonProps={{
                        disabled: !isValid,
                    }}
                />
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
