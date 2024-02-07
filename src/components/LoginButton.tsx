"use client"
import { ComponentProps, FC } from "react"
import { Button } from "./Button"
import { login } from "@/auth/client/login"

interface LoginButtonProps extends ComponentProps<typeof Button<"button">> {
  callbackUrl?: string
}
export const LoginButton: FC<LoginButtonProps> = ({ onClick, callbackUrl, ...props }) => {
  return (
    <Button
      variant="outline"
      onClick={(e) => {
        onClick?.(e)
        void login({ callbackUrl })
      }}
      {...props}
    >
      ログイン
    </Button>
  )
}
