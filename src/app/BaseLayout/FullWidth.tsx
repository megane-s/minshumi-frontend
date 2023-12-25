import { FC, ReactNode } from "react"
import { css } from "styled-system/css"

interface FullWidthProps {
    children: ReactNode
}
const FullWidth: FC<FullWidthProps> = ({ children }) => {
    return (
        <div className={css({ marginX: "calc(50% - 50vw)" })}>
            {children}
        </div>
    )
}

export default FullWidth
