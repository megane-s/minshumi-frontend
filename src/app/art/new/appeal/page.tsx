import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtRelatedForm from "./NewArtRelatedForm"
import { Box } from "@mantine/core"
import FullWidth from "@/app/BaseLayout/FullWidth"
import Navigation from "./Navigation"
import { getNewArtSession } from "@/art/newArtSession/cookies"
import { getArt } from "@/art/get"
import { redirect } from "next/navigation"

const NewArtRelatedArtPage = async () => {
    const newArtSession = await getNewArtSession()
    const title = (newArtSession?.artId ? (await getArt(newArtSession.artId))?.title : newArtSession?.title)
    if (!title) redirect("/art/new/title")
    return (
        <div>
            <NewArtSectionTitle>
                {title} をアピール
            </NewArtSectionTitle>

            <NewArtRelatedForm
                defaultValues={{
                    prevArts: newArtSession?.prevArts ?? [],
                    nextArts: newArtSession?.nextArts ?? [],
                }}
            />

            <FullWidth>
                <Box py="xl">
                    <Navigation
                        artId={newArtSession?.artId ?? null}
                    />
                </Box>
            </FullWidth>

            <NewArtProgress now={3} />
        </div>
    )
}
export default NewArtRelatedArtPage
