import { LikeArtImage } from "@/app/user/[user_id]/LikeArtList/LikeArtImage"
import { ArtAppeal } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"

interface AppealSettingFormProps {
    appeals: ArtAppeal[]
}
const AppealSettingForm: FC<AppealSettingFormProps> = ({ appeals }) => {
    return (
        <div>
            <Carousel
                slideSize="fit-content"
                slideGap="sm"
                align="start"
                controlsOffset="0"
            >
                {appeals.map(art =>
                    <CarouselSlide key={art.artId}>
                        <LikeArtImage
                            art={art}
                            editable
                        />
                    </CarouselSlide>
                )}
            </Carousel>
        </div>
    )
}

export default AppealSettingForm
