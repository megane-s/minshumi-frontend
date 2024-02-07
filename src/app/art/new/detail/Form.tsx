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
import { getRandomArtImage } from "@/art/image"

const getFormDefaultValues = () => ({
    title: "",
    description: "",
    imageUrl: getRandomArtImage(),
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
