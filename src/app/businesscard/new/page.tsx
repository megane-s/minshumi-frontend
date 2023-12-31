import FullWidth from "@/app/BaseLayout/FullWidth"
import { PageTitle } from "@/components/PageTitle"
import { css } from "styled-system/css"
import { SelectType } from "./SelectType"

const NewBusinessCardPage = ({ searchParams }: { searchParams: { type?: string } }) => {
    return (
        <div>
            {searchParams.type}
            <PageTitle className={css({ textAlign: "center", mt: "xl !important", mb: "md !important" })}>
                名刺タイプを選択
            </PageTitle>
            <FullWidth>
                <SelectType />
            </FullWidth>
        </div>
    )
}
export default NewBusinessCardPage
