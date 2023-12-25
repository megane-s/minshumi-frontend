import { PageTitle } from "@/components/PageTitle"
import { FirstRegisterTagsForm } from "./FirstRegisterTagsForm"
import { getSession } from "@/auth/server/auth"
import { notFound } from "next/navigation"


const FirstRegisterPage = async () => {
    const session = await getSession()
    if (!session) notFound()
    const userId = session.user.id
    return (
        <div>
            <PageTitle my="lg">
                興味のあるタグを選んでください
            </PageTitle>

            <FirstRegisterTagsForm
                userId={userId}
            />
        </div>
    )
}
export default FirstRegisterPage
