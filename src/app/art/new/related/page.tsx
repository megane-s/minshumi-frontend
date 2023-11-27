import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtRelatedForm from "./NewArtRelatedForm"
import { Box } from "@mantine/core"
import FullWidth from "@/app/BaseLayout/FullWidth"
import Navigation from "./Navigation"

const NewArtRelatedArtPage = () => {
    return (
        <div>
            <NewArtSectionTitle>
                4. 前後に見た作品
            </NewArtSectionTitle>

            <NewArtRelatedForm />

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
