import { redirect } from "next/navigation"

interface PageProps {
    params: { art_id: string }
}
const ArtEditPage = ({ params: { art_id } }: PageProps) => {
    redirect(`/art/${art_id}/edit/detail`)
}
export default ArtEditPage
