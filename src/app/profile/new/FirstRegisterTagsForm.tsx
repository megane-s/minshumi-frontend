"use client"

import { ArtTagForm } from "@/art/components/tag/ArtTagForm"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { ArtTag } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import { CheckIcon } from "@/components/icon/Check"
import { useMutate } from "@/util/client/useMutate"
import { Center, Space } from "@mantine/core"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { handleFirstRegister } from "./actions"

interface FirstRegisterTagsFormProps {
}
export const FirstRegisterTagsForm: FC<FirstRegisterTagsFormProps> = () => {
    const [selectedMedias, setSelectedMedias] = useState<ArtTag[]>([])
    const [selectedGenres, setSelectedGenres] = useState<ArtTag[]>([])
    const [selectedOthers, setSelectedOthers] = useState<ArtTag[]>([])
    const [originals, setOriginals] = useState<ArtTag[]>([])

    const router = useRouter()
    const save = useMutate(async () => {
        await handleFirstRegister({
            interestTags: [...selectedMedias, ...selectedGenres, ...selectedOthers],
        })
        router.push(`/`)
    }, {
        loading: { toast: "設定中..." },
        onSuccess: { toast: "設定しました！" },
        onError: { toast: "設定できませんでした..." },
    })
    return (
        <ArtTagForm
            mediaTags={medias}
            genreTags={getGenreTags(selectedMedias)}
            otherTags={others}
            selectedMediaTags={selectedMedias}
            selectedGenreTags={selectedGenres}
            selectedOtherTags={selectedOthers}
            originalTags={originals}
            onChangeSelectedMediaTags={setSelectedMedias}
            onChangeSelectedGenreTags={setSelectedGenres}
            onChangeSelectedOtherTags={setSelectedOthers}
            onChangeOriginalTags={setOriginals}
            actions={
                <div>
                    <Center>
                        <MutateButton
                            mutation={save}
                            variant="filled"
                            leftSection={<CheckIcon />}
                        >
                            設定完了
                        </MutateButton>
                    </Center>
                    <Space h="2rem" />
                </div>
            }
        />
    )
}
