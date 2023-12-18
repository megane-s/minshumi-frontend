"use client"

import { sleep } from "@/util/sleep"
import { withSuspense } from "@/util/withSuspense"
import { Container, Loader, } from "@mantine/core"
import MutateButton from "@/components/MutateButton"
import { Switch } from "@/components/Switch"
import { useMutate } from "@/util/client/useMutate"

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
            <MyComp label="hoge" />

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

const MyComp = withSuspense(async (props: { label: string }) => {
    await sleep(3000)
    return <>{props.label}:ok</>
}, <Loader />)

