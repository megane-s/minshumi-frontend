import { PageTitle } from "@/components/PageTitle"
import { FirstRegisterTagsForm } from "./FirstRegisterTagsForm"
import { getSession } from "@/auth/server/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

const FirstRegisterPage = async () => {
    const session = await getSession()
    console.log("firt register", session)
    if (!session) redirect("/login")
    return (
        <div>
            <PageTitle my="lg">
                興味のあるタグを選んでください
            </PageTitle>

            <FirstRegisterTagsForm />
        </div>
    )
}
export default FirstRegisterPage
