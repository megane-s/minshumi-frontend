import { Art, ArtId, ArtSchema, InputRelatedArt } from "@/art/type"
import { DialogProps } from "@/components/Dialog"
import { Center, Button } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { FC, useState } from "react"
import { EditArtDialogFooter } from "./Footer"
import SelectArt from "@/art/components/SelectArt"

interface SelectRelatedArtProps {
    defaultArtId: ArtId | null
    onGotoNew: () => void
    onEditConfirm: (input: InputRelatedArt) => void
    dialogProps: DialogProps
}
export const SelectRelatedArt: FC<SelectRelatedArtProps> = ({ defaultArtId, onGotoNew, dialogProps, onEditConfirm }) => {
    const [selectedArtId, setSelectedArtId] = useState<ArtId | null>(defaultArtId)
    const queryClient = useQueryClient()
    const handleConfirm = async () => {
        if (!selectedArtId) return
        const newArt = await queryClient.getQueryData(["art", selectedArtId]) as Art | null
        if (newArt) {
            onEditConfirm(newArt)
        } else {
            onEditConfirm(
                await fetch(`/art/${selectedArtId}`)
                    .then(r => r.json())
                    .then(r => ArtSchema.parse(r))
            )
        }
    }
    return (
        <div>
            <SelectArt
                selectArtId={selectedArtId}
                onSelectArt={(art) => setSelectedArtId(art?.artId ?? null)}
                autoFocus
            />

            <Center my="md">
                <Button variant="subtle" onClick={onGotoNew}>
                    この中にない
                </Button>
            </Center>

            <EditArtDialogFooter
                onClickOk={() => void handleConfirm()}
                {...dialogProps}
            />
        </div>
    )
}
