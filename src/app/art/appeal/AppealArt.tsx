"use client"

import SelectArt from "@/art/components/SelectArt"
import { ArtId } from "@/art/type"
import LinkButton from "@/components/LinkButton"
import { Divider } from "@mantine/core"
import { FC, useState } from "react"
import { flex } from "styled-system/patterns"

interface AppealArtFormProps {
}
const AppealArtForm: FC<AppealArtFormProps> = () => {
    const [selectArtId, setSelectArtId] = useState<null | ArtId>(null)
    const isValidSelectArtId = typeof selectArtId === "string"

    return (
        <div className={flex({ flexDir: "column", align: "center", gap: "md", my: "lg" })}>
            <SelectArt
                selectArtId={selectArtId}
                onSelectArt={art => setSelectArtId(art?.artId ?? null)}
            />
            <LinkButton href={`/art/${selectArtId}/appeal`} variant="filled" disabled={!isValidSelectArtId}>
                この作品をアピールする
            </LinkButton>

            <Divider />

            <LinkButton variant="subtle" href="/art/new/detail">
                この中にない
            </LinkButton>
        </div>
    )
}

export default AppealArtForm