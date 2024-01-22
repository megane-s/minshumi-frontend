"use client"

import { useMutate } from "@/util/client/useMutate"
import { notImplementError } from "@/util/notImplement"
import { FC, useState } from "react"
import { handleAddWatchingArt } from "./actions"
import { flex } from "styled-system/patterns"
import SelectArt from "@/art/components/SelectArt"
import MutateButton from "@/components/MutateButton"
import { Divider } from "@mantine/core"
import { ArtId } from "@/art/type"
import LinkButton from "@/components/LinkButton"


interface NewWatchingArtFormProps {
}
const NewWatchingArtForm: FC<NewWatchingArtFormProps> = () => {
    const [selectArtId, setSelectArtId] = useState<null | ArtId>(null)
    const isValidSelectArtId = typeof selectArtId === "string"
    const isValid = isValidSelectArtId

    const addWatchingArt = useMutate(async () => {
        if (!isValid) throw notImplementError(`作品が選択されていません`)
        await handleAddWatchingArt(selectArtId)
    }, {
        loading: { toast: "登録中" },
        onSuccess: { toast: "今見ている作品に登録しました！" },
        onError: { toast: "登録できませんでした..." },
    })
    return (
        <div className={flex({ flexDir: "column", align: "center", gap: "md", my: "lg" })}>
            <SelectArt
                selectArtId={selectArtId}
                onSelectArt={art => setSelectArtId(art?.artId ?? null)}
            />
            <MutateButton mutation={addWatchingArt} variant="filled" disabled={!isValidSelectArtId}>
                見ている作品に登録
            </MutateButton>

            <Divider />

            <LinkButton variant="subtle" href="/art/new/detail">
                この中にない
            </LinkButton>
        </div>
    )
}

export default NewWatchingArtForm
