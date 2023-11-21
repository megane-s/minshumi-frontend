"use client"

import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { signIn } from "next-auth/react"
import { FC } from "react"

interface LoginButtonProps {
}
const LoginButton: FC<LoginButtonProps> = () => {
    const login = useMutate(async () => {
        await signIn("google")
    })
    return (
        <MutateButton
            mutation={login}
            variant="filled"
            size="lg"
            w="100%"
        >
            Googleで ログイン
        </MutateButton>
    )
}

export default LoginButton
