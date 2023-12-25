import { PageTitle } from "@/components/PageTitle"
import { ReactNode } from "react"
import EditTabs from "./Tabs"
import { ArtId } from "@/art/type"
import { Box } from "@mantine/core"

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
            <Box mt="md" mb="xl">
                {children}
            </Box>
        </div>
    )
}
export default ArtEditLayout
