import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { LikeArtImage } from "./LikeArtImage"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { UserId } from "@/user/type"

interface LikeArtListProps {
    userId: UserId
}
export const LikeArtList: FC<LikeArtListProps> = async ({ userId }) => {
    const arts = await getArtAppealsByUser(userId)
    return (
        <Carousel
            slideSize="fit-content"
            slideGap="sm"
            align="start"
            controlsOffset="0"
        >
            {/* TODO 0件の時の表示 */}
            {arts.map(art =>
                <CarouselSlide key={art.artId}>
                    <LikeArtImage
                        art={art}
                    />
                </CarouselSlide>
            )}
        </Carousel>
    )
}
