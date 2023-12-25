import { ComponentProps, FC, ReactNode } from "react"
import { css, cx } from "styled-system/css"

interface FullWidthProps extends ComponentProps<"div"> {
    children: ReactNode
}
const FullWidth: FC<FullWidthProps> = ({ className, children }) => {
    return (
        <div className={cx(css({ marginX: "calc(50% - 50vw)" }), className)}>
            {children}
        </div>
    )
}

export default FullWidth
