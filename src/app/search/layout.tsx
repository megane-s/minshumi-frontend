import { ReactNode } from "react"

interface PageProps {
    children: ReactNode
}
const SaearchLayout = ({ children }: PageProps) => {
    return (
        <div>
            {/* タブにする */}
            /src/app/search/LayoutGroup.tsx
            {children}
        </div>
    )
}
export default SaearchLayout