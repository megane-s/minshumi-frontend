
"use client"

import { Alert } from "@/components/Alert"
import LinkButton from "@/components/LinkButton"
import { ErrorIcon } from "@/components/icon/Error"
import { center } from "styled-system/patterns"

const PleaseLogin = () => {
    return (
        <div className={center({ flexDir: "column", gap: "md", my: "xl" })}>
            <Alert
                color="error"
                icon={<ErrorIcon />}
                title="ログインが必要です"
            />
            <LinkButton href="/login" variant="filled">
                ログイン
            </LinkButton>
        </div>
    )
}
export default PleaseLogin
