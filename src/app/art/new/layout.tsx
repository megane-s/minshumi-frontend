import { PageTitle } from "@/components/PageTitle"
import { ReactNode } from "react"
import { NewArtProgressProvider } from "./NewArtProgress/provider"
import { getSession } from "@/auth/server/auth"
import PleaseLogin from "../[art_id]/appeal/PleaseLogin"
import { Metadata } from "next"
import { getMetadata } from "@/seo/getMetadata"

export const metadata: Metadata = getMetadata({
    title: "作品の登録 | みんしゅみ",
})

interface PageProps {
    children: ReactNode
}
const NewArtLayout = async ({ children }: PageProps) => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    return (
        <div>
            <PageTitle my="lg">
                作品の登録
            </PageTitle>

            <NewArtProgressProvider total={2}>
                {children}
            </NewArtProgressProvider>

        </div>
    )
}
export default NewArtLayout
