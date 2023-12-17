"use client"

import { sleep } from "@/util/sleep"
import { withSuspense } from "@/util/withSuspense"
import { Container, Loader, } from "@mantine/core"
import { FC } from "react"

interface ContentProps {
}
const Content: FC<ContentProps> = () => {
    return (
        <Container>
            {/* 呼び出したいページ */}
            <MyComp label="hoge" />
        </Container >
    )
}

export default Content

const MyComp = withSuspense(async (props: { label: string }) => {
    const session = await sleep(3000)
    return <>{props.label}:ok</>
}, <Loader />)

