import { FC, ReactNode } from "react"

interface BaseLayoutProps {
    children: ReactNode
}
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default BaseLayout
