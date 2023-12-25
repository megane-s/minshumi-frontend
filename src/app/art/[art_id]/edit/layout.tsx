import { PageTitle } from "@/components/PageTitle"
import { ReactNode } from "react"
import EditTabs from "./Tabs"
import { ArtId } from "@/art/type"
import { css } from "styled-system/css"

interface PageProps {
    children: ReactNode
    params: { art_id: ArtId }
}
const ArtEditLayout = ({ children, params: { art_id } }: PageProps) => {
    return (
        <div>
            <PageTitle my="lg">
                作品の編集
            </PageTitle>
            <EditTabs artId={art_id} />
            <div className={css({ mt: "md", mb: "xl" })}>
                {children}
            </div>
        </div>
    )
}
export default ArtEditLayout
