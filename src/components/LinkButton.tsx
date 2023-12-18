import { ComponentProps, FC, ReactNode } from "react"
import { Button } from "@/components/Button"
import Link from "next/link"

interface LinkButtonProps extends ComponentProps<typeof Button<typeof Link>> {
    href: string
    children: ReactNode
}
const LinkButton: FC<LinkButtonProps> = ({ href, children, ...props }: LinkButtonProps) => {
    return (
        <Button component={Link} href={href} {...props}>
            {children}
        </Button>
    )
}

export default LinkButton
