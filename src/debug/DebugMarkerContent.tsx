"use client"

import { Alert } from "@/components/Alert"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { useDisclosure } from "@mantine/hooks"
import { FC } from "react"
import { css } from "styled-system/css"

interface DebugMarkerContentProps {
    isDev: boolean
    isDevDb: boolean
}
const DebugMarkerContent: FC<DebugMarkerContentProps> = ({ isDev, isDevDb }) => {
    const [open, { toggle }] = useDisclosure(isDev)
    console.log("DebugMarkerContent", isDev, isDevDb);

    if (!open) return null
    return (
        <Card
            className={css({
                position: "fixed !important",
                bottom: 0,
                left: 0,
                zIndex: 100,
                display: "flex !important",
                flexDir: "column !important",
                justifyContent: "flex-start",
                alignItems: "flex-start",
            })}
        >
            これは本番環境では表示されません。
            <Button
                color="info"
                variant="outline"
            >
                開発環境
            </Button>
            <Alert
                color={isDevDb ? "info" : "error"}
                title={isDevDb ? "開発DBに接続しています" : "本番用DBに接続しています"}
            />
            <Button onClick={toggle}>
                閉じる
            </Button>
        </Card>
    )
}

export default DebugMarkerContent
