"use client"

import { ArtTagForm } from "@/art/components/tag/ArtTagForm"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { CreateArtParamsSchema } from "@/art/type"
import { useLocalStorage } from "@/util/client/useLocalStorage"
import { Loader } from "@mantine/core"
import { FC, useEffect, useState } from "react"
import { z } from "zod"
import NewArtNavigation, { NewArtNavigationPrevButton } from "../Navigation"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { CheckIcon } from "@/components/icon/Check"
import { handleCreateArt } from "../actions"
import { tagLocalStorageKey } from "./localStorage"
import { detailLocalStorageKey } from "../detail/localStorage"
import { CreateArtParamsDetailSchema } from "@/app/art/new/detail/Form"
import { getLocalStorageItem } from "@/util/client/localStorage"
import { notImplementError } from "@/util/notImplement"

export const CreateArtParamsTagsSchema = CreateArtParamsSchema.pick({
    mediaTags: true,
    genreTags: true,
    otherTags: true,
    originalTags: true,
})
type CreateArtParamsTags = z.infer<typeof CreateArtParamsTagsSchema>

interface NewArtTagFormProps {
}
const NewArtTagForm: FC<NewArtTagFormProps> = () => {
    const [defaultValues] = useLocalStorage(tagLocalStorageKey, CreateArtParamsTagsSchema)
    if (defaultValues.isLoading) {
        return (
            <Loader />
        )
    }
    return <FormContent
        defaultValues={defaultValues.data ?? {
            mediaTags: [],
            genreTags: [],
            otherTags: [],
            originalTags: [],
        }}
    />
}

export default NewArtTagForm

interface FormContentProps {
    defaultValues: CreateArtParamsTags
}
const FormContent: FC<FormContentProps> = ({ defaultValues }) => {
    const [input, setInput] = useState(defaultValues)
    useEffect(() => {
        localStorage.setItem(tagLocalStorageKey, JSON.stringify(input))
    }, [input])

    const save = useMutate(async () => {
        const detailInput = getLocalStorageItem(detailLocalStorageKey, CreateArtParamsDetailSchema)
        const tagInput = getLocalStorageItem(tagLocalStorageKey, CreateArtParamsTagsSchema)
        if (!detailInput || !tagInput) throw notImplementError(`入力が不正です。`)
        await handleCreateArt({
            ...detailInput,
            ...tagInput,
        })
        localStorage.removeItem(detailLocalStorageKey)
        localStorage.removeItem(tagLocalStorageKey)
    }, {
        loading: { toast: "登録中" },
        onSuccess: { toast: "作品を登録しました！" },
        onError: { toast: "エラー" },
    })
    return (
        <ArtTagForm
            mediaTags={medias}
            genreTags={getGenreTags(medias)}
            otherTags={others}
            selectedMediaTags={input.mediaTags} onChangeSelectedMediaTags={mediaTags => setInput(p => ({ ...p, mediaTags }))}
            selectedGenreTags={input.genreTags} onChangeSelectedGenreTags={genreTags => setInput(p => ({ ...p, genreTags }))}
            selectedOtherTags={input.otherTags} onChangeSelectedOtherTags={otherTags => setInput(p => ({ ...p, otherTags }))}
            originalTags={input.originalTags} onChangeOriginalTags={otherTags => setInput(p => ({ ...p, otherTags }))}
            actions={
                <NewArtNavigation
                    prev={
                        <NewArtNavigationPrevButton
                            href="/art/new/detail"
                        />
                    }
                    next={
                        <MutateButton
                            mutation={save}
                            variant="gradient"
                            leftSection={<CheckIcon />}
                        >
                            登録
                        </MutateButton>
                    }
                />
            }
        />
    )
}
