"use client"
import { ActionIcon, Affix } from "@mantine/core"
import { FC, useState } from "react"
import { handleCancelGood, handleGood } from "./actions";
import { ArtId } from "@/art/type";
import { Dialog, useDialog } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { login } from "@/auth/client/login";
import { GoodIcon } from "@/components/icon/Good";

interface GoodButtonProps {
    artId: ArtId
    isGooded: boolean
    isLogined: boolean
}
export const GoodButton: FC<GoodButtonProps> = ({ artId, isGooded: propsIsGooded, isLogined }) => {
    const pleaseLoginDialog = useDialog()

    const [isGooded, setIsGooded] = useState(propsIsGooded)

    //いいねしたときにログインしてなかったらダイアログを表示
    const handleGoodClick = async () => {
        if (!isLogined) return pleaseLoginDialog.onOpen()
        if (!isGooded) {
            setIsGooded(true)
            await handleGood(artId);
        } else {
            setIsGooded(false)
            await handleCancelGood(artId);
        }
    };

    return (
        <Affix position={{ bottom: 8, right: 8 }}>
            <Dialog {...pleaseLoginDialog.dialogProps}>
                いいねするにはログインが必要です。
                <Button
                    variant="outline"
                    size="lg"
                    w="100%"
                    onClick={() => void login()}>ログイン</Button>
            </Dialog>

            <ActionIcon size="xl" variant={isGooded ? "filled" : "outline"} bg={isGooded ? "primary" : "background.2"} onClick={() => void handleGoodClick()}>
                <GoodIcon />
            </ActionIcon>

        </Affix>
    )
}
