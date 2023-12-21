import { getArt } from "@/art/get"
import { ArtId } from "@/art/type"
import { notFound } from "next/navigation"
import EditInputDetailForm from "./EditInputDetailForm"

interface PageProps {
    params: { art_id: ArtId }
}
const ArtDetailEditPage = async ({ params: { art_id } }: PageProps) => {
    const art = await getArt(art_id)
    if (!art) notFound()
    return (
        <div>
            <EditInputDetailForm
                defaultValues={art}
            />
        </div>
    )
}
export default ArtDetailEditPage
