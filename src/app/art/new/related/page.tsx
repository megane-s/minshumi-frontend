import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtRelatedForm from "./NewArtRelatedForm"
import { Box } from "@mantine/core"
import FullWidth from "@/app/BaseLayout/FullWidth"
import Navigation from "./Navigation"
import { getNewArtSession } from "@/art/newArtSession/cookies"

const NewArtRelatedArtPage = async () => {
    const newArtSession = await getNewArtSession()
    return (
        <div>
            <NewArtSectionTitle>
                4. 前後に見た作品
            </NewArtSectionTitle>

            <NewArtRelatedForm
                defaultValues={{
                    prevArts: newArtSession?.prevArts ?? [],
                    nextArts: newArtSession?.nextArts ?? [],
                }}
            />

            <FullWidth>
                <Box py="xl">
                    <Navigation />
                </Box>
            </FullWidth>

            <NewArtProgress now={3} />
        </div>
    )
}
export default NewArtRelatedArtPage
