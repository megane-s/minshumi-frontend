"use client"
import { ComponentProps, FC } from "react"
import { Button } from "./Button"
import { login } from "@/auth/client/login"

interface LoginButtonProps extends ComponentProps<typeof Button<"button">> {
}
export const LoginButton: FC<LoginButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button
      variant="outline"
      onClick={(e) => {
        onClick?.(e)
        void login()
      }}
      {...props}
    >
      ログイン
    </Button>
  )
}
