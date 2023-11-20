import { FC } from "react"
import { Button as MButton, ButtonProps as MButtonProps } from "@mantine/core"

interface ButtonProps extends MButtonProps {
}
export const Button: FC<ButtonProps> = ({ ...props }) => {
  return (
    <MButton variant="default" w="fit-content" {...props}></MButton>
  )
}
