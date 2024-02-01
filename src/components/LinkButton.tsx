"use client"

import { ComponentProps, FC, ReactNode } from "react"
import { Button } from "@/components/Button"
import Link from "next/link"

interface LinkButtonProps extends ComponentProps<typeof Button<typeof Link>> {
    href: string
    children: ReactNode
}
const LinkButton: FC<LinkButtonProps> = ({ href, children, disabled, onClick, ...props }: LinkButtonProps) => {
    return (
        <Button component={Link} href={disabled ? "" : href} disabled={disabled} onClick={e => disabled ? e.preventDefault() : onClick?.(e)} {...props}>
            {children}
        </Button>
    )
}

export default LinkButton
