import { ArtAppeal, ArtId } from "@/art/type"
import { Dialog, DialogProps, useDialog } from "@/components/Dialog"
import LinkButton from "@/components/LinkButton"
import { SectionTitle } from "@/components/SectionTitle"
import Link from "next/link"
import { FC } from "react"
import Image from "next/image"
import { flex } from "styled-system/patterns"
import { Divider } from "@mantine/core"
import { css } from "styled-system/css"
import { Button } from "@/components/Button"
import { Mutation, useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { handleDeleteAppeal } from "./actions"

interface ArtDetailDialogProps extends DialogProps {
    art: ArtAppeal
    editable?: boolean
}
export const ArtDetailDialog: FC<ArtDetailDialogProps> = ({ art, editable = false, ...dialogProps }) => {
    const deleteAppeal = useMutate(async () => {
        await handleDeleteAppeal(art.artId)
        dialogProps.onClose()
    }, {
        loading: { toast: "削除中" },
        onSuccess: { toast: "アピールを削除しました" },
        onError: { toast: "削除できませんでした" }
    })
    return (
        <Dialog {...dialogProps}>
            <Link href={`/art/${art.artId}`} >
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={200}
                    height={100}
                    style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "cover" }}
                />
            </Link>

            <SectionTitle>
                <div className={flex({ w: "100%", justify: "space-between", align: "center", my: "sm" })}>
                    <div>
                        {art.title}
                    </div>
                    <LinkButton variant="light" size="xs" href={`/art/${art.artId}`}>
                        作品のページへ
                    </LinkButton>
                </div>
            </SectionTitle>
            {art.likePoint}
            {editable &&
                <Edit
                    artId={art.artId}
                    deleteMutation={deleteAppeal}
                />
            }
        </Dialog>
    )
}

interface EditProps {
    deleteMutation: Mutation
    artId: ArtId
}
const Edit: FC<EditProps> = ({ deleteMutation, artId }) => {
    const deleteConfirmDialog = useDialog()
    return (
        <div className={flex({ flexDir: "column", w: "full", align: "end", gap: "md" })}>
            <LinkButton href={`/art/${artId}/appeal`} variant="gradient">
                アピールを編集
            </LinkButton>
            <Divider className={css({ w: "full" })} />
            <div>
                <Button variant="outline" color="error" onClick={deleteConfirmDialog.onOpen}>
                    削除
                </Button>
            </div>

            <Dialog
                {...deleteConfirmDialog.dialogProps}
                title="アピールを削除してもいいですか？"
            >
                <div className={flex({ w: "full", justify: "flex-end", gap: "sm" })}>
                    <Button onClick={deleteConfirmDialog.onClose}>
                        キャンセル
                    </Button>
                    <MutateButton mutation={deleteMutation} variant="filled" color="error">
                        削除する
                    </MutateButton>
                </div>
            </Dialog>
        </div>
    )
}
