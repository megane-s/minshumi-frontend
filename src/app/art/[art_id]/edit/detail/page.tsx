import { getArt } from "@/art/get"
import { ArtId } from "@/art/type"
import { notFound } from "next/navigation"
import EditInputDetailForm from "./EditInputDetailForm"
import { canUpdateArt } from "@/art/update"
import { getSession } from "@/auth/server/auth"

interface PageProps {
    params: { art_id: ArtId }
}
const ArtDetailEditPage = async ({ params: { art_id } }: PageProps) => {
    const [art, session] = await Promise.all([
        getArt(art_id),
        getSession(),
    ])
    if (!art) notFound()
    const canUpdateTitle = await canUpdateArt(session?.user.id ?? null, art, { title: "" })
    return (
        <div>
            <EditInputDetailForm
                artId={art_id}
                defaultValues={art}
                disableTitle={!canUpdateTitle}
            />
        </div>
    )
}
export default ArtDetailEditPage
