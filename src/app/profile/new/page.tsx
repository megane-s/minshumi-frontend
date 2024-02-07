import { PageTitle } from "@/components/PageTitle"
import { FirstRegisterTagsForm } from "./FirstRegisterTagsForm"
import { getSession } from "@/auth/server/auth"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import { getMetadata } from "@/seo/getMetadata"

export const metadata: Metadata = getMetadata({
    title: "新規登録 | みんしゅみ",
})

export const dynamic = "force-dynamic"

const FirstRegisterPage = async ({ searchParams: { callbackUrl } }: { searchParams: { callbackUrl?: string } }) => {
    const session = await getSession()
    if (!session) redirect("/login")
    return (
        <div>
            <PageTitle my="lg">
                興味のあるタグを選んでください
            </PageTitle>

            <FirstRegisterTagsForm
                callbackUrl={callbackUrl}
            />
        </div>
    )
}
export default FirstRegisterPage
