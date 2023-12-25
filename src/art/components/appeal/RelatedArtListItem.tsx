import { Stack } from "@mantine/core"
import { FC, memo } from "react"
import Image from "next/image"
import EditArtDialog from "./EditArtDialog/EditArtDialog"
import { useDialog } from "@/components/Dialog"
import { InputRelatedArt } from "@/art/newArtSession/type"

interface RelatedArtListItemProps {
    size?: "md" | "lg"
    artInput: InputRelatedArt
    onEditConfirm: (artInput: InputRelatedArt) => void
    onDelete: () => void
    className?: string
}
const RelatedArtListItem: FC<RelatedArtListItemProps> = ({ size = "md", artInput, onEditConfirm, onDelete, className }) => {
    const editDialog = useDialog()
    return (
        <>
            <Stack
                align="center"
                gap="xs"
                ta="center"
                onClick={editDialog.onOpen}
                className={className}
            >
                <Image
                    src={artInput.imageUrl}
                    alt={artInput.title}
                    width={150 * (size === "lg" ? 1.2 : 1)}
                    height={100 * (size === "lg" ? 1.2 : 1)}
                    style={{ width: 150, height: "auto" }}
                />
                {artInput.title}
            </Stack>
            <EditArtDialog
                title="関連作品を編集"
                defaultValues={{ ...artInput, mode: "artId" in artInput ? "select" : "new" }}
                onEditConfirm={onEditConfirm}
                withEditMenus
                onDelete={onDelete}
                {...editDialog.dialogProps}
            />
        </>
    )
}

export default memo(RelatedArtListItem)

