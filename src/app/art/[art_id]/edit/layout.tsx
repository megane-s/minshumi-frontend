import { PageTitle } from "@/components/PageTitle"
import { ReactNode } from "react"
import EditTabs from "./Tabs"
import { ArtId } from "@/art/type"
import { css } from "styled-system/css"
import { getSession } from "@/auth/server/auth"
import PleaseLogin from "../appeal/PleaseLogin"

interface PageProps {
    children: ReactNode
    params: { art_id: ArtId }
}
const ArtEditLayout = async ({ children, params: { art_id } }: PageProps) => {
    const session = await getSession()
    console.log(session)
    return (
        <div>
            <PageTitle my="lg">
                作品の編集
            </PageTitle>
            {session
                ? <>
                    <EditTabs artId={art_id} />
                    <div className={css({ mt: "md", mb: "xl" })}>
                        {children}
                    </div>
                </>
                : <PleaseLogin />}
        </div>
    )
}
export default ArtEditLayout
