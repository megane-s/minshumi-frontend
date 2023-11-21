"use client"

import { login } from "@/auth/client/login"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { useSearchParams } from "next/navigation"
import { FC } from "react"

interface LoginButtonProps {
}
const LoginButton: FC<LoginButtonProps> = () => {
    const searchParams = useSearchParams()
    const handleLogin = useMutate(async () => {
        const callbackUrl = searchParams.get("callback") ?? "/"
        await login({ callbackUrl })
    })
    return (
        <MutateButton
            mutation={handleLogin}
            variant="filled"
            size="lg"
            w="100%"
        >
            Googleで ログイン
        </MutateButton>
    )
}

export default LoginButton
