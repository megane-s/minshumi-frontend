"use client"
import { FC } from "react"
import { Button } from "./Button"
import { login } from "@/auth/client/login"

interface LoginButtonProps {
}
export const LoginButton: FC<LoginButtonProps> = () => {
  return (
    <Button variant="outline" onClick={() => login()}>
      ログイン
    </Button>
  )
}
