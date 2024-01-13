
"use client"

import { Alert } from "@/components/Alert"
import { LoginButton } from "@/components/LoginButton"
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
            <LoginButton variant="filled" />
        </div>
    )
}
export default PleaseLogin
