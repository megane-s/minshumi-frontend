import { PageTitle } from "@/components/PageTitle"
import { ReactNode } from "react"
import { NewArtProgressProvider } from "./NewArtProgress/provider"

interface PageProps {
    children: ReactNode
}
const NewArtLayout = ({ children }: PageProps) => {
    return (
        <div>
            <PageTitle my="lg">
                好きな作品の登録
            </PageTitle>

            <NewArtProgressProvider total={2}>
                {children}
            </NewArtProgressProvider>

        </div>
    )
}
export default NewArtLayout
