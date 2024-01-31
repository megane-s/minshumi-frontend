"use client"

import ArtDetailForm, { getTitleErrors } from "@/art/components/detail/ArtDetailForm"
import { FC, useEffect, useState } from "react"
import NewArtNavigation, { NewArtNavigationNextButton } from "../Navigation"
import { Loader } from "@/components/Loader"
import { CreateArtParamsSchema } from "@/art/type"
import { useLocalStorage } from "@/util/client/useLocalStorage"
import { z } from "zod"
import { detailLocalStorageKey } from "./localStorage"
import { css } from "styled-system/css"

const images = [
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-1.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-2.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-3.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-4.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-5.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-1-6.png",

    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-1.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-2.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-3.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-4.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-5.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-2-6.png",

    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-1.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-2.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-3.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-4.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-5.png",
    "https://storage.googleapis.com/minshumi-user-content/art-default/type-3-6.png",
]

const getFormDefaultValues = () => ({
    title: "",
    description: "",
    imageUrl: images[Math.floor(Math.random() * images.length)],
})

export const CreateArtParamsDetailSchema = CreateArtParamsSchema.pick({
    title: true,
    description: true,
    imageUrl: true,
})
type CreateArtParamsDetail = z.infer<typeof CreateArtParamsDetailSchema>

interface NewArtDetailFormProps {
}
const NewArtDetailForm: FC<NewArtDetailFormProps> = () => {
    const [defaultValues] = useLocalStorage(detailLocalStorageKey, CreateArtParamsDetailSchema)
    if (defaultValues.isLoading) {
        return (
            <Loader className={css({ my: "md" })} />
        )
    }
    return <FormContent
        defaultValues={{
            ...getFormDefaultValues(),
            ...defaultValues.data,
        }}
    />
}

export default NewArtDetailForm

interface FormContentProps {
    defaultValues: CreateArtParamsDetail
}
const FormContent: FC<FormContentProps> = ({ defaultValues }) => {
    const [input, setInput] = useState(defaultValues)
    useEffect(() => {
        localStorage.setItem(detailLocalStorageKey, JSON.stringify(input))
    }, [input])
    const titleErrors = getTitleErrors(input.title)
    const isValidTitle = titleErrors.length === 0
    const isValid = isValidTitle
    return (
        <div>
            <ArtDetailForm
                title={input.title} onChangeTitle={title => setInput(p => ({ ...p, title }))} titleErrors={titleErrors} disableTitle={false}
                description={input.description} onChangeDescription={description => setInput(p => ({ ...p, description }))}
                imageUrl={input.imageUrl} onChangeImageUrl={imageUrl => setInput(p => ({ ...p, imageUrl }))}
                isValid={isValid}
                actions={
                    <NewArtNavigation
                        prev={null}
                        next={
                            <NewArtNavigationNextButton
                                href="/art/new/tag#"
                                disabled={!isValid}
                            />
                        }
                    />
                }
            />
        </div>
    )
}
