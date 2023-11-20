import { FC } from "react"
import { Button, ButtonProps } from "@/components/Button"
import Link from "next/link"

interface LinkButtonProps extends ButtonProps {
    href: string
}
const LinkButton: FC<LinkButtonProps> = ({ href, children, ...props }) => {
    return (
        <Button component={Link} href={href} {...props}>
            {children}
        </Button>
    )
}

export default LinkButton
