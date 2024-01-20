"use client"

import { Art } from "@/art/type"
import { Button } from "@/components/Button"
import { Dialog } from "@/components/Dialog"
import { PageTitle } from "@/components/PageTitle"
import { sleep } from "@/util/sleep"
import { useDisclosure } from "@mantine/hooks"
import { FC, useEffect } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { handleClearLastCreatedArtId, handleGotoAppeal } from "./actions"

interface AppealReminderDialogProps {
    art: Art
}
const AppealReminderDialog: FC<AppealReminderDialogProps> = ({ art }) => {
    const [opened, { close, open }] = useDisclosure(false)
    useEffect(() => {
        void sleep(500)
            .then(open)
        void handleClearLastCreatedArtId()
    }, [open])
    return (
        <Dialog opened={opened} onClose={close} className={css({ textAlign: "center" })}>
            <PageTitle className={css({ color: "primary.0" })}>
                {art.title}をアピールしよう！
            </PageTitle>
            <div className={css({ my: "sm" })}>
                {art.title}がほかのユーザにもっと知られるチャンスです！
            </div>

            <div className={flex({ flexDir: "column", alignItems: "center", gap: "md" })}>
                <Button variant="gradient" size="lg" onClick={() => handleGotoAppeal(art.artId)}>
                    アピールする
                </Button>
                <Button onClick={close} variant="subtle">
                    今はやめておく
                </Button>
            </div>
        </Dialog>
    )
}

export default AppealReminderDialog
