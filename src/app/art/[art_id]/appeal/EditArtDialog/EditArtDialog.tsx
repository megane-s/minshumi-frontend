import { Dialog, DialogProps } from "@/components/Dialog"
import { FC, useState } from "react"
import { SelectRelatedArt } from "./Select"
import { InputNewRelatedArt } from "./InputNew"
import { Divider, Flex, Space } from "@mantine/core"
import ArtDeleteButton from "./DeleteButton"
import { RelatedArt } from "@/art/type"

export interface EditArtDialogProps extends DialogProps {
    defaultValues: Partial<RelatedArt & { mode: "select" | "new" }>
    onEditConfirm: (art: RelatedArt) => void
    onDelete?: () => void
    withEditMenus?: boolean
}
const EditArtDialog: FC<EditArtDialogProps> = ({
    defaultValues: { mode: defaultMode = "select", ...defaultArt },
    onEditConfirm,
    onDelete,
    withEditMenus = false,
    ...props
}) => {
    const [mode, setMode] = useState<"select" | "new">(defaultMode)

    const defaultSelectedArtId = "artId" in defaultArt && defaultArt.artId ? defaultArt.artId : null
    const handleEditConfirm: typeof onEditConfirm = (input) => {
        onEditConfirm(input)

        props.onClose()
        setMode(defaultMode)
    }

    return (
        <Dialog
            {...props}
        >
            {mode === "select" &&
                <SelectRelatedArt
                    defaultArtId={defaultSelectedArtId}
                    onGotoNew={() => setMode("new")}
                    dialogProps={props}
                    onEditConfirm={handleEditConfirm}
                />
            }
            {mode === "new" && <>
                <InputNewRelatedArt
                    defaultArt={defaultArt}
                    onGotoSelect={() => setMode("select")}
                    dialogProps={props}
                    onEditConfirm={handleEditConfirm}
                />
            </>}

            <Divider my="md" />

            {withEditMenus && <Flex justify="flex-end" gap="xs">
                <ArtDeleteButton
                    onDelete={() => onDelete?.()}
                />
            </Flex>}

            <Space w="100%" h="3rem" />
        </Dialog>
    )
}

export default EditArtDialog

