import { PageTitle } from "@/components/PageTitle"
import { FirstRegisterTagsForm } from "./FirstRegisterTagsForm"


const FirstRegisterPage = async () => {
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
