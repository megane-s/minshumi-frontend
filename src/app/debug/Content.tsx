"use client"

import MutateButton from "@/components/MutateButton"
import { Switch } from "@/components/Switch"
import { useMutate } from "@/util/client/useMutate"
import { sleep } from "@/util/sleep"
import { Container, } from "@mantine/core"
import { FC, useState } from "react"

interface ContentProps {
}
const Content: FC<ContentProps> = () => {
    const [willError, setWillError] = useState(false)
    const save = useMutate(async () => {
        await sleep(3000)
        if (willError) throw new Error("既知のエラー")
    }, {
        loading: { toast: "保存中...", button: "保存中..." },
        onSuccess: { toast: "保存できました！" },
        onError: { toast: "保存できませんでした...." },
    })
    return (
        <Container>
            {/* 呼び出したいページ */}

            <Switch
                label="エラー"
                checked={willError}
                onChange={() => setWillError(p => !p)}
            />

            <MutateButton mutation={save}>
                保存
            </MutateButton>
        </Container>
    )
}

export default Content
