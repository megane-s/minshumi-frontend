"use client"

import { ArtTagForm } from "@/art/components/tag/ArtTagForm"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { ArtTag } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import { CheckIcon } from "@/components/icon/Check"
import { UserId } from "@/user/type"
import { useMutate } from "@/util/client/useMutate"
import { Center, Space } from "@mantine/core"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"

interface FirstRegisterTagsFormProps {
    userId: UserId
}
export const FirstRegisterTagsForm: FC<FirstRegisterTagsFormProps> = ({ userId }) => {
    const [selectedMedias, setSelectedMedias] = useState<ArtTag[]>([])
    const [selectedGenres, setSelectedGenres] = useState<ArtTag[]>([])
    const [selectedOthers, setSelectedOthers] = useState<ArtTag[]>([])

    const router = useRouter()
    const save = useMutate(async () => {
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
            onChangeSelectedMediaTags={setSelectedMedias}
            onChangeSelectedGenreTags={setSelectedGenres}
            onChangeSelectedOtherTags={setSelectedOthers}
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
