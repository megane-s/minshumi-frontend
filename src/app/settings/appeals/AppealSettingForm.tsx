import { LikeArtImage } from "@/app/user/[user_id]/LikeArtList/LikeArtImage"
import { ArtAppeal } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import Image from "next/image"
import { Flex } from "@mantine/core"

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

            {appeals.length === 0 &&
                <Flex p={1} justify={"center"}>
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <p >
                            アピール作品がまだ無いようです....
                        </p>

                    </center>
                </Flex>
            }
        </div>
    )
}

export default AppealSettingForm
