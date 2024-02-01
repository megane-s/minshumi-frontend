import { redirect } from "next/navigation"

interface PageProps {
    params: { tag_id: string }
}
const TagsPage = ({ params: { tag_id } }: PageProps) => {
    redirect(`/tag/${tag_id}/1`)
}
export default TagsPage